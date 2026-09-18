// src/services/scoringEngine.js
// Scoring engine — assigns a weighted score to each document.
// Returns { docType, score, maxScore, deductions[] }
//
// Weights (total = 95 pts; remaining 5 reserved for completeness):
//   UDYAM_MSME   => 20
//   GSTR_3B      => 20
//   PAN_ITR      => 20
//   MII_AFFIDAVIT=> 15
//   CPPP_DEBARMENT=> 10
//   OEM_AUTH     => 10

const WEIGHTS = {
  UDYAM_MSME:     20,
  GSTR_3B:        20,
  PAN_ITR:        20,
  MII_AFFIDAVIT:  15,
  CPPP_DEBARMENT: 10,
  OEM_AUTH:       10,
  IMPORT_BILL_OF_ENTRY: 5,
  EPFO_ECR:       5,
  BALANCE_SHEET:  5,
};

/**
 * Score a single document.
 * @param {object} doc   - Mongoose Document object (with extractedFields populated)
 * @param {object} tender - Mongoose Tender object (for miiThreshold etc.)
 * @returns {{ docType, score, maxScore, deductions }}
 */
export function scoreDocument(doc, tender) {
  const docType = doc.docType;
  const maxScore = WEIGHTS[docType] ?? 5;
  const fields = doc.extractedFields || {};
  const deductions = [];

  const deduct = (field, reason, statute, points) => {
    deductions.push({ field, reason, statute, points: -Math.abs(points) });
  };

  switch (docType) {
    case 'UDYAM_MSME': {
      // Udyam: must have a valid Udyam number, must not be expired
      if (!fields.udyam_number) {
        deduct('udyam_number', 'Udyam registration number missing', 'MSMED Act 2006 § 8', 10);
      }
      if (fields.validity_expired === true) {
        deduct('validity', 'Udyam certificate expired', 'MSMED Act 2006 § 8', maxScore);
      } else if (fields.months_to_expiry != null && fields.months_to_expiry < 3) {
        deduct('validity', `Udyam cert expires in ${fields.months_to_expiry} months`, 'MSMED Act 2006', 4);
      }
      if (!fields.category) {
        deduct('category', 'Enterprise category (Micro/Small/Medium) not found', 'MSMED Act 2006', 3);
      }
      break;
    }

    case 'GSTR_3B': {
      // GST: check filing lag (late filing); -0.4 pts per 10 days late
      const lagDays = fields.avg_filing_lag_days ?? 0;
      if (lagDays > 0) {
        const pts = Math.round((lagDays / 10) * 0.4 * 10) / 10;
        deduct('gst_filing_lag', `Average GST filing lag of ${lagDays} days`, 'CGST Act § 47', pts);
      }
      // Must have last 12 months filed
      const monthsFiled = fields.months_filed ?? 12;
      if (monthsFiled < 12) {
        const pts = (12 - monthsFiled) * 1.2;
        deduct('gst_missing_months', `Only ${monthsFiled}/12 months filed`, 'CGST Act § 39', pts);
      }
      if (!fields.gstin) {
        deduct('gstin', 'GSTIN not found on document', 'CGST Act § 25', 8);
      }
      break;
    }

    case 'PAN_ITR': {
      if (!fields.pan) {
        deduct('pan', 'PAN number not found', 'Income Tax Act 1961 § 139A', 8);
      }
      // ITR must be for assessment year covering the bid
      if (fields.itr_years_available != null && fields.itr_years_available < 3) {
        const pts = (3 - fields.itr_years_available) * 2;
        deduct('itr_years', `Only ${fields.itr_years_available} year(s) of ITR available`, 'GFR 2017 Rule 160', pts);
      }
      if (fields.turnover_crore != null && tender?.turnoverRequirement) {
        const shortfall = tender.turnoverRequirement - fields.turnover_crore;
        if (shortfall > 0) {
          deduct('turnover', `Turnover ₹${fields.turnover_crore}Cr below required ₹${tender.turnoverRequirement}Cr`, 'GFR 2017 Rule 160', Math.min(maxScore, shortfall * 2));
        }
      }
      break;
    }

    case 'MII_AFFIDAVIT': {
      // MII: local content must meet or exceed tender threshold
      const localPct = fields.local_content_pct ?? null;
      const threshold = tender?.miiThreshold ?? 60;
      if (localPct == null) {
        deduct('local_content_pct', 'Local content percentage not found', 'MII Order 2017 § 3', maxScore);
      } else if (localPct < threshold) {
        const shortfall = threshold - localPct;
        // -1.5 pts per % shortfall, capped at maxScore
        const pts = Math.min(maxScore, shortfall * 1.5);
        deduct('local_content_pct', `Local content ${localPct}% below threshold ${threshold}%`, 'MII Order 2017 § 3', pts);
      }
      if (fields.self_certification !== true) {
        deduct('self_certification', 'Self-certification declaration not found', 'MII Order 2017 § 5', 3);
      }
      break;
    }

    case 'CPPP_DEBARMENT': {
      // Critical: if debarred, fail fully
      if (fields.debarred === true) {
        deduct('debarment_status', 'Firm is debarred on CPPP', 'GFR 2017 Rule 151', maxScore);
      } else if (fields.debarment_status === 'unclear') {
        deduct('debarment_status', 'Debarment status could not be confirmed', 'GFR 2017 Rule 151', 4);
      }
      break;
    }

    case 'OEM_AUTH': {
      if (!fields.oem_name) {
        deduct('oem_name', 'OEM / manufacturer name not found', 'GeM Seller Guidelines § 4.2', 5);
      }
      if (fields.auth_expired === true) {
        deduct('auth_expiry', 'OEM authorization letter expired', 'GeM Seller Guidelines § 4.2', maxScore);
      }
      if (!fields.product_category) {
        deduct('product_category', 'Product/category coverage not specified in OEM letter', 'GeM Seller Guidelines', 3);
      }
      break;
    }

    default: {
      // Generic: just check that OCR extracted at least one meaningful field
      if (!fields || Object.keys(fields).length === 0) {
        deduct('no_fields', 'No structured fields extracted from document', 'GFR 2017', Math.floor(maxScore / 2));
      }
    }
  }

  // Sum all deduction points
  const totalDeducted = deductions.reduce((acc, d) => acc + d.points, 0);
  const rawScore = maxScore + totalDeducted; // totalDeducted is already negative
  const score = Math.max(0, Math.min(maxScore, rawScore));

  return { docType, score, maxScore, deductions };
}

/**
 * Compute composite score across all documents.
 * @param {object[]} docScores - array of { score, maxScore }
 * @returns {number} 0-100
 */
export function computeCompositeScore(docScores) {
  const totalEarned = docScores.reduce((s, d) => s + d.score, 0);
  const totalPossible = docScores.reduce((s, d) => s + d.maxScore, 0);
  if (totalPossible === 0) return 0;
  return Math.round((totalEarned / totalPossible) * 100);
}
