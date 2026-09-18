// src/services/crossCheckEngine.js
// Pairwise cross-verification of extracted fields across documents.
// Uses Levenshtein ratio for string comparisons (no external dependency needed —
// pure JS implementation included).

// ------- Levenshtein Similarity ------- //
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array(n + 1).fill(0).map((_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function stringSimilarity(a, b) {
  if (!a || !b) return 0;
  const la = a.trim().toLowerCase();
  const lb = b.trim().toLowerCase();
  if (la === lb) return 1;
  const dist = levenshtein(la, lb);
  return 1 - dist / Math.max(la.length, lb.length);
}

function exactMatch(a, b) {
  if (!a || !b) return false;
  return a.trim().toUpperCase() === b.trim().toUpperCase();
}

// ------- Cross-Check Rules ------- //
// Each rule defines which pair of documents to compare and what field to check.
const RULES = [
  // Legal name must match across Udyam and GST
  {
    fieldKey: 'legal_name',
    docA: 'UDYAM_MSME',  docB: 'GSTR_3B',
    extractA: f => f.legal_name, extractB: f => f.legal_name,
    compare: stringSimilarity, threshold: 0.9,
    statute: 'MSMED Act 2006 / CGST Act',
    reason: (sim) => `Legal name similarity ${(sim * 100).toFixed(0)}% < 90% — names do not match across Udyam and GST`,
  },
  // PAN must match across GST and PAN/ITR
  {
    fieldKey: 'pan',
    docA: 'GSTR_3B',     docB: 'PAN_ITR',
    extractA: f => f.pan, extractB: f => f.pan,
    compare: exactMatch,
    statute: 'CGST Act § 25 / Income Tax Act § 139A',
    reason: () => 'PAN extracted from GST return does not match PAN/ITR document',
  },
  // GSTIN must appear on Udyam (or MII affidavit)
  {
    fieldKey: 'gstin',
    docA: 'UDYAM_MSME',  docB: 'GSTR_3B',
    extractA: f => f.gstin, extractB: f => f.gstin,
    compare: exactMatch,
    statute: 'CGST Act § 25',
    reason: () => 'GSTIN on Udyam certificate does not match GSTIN on GST return',
  },
  // Udyam number reference in MII affidavit
  {
    fieldKey: 'udyam_number',
    docA: 'UDYAM_MSME',  docB: 'MII_AFFIDAVIT',
    extractA: f => f.udyam_number, extractB: f => f.udyam_number,
    compare: exactMatch,
    statute: 'MII Order 2017 § 3',
    reason: () => 'Udyam number on MII affidavit does not match Udyam certificate',
  },
  // Legal name in MII affidavit must match Udyam
  {
    fieldKey: 'legal_name_mii',
    docA: 'UDYAM_MSME',  docB: 'MII_AFFIDAVIT',
    extractA: f => f.legal_name, extractB: f => f.legal_name,
    compare: stringSimilarity, threshold: 0.9,
    statute: 'MII Order 2017 § 5',
    reason: (sim) => `Legal name similarity ${(sim * 100).toFixed(0)}% across Udyam and MII Affidavit`,
  },
];

/**
 * Run all applicable cross-checks against the set of documents.
 * @param {object[]} docs - Array of Mongoose Document objects with extractedFields
 * @returns {{ crossChecks: object[], hasCritical: boolean }}
 */
export function runCrossChecks(docs) {
  // Index docs by docType for O(1) lookup
  const docMap = {};
  for (const d of docs) {
    docMap[d.docType] = d.extractedFields || {};
  }

  const results = [];

  for (const rule of RULES) {
    if (!docMap[rule.docA] || !docMap[rule.docB]) continue; // skip if doc type not uploaded

    const valueA = rule.extractA(docMap[rule.docA]);
    const valueB = rule.extractB(docMap[rule.docB]);

    let match, similarity;

    if (rule.compare === exactMatch) {
      match = exactMatch(valueA, valueB);
      similarity = match ? 1 : 0;
    } else {
      similarity = stringSimilarity(valueA, valueB);
      const threshold = rule.threshold ?? 0.9;
      match = similarity >= threshold;
    }

    results.push({
      fieldKey:   rule.fieldKey,
      docA:       rule.docA,
      docB:       rule.docB,
      valueA:     valueA ?? 'NOT FOUND',
      valueB:     valueB ?? 'NOT FOUND',
      match,
      similarity: Math.round(similarity * 1000) / 1000,
      statute:    rule.statute,
      reason:     match ? null : rule.reason(similarity),
    });
  }

  const hasCritical = results.some(r => !r.match);
  return { crossChecks: results, hasCritical };
}
