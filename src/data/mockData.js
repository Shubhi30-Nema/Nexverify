export const TENDERS = [
  {
    id: 'GEM/2026/B/582910',
    title: 'Procurement of 5,000 Workstation Laptops for CPSE Office Automation',
    department: 'Ministry of Electronics & IT',
    estimatedBudget: '₹ 38.5 Crore',
    closingDate: '25-Sep-2026',
    biddersCount: 5,
    miiRequirement: '50% Minimum Local Content (Class-I Supplier)',
    turnoverRequirement: '₹ 25 Crore / Year',
    turnoverReqNum: 25.0,
    miiReqNum: 50.0
  },
  {
    id: 'GEM/2026/B/948211',
    title: 'Supply & Commissioning of 500kW Solar Rooftop Power Plant',
    department: 'NTPC Renewable Energy Ltd',
    estimatedBudget: '₹ 12.8 Crore',
    closingDate: '28-Sep-2026',
    biddersCount: 4,
    miiRequirement: '60% Minimum Local Content (Class-I Supplier)',
    turnoverRequirement: '₹ 10 Crore / Year',
    turnoverReqNum: 10.0,
    miiReqNum: 60.0
  },
  {
    id: 'GEM/2026/B/301944',
    title: 'Annual Facility Management & Security Maintenance Services',
    department: 'Bharat Heavy Electricals Ltd (BHEL)',
    estimatedBudget: '₹ 6.4 Crore',
    closingDate: '05-Oct-2026',
    biddersCount: 3,
    miiRequirement: '40% Minimum Local Content',
    turnoverRequirement: '₹ 5 Crore / Year',
    turnoverReqNum: 5.0,
    miiReqNum: 40.0
  },
  {
    id: 'GEM/2026/B/771029',
    title: 'Supply & Installation of High-End Diagnostic MRI Scanners',
    department: 'All India Institute of Medical Sciences (AIIMS Delhi)',
    estimatedBudget: '₹ 45.0 Crore',
    closingDate: '12-Oct-2026',
    biddersCount: 3,
    miiRequirement: '50% Minimum Local Content',
    turnoverRequirement: '₹ 30 Crore / Year',
    turnoverReqNum: 30.0,
    miiReqNum: 50.0
  }
];

export const BIDDERS = [
  // =========================================================================
  // TENDER 1: GEM/2026/B/582910 (Workstation Laptops - 5 Bidders)
  // =========================================================================
  {
    id: 'BID-101',
    companyName: 'TechCorp India Pvt Ltd',
    tenderId: 'GEM/2026/B/582910',
    gstin: '07AAACT8821Q1Z5',
    pan: 'AAACT8821Q',
    udyamNo: 'UDYAM-DL-03-0094821',
    score: 95,
    status: 'Compliant',
    riskLevel: 'Low Risk',
    badgeColor: 'green',
    recommendation: 'QUALIFY BIDDER',
    summary: 'PaddleOCR scanned 6 submitted documents with 99.6% accuracy. All statutory credentials, GST filings, 68.4% Make in India local content, and DigiLocker signature hashes verified successfully.',
    localContent: '68.4% (Class-I Supplier)',
    turnover: '₹ 42.5 Cr / yr',
    companyDetails: {
      cin: 'U72200DL2018PTC334912',
      incorporationDate: '14-Mar-2018',
      directors: ['Vikram Sharma (MD)', 'Ananya Roy (Director)'],
      registeredAddress: 'Plot 42, Okhla Industrial Area Phase III, New Delhi 110020',
      employeeCountEPFO: 340,
      creditRating: 'CRISIL A+ (Stable)',
      paidUpCapital: '₹ 10.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 36.8 },
      { year: 'FY 2024-25', amount: 39.4 },
      { year: 'FY 2025-26', amount: 42.5 }
    ],
    localContentBreakdown: { local: 68.4, imported: 31.6, required: 50.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 100, max: 100 },
      { name: 'ITR Consistency', score: 100, max: 100 },
      { name: 'MII Margin', score: 92, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 100, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '99.6%',
      pagesScanned: 18,
      textBlocksDetected: 412,
      boundingPolyCount: 412,
      ocrLatency: '114ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.8%', ocrExtracted: 'UDYAM-DL-03-0094821 | Active Medium Enterprise', deductionReason: 'Active MSME registration verified.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'Photo Certificate (JPG)', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.4%', ocrExtracted: 'GSTIN: 07AAACT8821Q1Z5 | Form GSTR-3B Filed | Period: July 2026', deductionReason: 'Zero late filing defaults detected. Full score.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.9%', ocrExtracted: 'PAN: AAACT8821Q | 3-Year Gross Turnover: ₹ 42.5 Cr', deductionReason: 'Parsed 3-year consecutive tax returns cleanly.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 15, maxScore: 15, status: 'Pass', ocrConfidence: '99.2%', ocrExtracted: 'Local Component Cost: ₹ 26.18 Cr (68.4% BOQ) | Class-I Supplier', deductionReason: 'Exceeds mandatory 50% local content requirement.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API & Document Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Searched 34 CPSE Blacklists | Status: CLEAR', deductionReason: 'Clean record across debarment registries.' },
      { doc: '6. OEM Authorization Letter', type: 'Photo Scan (PNG)', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '99.1%', ocrExtracted: 'OEM Partner Code: OEM-DEL-99481 | Signature Hash Matched', deductionReason: 'Digital signature verified with OEM public key.' }
    ],
    crossCheckPoints: [
      { docA: 'Udyam MSME Certificate', docB: 'GSTR-3B Tax Filing', parameter: 'Legal Entity Name Match', status: 'MATCH', similarity: '100%', notes: 'PaddleOCR read "TechCorp India Pvt Ltd" on both documents.' },
      { docA: 'MII BOM Affidavit', docB: 'Customs Import Invoices', parameter: 'Local Content Ratio Audit', status: 'MATCH', similarity: '98%', notes: 'Declared 68.4% verified against import bills.' }
    ],
    failureDetails: [],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Medium Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: 'Returns filed to July 2026.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Parsed PAN AAACT8821Q receipts.' },
      { name: 'Make in India (MII) Content', status: 'Pass', detail: '68.4% local content.' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clear record.' },
      { name: 'EPFO & ESIC Compliance', status: 'Pass', detail: 'Paid for 340 employees.' },
      { name: 'DigiLocker Verification', status: 'Pass', detail: 'Hashes verified.' }
    ]
  },
  {
    id: 'BID-104',
    companyName: 'VayuSys Systems India Pvt Ltd',
    tenderId: 'GEM/2026/B/582910',
    gstin: '06AABCV1029F1Z1',
    pan: 'AABCV1029F',
    udyamNo: 'UDYAM-HR-02-0041029',
    score: 88,
    status: 'Compliant',
    riskLevel: 'Low Risk',
    badgeColor: 'green',
    recommendation: 'QUALIFY BIDDER',
    summary: 'PaddleOCR scanned 6 documents with 98.9% accuracy. Turnover of ₹ 31.0 Cr meets eligibility, 58.0% MII local content verified, minor 5-day GST delay noted.',
    localContent: '58.0% (Class-I Supplier)',
    turnover: '₹ 31.0 Cr / yr',
    companyDetails: {
      cin: 'U72900HR2017PTC068102',
      incorporationDate: '22-Jun-2017',
      directors: ['Harish Chand (Director)', 'Reena Chand (Director)'],
      registeredAddress: 'DLF Cyber City Phase II, Gurugram, Haryana 122002',
      employeeCountEPFO: 185,
      creditRating: 'CRISIL A (Stable)',
      paidUpCapital: '₹ 6.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 26.5 },
      { year: 'FY 2024-25', amount: 28.9 },
      { year: 'FY 2025-26', amount: 31.0 }
    ],
    localContentBreakdown: { local: 58.0, imported: 42.0, required: 50.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 90, max: 100 },
      { name: 'ITR Consistency', score: 98, max: 100 },
      { name: 'MII Margin', score: 85, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 98, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '98.9%',
      pagesScanned: 16,
      textBlocksDetected: 380,
      boundingPolyCount: 380,
      ocrLatency: '120ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.4%', ocrExtracted: 'UDYAM-HR-02-0041029 | Active Small Enterprise', deductionReason: 'Active MSME registration.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 18, maxScore: 20, status: 'Pass', ocrConfidence: '98.5%', ocrExtracted: 'Filed 25-Jul-2026 (5 Days Delay)', deductionReason: '2 pts deducted for 5-day filing grace period.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.1%', ocrExtracted: 'Gross Turnover: ₹ 31.0 Cr', deductionReason: '3-year turnover compliant.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 13, maxScore: 15, status: 'Pass', ocrConfidence: '98.2%', ocrExtracted: 'Local Content: 58.0%', deductionReason: '2 pts deducted: Borderline margin over 50% requirement.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Status: CLEAR', deductionReason: 'Clean record.' },
      { doc: '6. OEM Authorization Letter', type: 'Photo Scan', score: 7, maxScore: 10, status: 'Pass', ocrConfidence: '97.4%', ocrExtracted: 'Lenovo OEM Auth Code: OEM-LEN-48102', deductionReason: 'Valid authorization code.' }
    ],
    crossCheckPoints: [
      { docA: 'Udyam Certificate', docB: 'GSTR-3B Tax Filing', parameter: 'Entity Name Match', status: 'MATCH', similarity: '99%', notes: 'Match confirmed.' }
    ],
    failureDetails: [],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Small Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: '5 days grace filing.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Turnover ₹ 31.0 Cr.' },
      { name: 'Make in India (MII) Content', status: 'Pass', detail: '58.0% local content.' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clean.' },
      { name: 'EPFO & ESIC Compliance', status: 'Pass', detail: 'Compliant for 185 employees.' },
      { name: 'DigiLocker Verification', status: 'Pass', detail: 'Verified.' }
    ]
  },
  {
    id: 'BID-102',
    companyName: 'Surya Green Energy Solutions Ltd',
    tenderId: 'GEM/2026/B/582910',
    gstin: '27AABCS9910E1Z2',
    pan: 'AABCS9910E',
    udyamNo: 'UDYAM-MH-18-0048201',
    score: 68,
    status: 'Warning',
    riskLevel: 'Medium Risk',
    badgeColor: 'amber',
    recommendation: 'SEEK CLARIFICATION',
    summary: 'PaddleOCR scanned 6 documents. Detected MII local content discrepancy (Declared 65%, import bill OCR reveals 51.8%) and a 45-day delay in June GSTR-3B tax return filing.',
    localContent: '51.8% (Borderline Class-I)',
    turnover: '₹ 18.3 Cr / yr',
    companyDetails: {
      cin: 'U40106MH2016PLC281902',
      incorporationDate: '19-Aug-2016',
      directors: ['Sunil K. Patil (Director)', 'Meera Deshmukh (Director)'],
      registeredAddress: 'MIDC Industrial Estate, TTC Area, Navi Mumbai 400705',
      employeeCountEPFO: 120,
      creditRating: 'ICRA BBB+ (Moderate)',
      paidUpCapital: '₹ 4.5 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 15.2 },
      { year: 'FY 2024-25', amount: 16.9 },
      { year: 'FY 2025-26', amount: 18.3 }
    ],
    localContentBreakdown: { local: 51.8, imported: 48.2, required: 50.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 60, max: 100 },
      { name: 'ITR Consistency', score: 95, max: 100 },
      { name: 'MII Margin', score: 52, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 98, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '98.8%',
      pagesScanned: 14,
      textBlocksDetected: 348,
      boundingPolyCount: 348,
      ocrLatency: '128ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.5%', ocrExtracted: 'UDYAM-MH-18-0048201 | Active Small Enterprise', deductionReason: 'Active MSME registration verified.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'Photo Certificate (PNG)', score: 12, maxScore: 20, status: 'Warning', ocrConfidence: '98.2%', ocrExtracted: 'Filing Date: 14-Aug-2026 (45 Days Delay Detected)', deductionReason: '8 pts deducted: Late filing date stamp past statutory due date.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.7%', ocrExtracted: 'PAN: AABCS9910E | Turnover: ₹ 18.3 Cr', deductionReason: 'Parsed tax returns cleanly.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 6, maxScore: 15, status: 'Warning', ocrConfidence: '98.4%', ocrExtracted: 'Declared: 65.0% | Calculated from Import OCR: 51.8%', deductionReason: '9 pts deducted: Imported components dropped local content from 65% to 51.8%.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Gateway', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'No active debarment orders.', deductionReason: 'Clean record.' },
      { doc: '6. OEM Authorization Letter', type: 'PDF Document', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '98.9%', ocrExtracted: 'Authentic OEM partner authorization', deductionReason: 'Valid OEM signature certificate.' }
    ],
    crossCheckPoints: [
      { docA: 'MII BOM Declaration Affidavit', docB: 'Customs Import Bill of Entry #88412', parameter: 'Local Content Cost Audit', status: 'DISCREPANCY', similarity: '62%', notes: 'Affidavit claims 65.0% local content, but import bill OCR reveals 51.8% actual.' },
      { docA: 'GSTR-3B Tax Filing Stamp', docB: 'GSTN Portal Filing Calendar', parameter: 'Filing Timeliness Compliance', status: 'DELAYED', similarity: '78%', notes: 'Filing timestamp 14-Aug-2026 is 45 days past statutory due date.' }
    ],
    failureDetails: [
      { title: 'Make in India Discrepancy (65% Declared vs 51.8% Actual)', reason: 'Imported component costs reduce actual domestic value addition to 51.8%.', impact: 'Borderline eligibility over 50% threshold.', ruleViolation: 'Public Procurement Order 2017 § 3', remedy: 'Request CA certified BOM breakup.' },
      { title: 'Delayed GSTR-3B Return Filing (45 Days Late)', reason: 'June 2026 return filed on 14-Aug-2026.', impact: 'Statutory compliance score reduced by 8 points.', ruleViolation: 'CGST Act 2017 Section 39', remedy: 'Verify late fee payment on GSTN portal.' }
    ],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Small Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Warning', detail: 'June 2026 return filed 45 days late.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Parsed PAN AABCS9910E.' },
      { name: 'Make in India (MII) Content', status: 'Warning', detail: 'Imported components detected (MII 51.8%).' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'No debarment records.' },
      { name: 'EPFO & ESIC Compliance', status: 'Pass', detail: 'Paid for 120 employees.' },
      { name: 'DigiLocker Verification', status: 'Pass', detail: 'Certificates authentic.' }
    ]
  },
  {
    id: 'BID-105',
    companyName: 'Indotech Digital Infra Ltd',
    tenderId: 'GEM/2026/B/582910',
    gstin: '09AAACI4810M1Z4',
    pan: 'AAACI4810M',
    udyamNo: 'UDYAM-UP-12-0091821',
    score: 52,
    status: 'Warning',
    riskLevel: 'Medium Risk',
    badgeColor: 'amber',
    recommendation: 'SEEK CLARIFICATION',
    summary: 'Turnover shortfall (₹ 22.4 Cr vs ₹ 25.0 Cr required) and Make in India local content below 50% threshold (44.0% Class-II Supplier). MSME relaxation requested.',
    localContent: '44.0% (Class-II Supplier)',
    turnover: '₹ 22.4 Cr / yr',
    companyDetails: {
      cin: 'U72900UP2019PLC114820',
      incorporationDate: '08-May-2019',
      directors: ['Alok Gupta (Director)', 'Rashmi Gupta (Director)'],
      registeredAddress: 'Noida Sector 63, District Gautam Buddha Nagar, UP 201301',
      employeeCountEPFO: 95,
      creditRating: 'BBB (Moderate)',
      paidUpCapital: '₹ 3.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 18.2 },
      { year: 'FY 2024-25', amount: 20.1 },
      { year: 'FY 2025-26', amount: 22.4 }
    ],
    localContentBreakdown: { local: 44.0, imported: 56.0, required: 50.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 95, max: 100 },
      { name: 'ITR Consistency', score: 90, max: 100 },
      { name: 'MII Margin', score: 40, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 90, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '98.1%',
      pagesScanned: 12,
      textBlocksDetected: 310,
      boundingPolyCount: 310,
      ocrLatency: '118ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.2%', ocrExtracted: 'UDYAM-UP-12-0091821 | Active Small Enterprise', deductionReason: 'Active MSME registration verified.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 18, maxScore: 20, status: 'Pass', ocrConfidence: '98.0%', ocrExtracted: 'GSTIN: 09AAACI4810M1Z4 | Filed', deductionReason: 'Timely filing verified.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 10, maxScore: 20, status: 'Warning', ocrConfidence: '98.6%', ocrExtracted: 'Turnover ₹ 22.4 Cr (Required ₹ 25.0 Cr)', deductionReason: '10 pts deducted: Turnover short by ₹ 2.6 Cr.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 4, maxScore: 15, status: 'Warning', ocrConfidence: '97.5%', ocrExtracted: 'Local Content: 44.0% (Class-II Supplier)', deductionReason: '11 pts deducted: Fails 50% Class-I threshold.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Status: CLEAR', deductionReason: 'Clean record.' },
      { doc: '6. OEM Authorization Letter', type: 'Photo Scan', score: 0, maxScore: 10, status: 'Warning', ocrConfidence: '96.2%', ocrExtracted: 'OEM Letter Missing Official Stamp', deductionReason: '10 pts deducted: Unstamped OEM auth letter.' }
    ],
    crossCheckPoints: [
      { docA: 'ITR-6 Tax Returns', docB: 'Tender Eligibility Criteria', parameter: 'Turnover Eligibility Check', status: 'SHORTFALL', similarity: '89%', notes: 'Average turnover ₹ 22.4 Cr falls short of ₹ 25.0 Cr requirement.' }
    ],
    failureDetails: [
      { title: 'Turnover Shortfall (₹ 22.4 Cr vs ₹ 25.0 Cr Required)', reason: '3-year average turnover is ₹ 22.4 Cr.', impact: 'Financial prequalification shortfall unless MSME exemption clause applies.', ruleViolation: 'Tender Clause 3.2 Financial Eligibility', remedy: 'Check MSME Turnover Exemption policy under Public Procurement Policy 2012.' }
    ],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Small Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: 'Compliant.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Warning', detail: 'Turnover ₹ 22.4 Cr (Short by ₹ 2.6 Cr).' },
      { name: 'Make in India (MII) Content', status: 'Warning', detail: '44.0% Class-II Supplier (Short of 50%).' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clean.' },
      { name: 'EPFO & ESIC Compliance', status: 'Pass', detail: 'Paid for 95 employees.' },
      { name: 'DigiLocker Verification', status: 'Warning', detail: 'Unstamped OEM letter.' }
    ]
  },
  {
    id: 'BID-103',
    companyName: 'Apex Global Hardware Ltd',
    tenderId: 'GEM/2026/B/582910',
    gstin: '19AAACA0091P1Z9',
    pan: 'AAACA0091P',
    udyamNo: 'UDYAM-WB-10-0010294 (Expired)',
    score: 32,
    status: 'Non-Compliant',
    riskLevel: 'High Risk',
    badgeColor: 'red',
    recommendation: 'DISQUALIFY BIDDER',
    summary: 'CRITICAL FAILURE: CPPP Debarment listing by Western Railway active till Nov 2026, expired MSME registration (Lapsed March 2025), and forged OEM authorization signature hash.',
    localContent: '18.5% (Non-Compliant)',
    turnover: '₹ 6.2 Cr / yr',
    companyDetails: {
      cin: 'U51909WB2014PLC201948',
      incorporationDate: '02-Feb-2014',
      directors: ['Ramesh Agarwala', 'Suresh Agarwala'],
      registeredAddress: 'Netaji Subhash Road, Dalhousie, Kolkata 700001',
      employeeCountEPFO: 45,
      creditRating: 'CARE D (Default / Speculative)',
      paidUpCapital: '₹ 1.2 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 8.4 },
      { year: 'FY 2024-25', amount: 7.1 },
      { year: 'FY 2025-26', amount: 6.2 }
    ],
    localContentBreakdown: { local: 18.5, imported: 81.5, required: 50.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 35, max: 100 },
      { name: 'ITR Consistency', score: 65, max: 100 },
      { name: 'MII Margin', score: 18, max: 100 },
      { name: 'Debarment Cleanliness', score: 0, max: 100 },
      { name: 'Hash Authenticity', score: 10, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '97.2%',
      pagesScanned: 22,
      textBlocksDetected: 510,
      boundingPolyCount: 510,
      ocrLatency: '142ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'Photo Certificate (JPG)', score: 0, maxScore: 20, status: 'Fail', ocrConfidence: '99.1%', ocrExtracted: 'UDYAM-WB-10-0010294 | Expiry Date: 31-Mar-2025 | STATUS: EXPIRED', deductionReason: '20 pts deducted: Certificate expiry date passed without re-registration.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 10, maxScore: 20, status: 'Warning', ocrConfidence: '98.0%', ocrExtracted: 'Section 73 Show Cause Notice Active | Pending Tax Demand ₹ 48.2 Lakhs', deductionReason: '10 pts deducted: Active Show Cause notice detected under CGST Section 73.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.5%', ocrExtracted: 'PAN: AAACA0091P active | Turnover ₹ 6.2 Cr', deductionReason: 'ITR filed.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 2, maxScore: 15, status: 'Fail', ocrConfidence: '97.6%', ocrExtracted: 'Local Content: 18.5% | Imported Finished Laptops: 81.5%', deductionReason: '13 pts deducted: Read 81.5% imported finished goods. Violates tender 50% requirement.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API & Document Stream', score: 0, maxScore: 10, status: 'Fail', ocrConfidence: '100.0%', ocrExtracted: 'Debarment Order: WR/PROC/2024/881 | Authority: Western Railway | Active till Nov 2026', deductionReason: '10 pts deducted: Mandatory disqualification due to active BLACKLIST ORDER.' },
      { doc: '6. OEM Authorization Letter', type: 'Photo Scan (JPG)', score: 0, maxScore: 10, status: 'Fail', ocrConfidence: '92.4%', ocrExtracted: 'Cryptographic Hash Mismatch | Forgery Flagged', deductionReason: '10 pts deducted: Signature hash failed OEM public key validation.' }
    ],
    crossCheckPoints: [
      { docA: 'CPPP Central Blacklist Registry', docB: 'Bidder Submission', parameter: 'Debarment Status Check', status: 'CRITICAL FAIL', similarity: '0%', notes: 'Debarment order WR/PROC/2024/881 active till 15-Nov-2026.' },
      { docA: 'OEM Auth Letter', docB: 'DigiLocker OEM Registry', parameter: 'SHA-256 Public Key Match', status: 'CRITICAL FAIL', similarity: '12%', notes: 'Failed cryptographic signature hash check.' }
    ],
    failureDetails: [
      { title: 'Active Debarment on Central Public Procurement Portal (CPPP)', reason: 'Debarred under Order WR/PROC/2024/881 by Western Railway.', impact: 'MANDATORY DISQUALIFICATION under GFR Rule 151(iii).', ruleViolation: 'GFR 2017 Rule 151(iii)', remedy: 'Rejection of technical bid is statutory.' }
    ],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Fail', detail: 'Expired Udyam cert (Lapsed March 2025).' },
      { name: 'GST Registration & Filing', status: 'Warning', detail: 'Show Cause notice under Section 73.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Parsed PAN AAACA0091P ITR.' },
      { name: 'Make in India (MII) Content', status: 'Fail', detail: 'Extracted only 18.5% local content.' },
      { name: 'CPPP Debarment Watchlist', status: 'Fail', detail: 'DEBARRED by Western Railway.' },
      { name: 'EPFO & ESIC Compliance', status: 'Warning', detail: 'Default notice for pending payments.' },
      { name: 'DigiLocker Verification', status: 'Fail', detail: 'Signature hash invalid.' }
    ]
  },

  // =========================================================================
  // TENDER 2: GEM/2026/B/948211 (Solar Rooftop 500kW - 4 Bidders)
  // =========================================================================
  {
    id: 'BID-203',
    companyName: 'Zenith Solar Power Tech Pvt Ltd',
    tenderId: 'GEM/2026/B/948211',
    gstin: '24AAACZ4810M1Z7',
    pan: 'AAACZ4810M',
    udyamNo: 'UDYAM-GJ-03-0019482',
    score: 98,
    status: 'Compliant',
    riskLevel: 'Low Risk',
    badgeColor: 'green',
    recommendation: 'QUALIFY BIDDER',
    summary: 'EXCELLENT COMPLIANCE: 81.0% Make in India local content (Class-I), BIS & MNRE ALMM approved solar modules, 3-year turnover of ₹ 34.0 Cr exceeds ₹ 10 Cr tender bar.',
    localContent: '81.0% (Class-I Supplier)',
    turnover: '₹ 34.0 Cr / yr',
    companyDetails: {
      cin: 'U40106GJ2014PTC078912',
      incorporationDate: '15-Jan-2014',
      directors: ['Nilesh J. Shah (MD)', 'Bhavna N. Shah (Director)'],
      registeredAddress: 'Solar Park Road, Charanka, Patan, Gujarat 385350',
      employeeCountEPFO: 290,
      creditRating: 'CRISIL A+ (Stable)',
      paidUpCapital: '₹ 12.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 28.4 },
      { year: 'FY 2024-25', amount: 31.2 },
      { year: 'FY 2025-26', amount: 34.0 }
    ],
    localContentBreakdown: { local: 81.0, imported: 19.0, required: 60.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 100, max: 100 },
      { name: 'ITR Consistency', score: 100, max: 100 },
      { name: 'MII Margin', score: 100, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 100, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '99.8%',
      pagesScanned: 20,
      textBlocksDetected: 450,
      boundingPolyCount: 450,
      ocrLatency: '110ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.9%', ocrExtracted: 'UDYAM-GJ-03-0019482 | Active Medium Enterprise', deductionReason: 'Full score.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.7%', ocrExtracted: 'GSTIN: 24AAACZ4810M1Z7 | Filed', deductionReason: 'Timely return filing.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.9%', ocrExtracted: 'PAN: AAACZ4810M | Turnover ₹ 34.0 Cr', deductionReason: '3-year turnover verified.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 18, maxScore: 18, status: 'Pass', ocrConfidence: '99.5%', ocrExtracted: 'Local Content: 81.0% | MNRE ALMM Listed', deductionReason: 'Exceeds 60% requirement.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Status: CLEAR', deductionReason: 'Clean record.' },
      { doc: '6. OEM Authorization Letter', type: 'PDF Document', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '99.6%', ocrExtracted: 'Waaree Solar OEM Partner Auth Code: OEM-WAR-10294', deductionReason: 'Hash matched.' }
    ],
    crossCheckPoints: [
      { docA: 'MNRE ALMM Portal', docB: 'BOM Component Declaration', parameter: 'ALMM Enlistment Check', status: 'MATCH', similarity: '100%', notes: 'Module manufacturer ALMM listing active.' }
    ],
    failureDetails: [],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Medium Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: 'Compliant.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Turnover ₹ 34.0 Cr.' },
      { name: 'Make in India (MII) Content', status: 'Pass', detail: '81.0% local content.' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clean.' },
      { name: 'EPFO & ESIC Compliance', status: 'Pass', detail: 'Paid for 290 employees.' },
      { name: 'DigiLocker Verification', status: 'Pass', detail: 'Verified.' }
    ]
  },
  {
    id: 'BID-201',
    companyName: 'SunPower Infrastructures Ltd',
    tenderId: 'GEM/2026/B/948211',
    gstin: '24AABCS8812K1Z9',
    pan: 'AABCS8812K',
    udyamNo: 'UDYAM-GJ-01-0082914',
    score: 92,
    status: 'Compliant',
    riskLevel: 'Low Risk',
    badgeColor: 'green',
    recommendation: 'QUALIFY BIDDER',
    summary: 'PaddleOCR scanned all 6 technical documents. BIS & ALMM approvals verified, 72.0% MII local content verified, 3-year turnover ₹ 28.5 Cr exceeds ₹ 10 Cr requirement.',
    localContent: '72.0% (Class-I Supplier)',
    turnover: '₹ 28.5 Cr / yr',
    companyDetails: {
      cin: 'U40108GJ2015PLC081944',
      incorporationDate: '11-Nov-2015',
      directors: ['Rajiv Mehta (MD)', 'Kavita Patel (Director)'],
      registeredAddress: 'GIDC Electronics Estate, Gandhinagar, Gujarat 382028',
      employeeCountEPFO: 215,
      creditRating: 'CRISIL A (Stable)',
      paidUpCapital: '₹ 8.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 22.1 },
      { year: 'FY 2024-25', amount: 25.8 },
      { year: 'FY 2025-26', amount: 28.5 }
    ],
    localContentBreakdown: { local: 72.0, imported: 28.0, required: 60.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 100, max: 100 },
      { name: 'ITR Consistency', score: 98, max: 100 },
      { name: 'MII Margin', score: 90, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 95, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '99.2%',
      pagesScanned: 16,
      textBlocksDetected: 390,
      boundingPolyCount: 390,
      ocrLatency: '115ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.6%', ocrExtracted: 'UDYAM-GJ-01-0082914 | Active Medium Enterprise', deductionReason: 'Active MSME registration.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.3%', ocrExtracted: 'GSTIN: 24AABCS8812K1Z9 | Filed', deductionReason: 'Timely return filing.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.8%', ocrExtracted: 'Gross Turnover: ₹ 28.5 Cr', deductionReason: 'Turnover verified.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 15, maxScore: 15, status: 'Pass', ocrConfidence: '98.9%', ocrExtracted: 'Local Content: 72.0% (Class-I Supplier)', deductionReason: 'Exceeds 60% threshold.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Status: CLEAR', deductionReason: 'Clean record.' },
      { doc: '6. OEM Authorization Letter', type: 'PDF Document', score: 7, maxScore: 10, status: 'Pass', ocrConfidence: '97.8%', ocrExtracted: 'Adani Solar Partner Auth Code: OEM-ADA-88192', deductionReason: 'Valid authorization code.' }
    ],
    crossCheckPoints: [
      { docA: 'Udyam Certificate', docB: 'GSTN Gateway', parameter: 'Legal Entity Name Match', status: 'MATCH', similarity: '100%', notes: 'Match confirmed.' }
    ],
    failureDetails: [],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Medium Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: 'Compliant.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Turnover ₹ 28.5 Cr.' },
      { name: 'Make in India (MII) Content', status: 'Pass', detail: '72.0% local content.' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clean.' },
      { name: 'EPFO & ESIC Compliance', status: 'Pass', detail: 'Paid for 215 employees.' },
      { name: 'DigiLocker Verification', status: 'Pass', detail: 'Verified.' }
    ]
  },
  {
    id: 'BID-202',
    companyName: 'Helios Clean Energy Systems',
    tenderId: 'GEM/2026/B/948211',
    gstin: '27AAACH1029G1Z3',
    pan: 'AAACH1029G',
    udyamNo: 'UDYAM-MH-12-0010928',
    score: 64,
    status: 'Warning',
    riskLevel: 'Medium Risk',
    badgeColor: 'amber',
    recommendation: 'SEEK CLARIFICATION',
    summary: 'Make in India local content (58.5%) falls short of 60% requirement for this tender. Turnover ₹ 14.1 Cr complies with ₹ 10 Cr threshold.',
    localContent: '58.5% (Borderline Class-II)',
    turnover: '₹ 14.1 Cr / yr',
    companyDetails: {
      cin: 'U40106MH2018PTC301928',
      incorporationDate: '14-Apr-2018',
      directors: ['Kiran V. Deshmukh', 'Prakash K. Deshmukh'],
      registeredAddress: 'Hadapsar Industrial Estate, Pune, Maharashtra 411013',
      employeeCountEPFO: 85,
      creditRating: 'BBB+ (Moderate)',
      paidUpCapital: '₹ 3.5 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 11.4 },
      { year: 'FY 2024-25', amount: 12.8 },
      { year: 'FY 2025-26', amount: 14.1 }
    ],
    localContentBreakdown: { local: 58.5, imported: 41.5, required: 60.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 90, max: 100 },
      { name: 'ITR Consistency', score: 95, max: 100 },
      { name: 'MII Margin', score: 50, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 85, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '98.0%',
      pagesScanned: 13,
      textBlocksDetected: 320,
      boundingPolyCount: 320,
      ocrLatency: '124ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.1%', ocrExtracted: 'UDYAM-MH-12-0010928 | Small Enterprise', deductionReason: 'Active MSME registration.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 18, maxScore: 20, status: 'Pass', ocrConfidence: '98.0%', ocrExtracted: 'GSTIN: 27AAACH1029G1Z3 | Filed', deductionReason: 'Filing compliant.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.3%', ocrExtracted: 'Gross Turnover: ₹ 14.1 Cr', deductionReason: 'Turnover compliant.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 6, maxScore: 15, status: 'Warning', ocrConfidence: '97.4%', ocrExtracted: 'Local Content: 58.5% (Required: 60.0%)', deductionReason: '9 pts deducted: Fails 60% requirement by 1.5%.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Status: CLEAR', deductionReason: 'Clean record.' },
      { doc: '6. OEM Authorization Letter', type: 'Photo Scan', score: 0, maxScore: 10, status: 'Warning', ocrConfidence: '95.8%', ocrExtracted: 'Unverified OEM Digital Stamp', deductionReason: '10 pts deducted: Missing OEM DigiLocker root verification.' }
    ],
    crossCheckPoints: [
      { docA: 'MII Declaration Affidavit', docB: 'Tender Clause 2.1', parameter: 'MII Mandatory Percentage', status: 'SHORTFALL', similarity: '92%', notes: 'Local content 58.5% is below 60.0% solar tender threshold.' }
    ],
    failureDetails: [
      { title: 'Make in India Shortfall (58.5% vs 60.0% Required)', reason: 'Local value addition is 58.5%, falling short of 60.0% solar tender clause.', impact: 'May be treated as Class-II local supplier.', ruleViolation: 'NTPC Renewable Energy MII Clause 2.1', remedy: 'Seek clarification if relaxation applies for MSMEs.' }
    ],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Small Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: 'Compliant.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Turnover ₹ 14.1 Cr.' },
      { name: 'Make in India (MII) Content', status: 'Warning', detail: '58.5% (Short of 60.0%).' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clean.' },
      { name: 'EPFO & ESIC Compliance', status: 'Pass', detail: 'Paid for 85 employees.' },
      { name: 'DigiLocker Verification', status: 'Warning', detail: 'Unverified OEM stamp.' }
    ]
  },
  {
    id: 'BID-204',
    companyName: 'Orbit Energy Infra Ltd',
    tenderId: 'GEM/2026/B/948211',
    gstin: '08AAACO1092P1Z8',
    pan: 'AAACO1092P',
    udyamNo: 'UDYAM-RJ-06-0038201',
    score: 41,
    status: 'Non-Compliant',
    riskLevel: 'High Risk',
    badgeColor: 'red',
    recommendation: 'DISQUALIFY BIDDER',
    summary: 'CRITICAL FAILURE: Turnover shortfall (₹ 8.5 Cr vs ₹ 10 Cr required), Make in India content 35.0% (Non-Local), and EPFO Section 7A inquiry notice for unpaid worker provident fund.',
    localContent: '35.0% (Non-Local Supplier)',
    turnover: '₹ 8.5 Cr / yr',
    companyDetails: {
      cin: 'U40106RJ2017PLC058912',
      incorporationDate: '04-Oct-2017',
      directors: ['Rakesh K. Agarwal', 'Sunita Agarwal'],
      registeredAddress: 'RIICO Industrial Area, Sitapura, Jaipur, Rajasthan 302022',
      employeeCountEPFO: 60,
      creditRating: 'CARE D (Speculative / Default)',
      paidUpCapital: '₹ 2.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 7.2 },
      { year: 'FY 2024-25', amount: 7.9 },
      { year: 'FY 2025-26', amount: 8.5 }
    ],
    localContentBreakdown: { local: 35.0, imported: 65.0, required: 60.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 70, max: 100 },
      { name: 'ITR Consistency', score: 75, max: 100 },
      { name: 'MII Margin', score: 30, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 20, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '96.5%',
      pagesScanned: 15,
      textBlocksDetected: 340,
      boundingPolyCount: 340,
      ocrLatency: '135ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.0%', ocrExtracted: 'UDYAM-RJ-06-0038201 | Small Enterprise', deductionReason: 'Active MSME cert.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 14, maxScore: 20, status: 'Warning', ocrConfidence: '97.2%', ocrExtracted: 'Delayed Filings 30 Days', deductionReason: '6 pts deducted for late tax returns.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 5, maxScore: 20, status: 'Fail', ocrConfidence: '98.1%', ocrExtracted: 'Turnover ₹ 8.5 Cr (Required ₹ 10.0 Cr)', deductionReason: '15 pts deducted: Fails ₹ 10 Cr turnover requirement.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 2, maxScore: 15, status: 'Fail', ocrConfidence: '96.0%', ocrExtracted: 'Local Content: 35.0% (Non-Local)', deductionReason: '13 pts deducted: Non-Local supplier under MII order.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Status: CLEAR', deductionReason: 'Clean record.' },
      { doc: '6. OEM Authorization Letter', type: 'Photo Scan', score: 0, maxScore: 10, status: 'Fail', ocrConfidence: '91.0%', ocrExtracted: 'EPFO Section 7A Inquiry Notice Attached', deductionReason: '10 pts deducted: Unpaid worker provident fund dues.' }
    ],
    crossCheckPoints: [
      { docA: 'EPFO Compliance Portal', docB: 'Worker ECR Ledgers', parameter: 'Provident Fund Payment', status: 'CRITICAL FAIL', similarity: '25%', notes: 'Active inquiry notice under Section 7A of EPF Act for unpaid worker dues.' }
    ],
    failureDetails: [
      { title: 'EPFO Statutory Provident Fund Default', reason: 'Section 7A inquiry notice active for unpaid worker dues.', impact: 'Direct disqualification under labor compliance clauses.', ruleViolation: 'Employees Provident Funds Act 1952', remedy: 'Reject bid and mandate clearance certificate.' }
    ],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Small Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Warning', detail: '30 days late filing.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Fail', detail: 'Turnover ₹ 8.5 Cr (Required ₹ 10 Cr).' },
      { name: 'Make in India (MII) Content', status: 'Fail', detail: '35.0% Non-Local Supplier.' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clean.' },
      { name: 'EPFO & ESIC Compliance', status: 'Fail', detail: 'EPFO Section 7A inquiry notice.' },
      { name: 'DigiLocker Verification', status: 'Fail', detail: 'EPFO default notice.' }
    ]
  },

  // =========================================================================
  // TENDER 3: GEM/2026/B/301944 (Facility Management & Security - 3 Bidders)
  // =========================================================================
  {
    id: 'BID-301',
    companyName: 'Sterling FM & Security Services Ltd',
    tenderId: 'GEM/2026/B/301944',
    gstin: '07AAACS1109M1Z8',
    pan: 'AAACS1109M',
    udyamNo: 'UDYAM-DL-05-0019481',
    score: 96,
    status: 'Compliant',
    riskLevel: 'Low Risk',
    badgeColor: 'green',
    recommendation: 'QUALIFY BIDDER',
    summary: 'EXCELLENT COMPLIANCE: 100% domestic service delivery, valid PSARA security operating license, 3-year turnover ₹ 11.2 Cr exceeds ₹ 5.0 Cr requirement.',
    localContent: '100.0% (Class-I Supplier)',
    turnover: '₹ 11.2 Cr / yr',
    companyDetails: {
      cin: 'U74900DL2012PLC238910',
      incorporationDate: '18-Aug-2012',
      directors: ['Col. Ramesh Singh (Retd.)', 'Sunita Singh'],
      registeredAddress: 'Barakhamba Road, Connaught Place, New Delhi 110001',
      employeeCountEPFO: 640,
      creditRating: 'CRISIL A (Stable)',
      paidUpCapital: '₹ 5.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 9.5 },
      { year: 'FY 2024-25', amount: 10.4 },
      { year: 'FY 2025-26', amount: 11.2 }
    ],
    localContentBreakdown: { local: 100.0, imported: 0.0, required: 40.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 100, max: 100 },
      { name: 'ITR Consistency', score: 100, max: 100 },
      { name: 'MII Margin', score: 100, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 95, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '99.5%',
      pagesScanned: 15,
      textBlocksDetected: 360,
      boundingPolyCount: 360,
      ocrLatency: '112ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.8%', ocrExtracted: 'UDYAM-DL-05-0019481 | Active Medium Enterprise', deductionReason: 'Active MSME registration.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.6%', ocrExtracted: 'GSTIN: 07AAACS1109M1Z8 | Filed', deductionReason: 'Filing compliant.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.9%', ocrExtracted: 'Gross Turnover: ₹ 11.2 Cr', deductionReason: 'Turnover verified.' },
      { doc: '4. PSARA License Document', type: 'PDF Document', score: 16, maxScore: 16, status: 'Pass', ocrConfidence: '99.2%', ocrExtracted: 'PSARA License Valid till 30-Nov-2028', deductionReason: 'Valid security operating license.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Status: CLEAR', deductionReason: 'Clean record.' },
      { doc: '6. EPFO & ESIC ECR Receipts', type: 'PDF Document', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '99.4%', ocrExtracted: 'EPFO ECR Paid for 640 workers', deductionReason: 'Compliant ECR filing.' }
    ],
    crossCheckPoints: [
      { docA: 'PSARA License', docB: 'Home Department Registry', parameter: 'Security Operating License Check', status: 'MATCH', similarity: '100%', notes: 'Valid license confirmed.' }
    ],
    failureDetails: [],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Medium Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: 'Compliant.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Turnover ₹ 11.2 Cr.' },
      { name: 'Make in India (MII) Content', status: 'Pass', detail: '100% domestic service.' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clean.' },
      { name: 'EPFO & ESIC Compliance', status: 'Pass', detail: 'Paid for 640 workers.' },
      { name: 'DigiLocker Verification', status: 'Pass', detail: 'PSARA License verified.' }
    ]
  },
  {
    id: 'BID-303',
    companyName: 'Royal Security & Infrastructure Ltd',
    tenderId: 'GEM/2026/B/301944',
    gstin: '09AAACR4810K1Z5',
    pan: 'AAACR4810K',
    udyamNo: 'UDYAM-UP-08-0048102',
    score: 74,
    status: 'Warning',
    riskLevel: 'Medium Risk',
    badgeColor: 'amber',
    recommendation: 'SEEK CLARIFICATION',
    summary: 'Turnover ₹ 6.8 Cr complies with ₹ 5.0 Cr requirement. Minor ESIC payment delay for 15 workers noted.',
    localContent: '100.0% (Class-I Supplier)',
    turnover: '₹ 6.8 Cr / yr',
    companyDetails: {
      cin: 'U74900UP2016PLC078912',
      incorporationDate: '12-Mar-2016',
      directors: ['Virendra Pratap Singh', 'Rajesh Pratap Singh'],
      registeredAddress: 'Sanjay Place, Agra, Uttar Pradesh 282002',
      employeeCountEPFO: 190,
      creditRating: 'BBB (Moderate)',
      paidUpCapital: '₹ 2.5 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 5.6 },
      { year: 'FY 2024-25', amount: 6.1 },
      { year: 'FY 2025-26', amount: 6.8 }
    ],
    localContentBreakdown: { local: 100.0, imported: 0.0, required: 40.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 95, max: 100 },
      { name: 'ITR Consistency', score: 90, max: 100 },
      { name: 'MII Margin', score: 100, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 85, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '98.3%',
      pagesScanned: 11,
      textBlocksDetected: 290,
      boundingPolyCount: 290,
      ocrLatency: '116ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.0%', ocrExtracted: 'UDYAM-UP-08-0048102 | Small Enterprise', deductionReason: 'Active MSME cert.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 18, maxScore: 20, status: 'Pass', ocrConfidence: '98.1%', ocrExtracted: 'Filed', deductionReason: 'Filing compliant.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.2%', ocrExtracted: 'Turnover ₹ 6.8 Cr', deductionReason: 'Compliant.' },
      { doc: '4. PSARA License Document', type: 'PDF Document', score: 16, maxScore: 16, status: 'Pass', ocrConfidence: '98.5%', ocrExtracted: 'Valid till Oct 2027', deductionReason: 'Valid license.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Status: CLEAR', deductionReason: 'Clean record.' },
      { doc: '6. EPFO & ESIC ECR Receipts', type: 'PDF Document', score: 0, maxScore: 10, status: 'Warning', ocrConfidence: '96.0%', ocrExtracted: 'ESIC Grace Period Payment Delay', deductionReason: '10 pts deducted for ESIC grace period payment delay.' }
    ],
    crossCheckPoints: [
      { docA: 'ESIC Portal', docB: 'Employee Ledgers', parameter: 'ESIC Payment Audit', status: 'DELAYED', similarity: '85%', notes: 'ESIC contribution paid during grace period.' }
    ],
    failureDetails: [],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Small Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: 'Compliant.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Turnover ₹ 6.8 Cr.' },
      { name: 'Make in India (MII) Content', status: 'Pass', detail: '100% domestic service.' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clean.' },
      { name: 'EPFO & ESIC Compliance', status: 'Warning', detail: 'Minor ESIC grace period delay.' },
      { name: 'DigiLocker Verification', status: 'Pass', detail: 'Verified.' }
    ]
  },
  {
    id: 'BID-302',
    companyName: 'Sentinel Protection Force Pvt Ltd',
    tenderId: 'GEM/2026/B/301944',
    gstin: '09AABCS1109M1Z8',
    pan: 'AABCS1109M',
    udyamNo: 'UDYAM-UP-01-0048201 (Lapsed)',
    score: 28,
    status: 'Non-Compliant',
    riskLevel: 'High Risk',
    badgeColor: 'red',
    recommendation: 'DISQUALIFY BIDDER',
    summary: 'CRITICAL FAILURE: Expired PSARA Security Operating License (Lapsed April 2025), EPFO Section 7A inquiry notice for unpaid worker dues, and turnover shortfall (₹ 4.1 Cr vs ₹ 5.0 Cr required).',
    localContent: '100.0% (Class-I Supplier)',
    turnover: '₹ 4.1 Cr / yr',
    companyDetails: {
      cin: 'U74900UP2015PTC068102',
      incorporationDate: '10-Jul-2015',
      directors: ['Sanjay K. Verma', 'Anita Verma'],
      registeredAddress: 'Transport Nagar, Kanpur, Uttar Pradesh 208023',
      employeeCountEPFO: 75,
      creditRating: 'CARE D (Default)',
      paidUpCapital: '₹ 1.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 4.8 },
      { year: 'FY 2024-25', amount: 4.5 },
      { year: 'FY 2025-26', amount: 4.1 }
    ],
    localContentBreakdown: { local: 100.0, imported: 0.0, required: 40.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 40, max: 100 },
      { name: 'ITR Consistency', score: 60, max: 100 },
      { name: 'MII Margin', score: 100, max: 100 },
      { name: 'Debarment Cleanliness', score: 50, max: 100 },
      { name: 'Hash Authenticity', score: 0, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '96.1%',
      pagesScanned: 18,
      textBlocksDetected: 410,
      boundingPolyCount: 410,
      ocrLatency: '138ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 10, maxScore: 20, status: 'Warning', ocrConfidence: '98.0%', ocrExtracted: 'UDYAM-UP-01-0048201 | Lapsed Cert', deductionReason: 'Lapsed certificate.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 10, maxScore: 20, status: 'Warning', ocrConfidence: '97.0%', ocrExtracted: 'Delayed Filings', deductionReason: 'Late filing.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 8, maxScore: 20, status: 'Fail', ocrConfidence: '98.2%', ocrExtracted: 'Turnover ₹ 4.1 Cr (Required ₹ 5.0 Cr)', deductionReason: 'Turnover shortfall.' },
      { doc: '4. PSARA License Document', type: 'PDF Document', score: 0, maxScore: 16, status: 'Fail', ocrConfidence: '99.0%', ocrExtracted: 'License Expired on 30-Apr-2025', deductionReason: 'Expired PSARA operating license.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 0, maxScore: 10, status: 'Fail', ocrConfidence: '100.0%', ocrExtracted: 'Debarment Notice Flagged', deductionReason: 'EPFO Section 7A inquiry notice.' },
      { doc: '6. EPFO & ESIC ECR Receipts', type: 'PDF Document', score: 0, maxScore: 10, status: 'Fail', ocrConfidence: '95.0%', ocrExtracted: 'EPFO Section 7A Inquiry Notice', deductionReason: 'Unpaid worker provident fund.' }
    ],
    crossCheckPoints: [
      { docA: 'PSARA License Document', docB: 'Home Department Registry', parameter: 'Operating License Validity', status: 'EXPIRED', similarity: '15%', notes: 'License expired on 30-Apr-2025; no renewal certificate provided.' }
    ],
    failureDetails: [
      { title: 'Statutory EPFO Provident Fund Default', reason: 'Active inquiry notice under Section 7A of EPF Act.', impact: 'Critical statutory non-compliance.', ruleViolation: 'Employees Provident Funds Act 1952', remedy: 'Reject bid and mandate clearance certificate.' },
      { title: 'Expired PSARA Private Security License', reason: 'License lapsed on 30-Apr-2025 without valid renewal order.', impact: 'Operating without valid statutory license is illegal.', ruleViolation: 'PSARA Act 2005 § 4', remedy: 'Immediate technical disqualification.' },
      { title: 'Annual Turnover Shortfall (₹ 4.1 Cr vs ₹ 5.0 Cr Required)', reason: 'Average 3-year turnover is ₹ 4.1 Cr.', impact: 'Financial eligibility criteria not met.', ruleViolation: 'GeM Prequalification Criteria Clause 3.2', remedy: 'Non-responsive technical bid.' }
    ],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active MSME registration.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: 'GSTIN 09AABCS1109M1Z8.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Warning', detail: 'Turnover ₹ 4.1 Cr (Short of ₹ 5.0 Cr).' },
      { name: 'Make in India (MII) Content', status: 'Pass', detail: '100% Service Delivery.' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clear.' },
      { name: 'EPFO & ESIC Compliance', status: 'Fail', detail: 'EPFO Section 7A inquiry for unpaid dues.' },
      { name: 'DigiLocker Verification', status: 'Fail', detail: 'PSARA License expired.' }
    ]
  },

  // =========================================================================
  // TENDER 4: GEM/2026/B/771029 (MRI Scanners AIIMS - 3 Bidders)
  // =========================================================================
  {
    id: 'BID-401',
    companyName: 'MedTech Healthcare Solutions Ltd',
    tenderId: 'GEM/2026/B/771029',
    gstin: '07AAACM4810L1Z2',
    pan: 'AAACM4810L',
    udyamNo: 'UDYAM-DL-08-0091029',
    score: 94,
    status: 'Compliant',
    riskLevel: 'Low Risk',
    badgeColor: 'green',
    recommendation: 'QUALIFY BIDDER',
    summary: 'EXCELLENT COMPLIANCE: 62.0% Make in India local content (Class-I), AERB radiation safety clearance & US-FDA approvals verified, 3-year turnover ₹ 58.0 Cr exceeds ₹ 30.0 Cr requirement.',
    localContent: '62.0% (Class-I Supplier)',
    turnover: '₹ 58.0 Cr / yr',
    companyDetails: {
      cin: 'U33110DL2011PLC219482',
      incorporationDate: '04-May-2011',
      directors: ['Dr. Arvinder Singh (MD)', 'Sangeeta Singh (Director)'],
      registeredAddress: 'Okhla Industrial Area Phase I, New Delhi 110020',
      employeeCountEPFO: 410,
      creditRating: 'CRISIL AA (Stable)',
      paidUpCapital: '₹ 15.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 48.0 },
      { year: 'FY 2024-25', amount: 52.5 },
      { year: 'FY 2025-26', amount: 58.0 }
    ],
    localContentBreakdown: { local: 62.0, imported: 38.0, required: 50.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 100, max: 100 },
      { name: 'ITR Consistency', score: 100, max: 100 },
      { name: 'MII Margin', score: 90, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 95, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '99.4%',
      pagesScanned: 24,
      textBlocksDetected: 520,
      boundingPolyCount: 520,
      ocrLatency: '118ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.8%', ocrExtracted: 'UDYAM-DL-08-0091029 | Medium Enterprise', deductionReason: 'Active MSME cert.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.5%', ocrExtracted: 'GSTIN: 07AAACM4810L1Z2 | Filed', deductionReason: 'Compliant filing.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.9%', ocrExtracted: 'Gross Turnover: ₹ 58.0 Cr', deductionReason: 'Turnover verified.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 14, maxScore: 15, status: 'Pass', ocrConfidence: '98.9%', ocrExtracted: 'Local Content: 62.0% (Class-I)', deductionReason: 'Exceeds 50% requirement.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Status: CLEAR', deductionReason: 'Clean record.' },
      { doc: '6. AERB Safety Clearance Certificate', type: 'PDF Document', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '99.3%', ocrExtracted: 'AERB Approval Code: AERB-MRI-2026-99412', deductionReason: 'AERB radiation safety clearance verified.' }
    ],
    crossCheckPoints: [
      { docA: 'AERB Portal', docB: 'Equipment Specification Sheet', parameter: 'Radiation Safety Approval', status: 'MATCH', similarity: '100%', notes: 'AERB clearance active.' }
    ],
    failureDetails: [],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Medium Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: 'Compliant.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Turnover ₹ 58.0 Cr.' },
      { name: 'Make in India (MII) Content', status: 'Pass', detail: '62.0% local content.' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clean.' },
      { name: 'EPFO & ESIC Compliance', status: 'Pass', detail: 'Paid for 410 employees.' },
      { name: 'DigiLocker Verification', status: 'Pass', detail: 'AERB clearance verified.' }
    ]
  },
  {
    id: 'BID-402',
    companyName: 'BioHealth Diagnostics Pvt Ltd',
    tenderId: 'GEM/2026/B/771029',
    gstin: '27AAACB1029M1Z6',
    pan: 'AAACB1029M',
    udyamNo: 'UDYAM-MH-15-0038102',
    score: 81,
    status: 'Compliant',
    riskLevel: 'Low Risk',
    badgeColor: 'green',
    recommendation: 'QUALIFY BIDDER',
    summary: 'Turnover ₹ 36.5 Cr exceeds ₹ 30.0 Cr requirement. Make in India local content 54.0% satisfies 50% Class-I threshold.',
    localContent: '54.0% (Class-I Supplier)',
    turnover: '₹ 36.5 Cr / yr',
    companyDetails: {
      cin: 'U33110MH2016PTC284910',
      incorporationDate: '19-Sep-2016',
      directors: ['Dr. Nitin Kulkarni', 'Sujata Kulkarni'],
      registeredAddress: 'Andheri East, Mumbai, Maharashtra 400069',
      employeeCountEPFO: 210,
      creditRating: 'A (Stable)',
      paidUpCapital: '₹ 8.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 30.2 },
      { year: 'FY 2024-25', amount: 33.1 },
      { year: 'FY 2025-26', amount: 36.5 }
    ],
    localContentBreakdown: { local: 54.0, imported: 46.0, required: 50.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 95, max: 100 },
      { name: 'ITR Consistency', score: 95, max: 100 },
      { name: 'MII Margin', score: 75, max: 100 },
      { name: 'Debarment Cleanliness', score: 100, max: 100 },
      { name: 'Hash Authenticity', score: 90, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '98.8%',
      pagesScanned: 19,
      textBlocksDetected: 420,
      boundingPolyCount: 420,
      ocrLatency: '122ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.3%', ocrExtracted: 'UDYAM-MH-15-0038102 | Medium Enterprise', deductionReason: 'Active MSME cert.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 18, maxScore: 20, status: 'Pass', ocrConfidence: '98.4%', ocrExtracted: 'Filed', deductionReason: 'Filing compliant.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '99.1%', ocrExtracted: 'Turnover ₹ 36.5 Cr', deductionReason: 'Turnover compliant.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 13, maxScore: 15, status: 'Pass', ocrConfidence: '97.9%', ocrExtracted: 'Local Content: 54.0%', deductionReason: 'Exceeds 50% Class-I limit.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 10, maxScore: 10, status: 'Pass', ocrConfidence: '100.0%', ocrExtracted: 'Status: CLEAR', deductionReason: 'Clean record.' },
      { doc: '6. AERB Safety Clearance Certificate', type: 'PDF Document', score: 0, maxScore: 10, status: 'Warning', ocrConfidence: '96.5%', ocrExtracted: 'AERB Certificate Renewal Pending', deductionReason: '10 pts deducted for AERB renewal pending.' }
    ],
    crossCheckPoints: [
      { docA: 'AERB Portal', docB: 'Submitted Safety Certificate', parameter: 'Clearance Renewal Check', status: 'PENDING RENEWAL', similarity: '88%', notes: 'AERB renewal application submitted, final certificate awaited.' }
    ],
    failureDetails: [],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Medium Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Pass', detail: 'Compliant.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Pass', detail: 'Turnover ₹ 36.5 Cr.' },
      { name: 'Make in India (MII) Content', status: 'Pass', detail: '54.0% local content.' },
      { name: 'CPPP Debarment Watchlist', status: 'Pass', detail: 'Clean.' },
      { name: 'EPFO & ESIC Compliance', status: 'Pass', detail: 'Paid for 210 employees.' },
      { name: 'DigiLocker Verification', status: 'Warning', detail: 'AERB renewal pending.' }
    ]
  },
  {
    id: 'BID-403',
    companyName: 'Global MedEquip Trading Co',
    tenderId: 'GEM/2026/B/771029',
    gstin: '06AAACG1029M1Z0',
    pan: 'AAACG1029M',
    udyamNo: 'UDYAM-HR-04-0019482',
    score: 22,
    status: 'Non-Compliant',
    riskLevel: 'High Risk',
    badgeColor: 'red',
    recommendation: 'DISQUALIFY BIDDER',
    summary: 'CRITICAL FAILURE: Non-Local Supplier (12.0% local content vs 50% required), turnover shortfall (₹ 19.0 Cr vs ₹ 30.0 Cr required), and active CPPP blacklist order by AIIMS Rishikesh.',
    localContent: '12.0% (Non-Local Supplier)',
    turnover: '₹ 19.0 Cr / yr',
    companyDetails: {
      cin: 'U33110HR2013PLC048910',
      incorporationDate: '02-Oct-2013',
      directors: ['Pankaj L. Singhal', 'Manju Singhal'],
      registeredAddress: 'Udyog Vihar Phase IV, Gurugram, Haryana 122015',
      employeeCountEPFO: 40,
      creditRating: 'D (Default)',
      paidUpCapital: '₹ 2.0 Crore'
    },
    turnoverHistory: [
      { year: 'FY 2023-24', amount: 22.0 },
      { year: 'FY 2024-25', amount: 20.5 },
      { year: 'FY 2025-26', amount: 19.0 }
    ],
    localContentBreakdown: { local: 12.0, imported: 88.0, required: 50.0 },
    statutoryIndices: [
      { name: 'GST Timeliness', score: 40, max: 100 },
      { name: 'ITR Consistency', score: 60, max: 100 },
      { name: 'MII Margin', score: 10, max: 100 },
      { name: 'Debarment Cleanliness', score: 0, max: 100 },
      { name: 'Hash Authenticity', score: 0, max: 100 }
    ],
    paddleOcrMetrics: {
      engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
      avgConfidence: '95.2%',
      pagesScanned: 26,
      textBlocksDetected: 580,
      boundingPolyCount: 580,
      ocrLatency: '145ms / page'
    },
    documentScores: [
      { doc: '1. Udyam MSME Certificate', type: 'PDF Document', score: 20, maxScore: 20, status: 'Pass', ocrConfidence: '98.5%', ocrExtracted: 'UDYAM-HR-04-0019482 | Small Enterprise', deductionReason: 'Active MSME cert.' },
      { doc: '2. GSTR-3B Tax Filing Proof', type: 'PDF Document', score: 2, maxScore: 20, status: 'Fail', ocrConfidence: '96.0%', ocrExtracted: 'GSTIN Defaulted | Multiple Late Returns', deductionReason: '18 pts deducted for tax defaults.' },
      { doc: '3. Income Tax PAN & ITR-6', type: 'PDF Document', score: 0, maxScore: 20, status: 'Fail', ocrConfidence: '97.2%', ocrExtracted: 'Turnover ₹ 19.0 Cr (Required ₹ 30.0 Cr)', deductionReason: '20 pts deducted: Severe turnover shortfall.' },
      { doc: '4. Make in India BOM Affidavit', type: 'PDF Document', score: 0, maxScore: 15, status: 'Fail', ocrConfidence: '95.0%', ocrExtracted: 'Local Content: 12.0% (Non-Local)', deductionReason: '15 pts deducted: Non-Local supplier.' },
      { doc: '5. CPPP Debarment Registry Check', type: 'API Stream', score: 0, maxScore: 10, status: 'Fail', ocrConfidence: '100.0%', ocrExtracted: 'Debarment Order: AIIMS-R/2025/102 | Active till Dec 2026', deductionReason: '10 pts deducted: Active CPPP Blacklist.' },
      { doc: '6. AERB Safety Clearance Certificate', type: 'PDF Document', score: 0, maxScore: 10, status: 'Fail', ocrConfidence: '90.0%', ocrExtracted: 'AERB Certificate Missing', deductionReason: '10 pts deducted: Missing mandatory AERB clearance.' }
    ],
    crossCheckPoints: [
      { docA: 'CPPP Registry', docB: 'Bidder Eligibility', parameter: 'Debarment Order Check', status: 'CRITICAL FAIL', similarity: '0%', notes: 'Debarred by AIIMS Rishikesh for supplying refurbished scanners as new.' }
    ],
    failureDetails: [
      { title: 'Active CPPP Debarment Order (AIIMS Rishikesh)', reason: 'Debarred under Order AIIMS-R/2025/102 for breach of contract.', impact: 'MANDATORY DISQUALIFICATION.', ruleViolation: 'GFR 2017 Rule 151(iii)', remedy: 'Disqualify technical bid.' }
    ],
    checks: [
      { name: 'Udyam / MSME Registration', status: 'Pass', detail: 'Active Small Enterprise.' },
      { name: 'GST Registration & Filing', status: 'Fail', detail: 'GST default.' },
      { name: 'Income Tax (PAN & ITR)', status: 'Fail', detail: 'Turnover ₹ 19.0 Cr (Short of ₹ 30 Cr).' },
      { name: 'Make in India (MII) Content', status: 'Fail', detail: '12.0% Non-Local Supplier.' },
      { name: 'CPPP Debarment Watchlist', status: 'Fail', detail: 'DEBARRED by AIIMS Rishikesh.' },
      { name: 'EPFO & ESIC Compliance', status: 'Warning', detail: 'Default notice.' },
      { name: 'DigiLocker Verification', status: 'Fail', detail: 'Missing AERB clearance.' }
    ]
  }
];

export const PORTALS = [
  { name: 'Udyam MSME Portal', status: 'Connected', desc: 'Verifies MSME Registration & Enterprise Category' },
  { name: 'GSTN Gateway', status: 'Connected', desc: 'Checks GSTIN status and GSTR-3B/1 return filings' },
  { name: 'Income Tax e-Filing API', status: 'Connected', desc: 'Validates PAN authenticity & 3-year ITR filings' },
  { name: 'MCA21 Corporate Portal', status: 'Connected', desc: 'Checks Company Incorporation & Director DINs' },
  { name: 'EPFO Unified Portal', status: 'Connected', desc: 'Verifies Provident Fund ECR payments for workers' },
  { name: 'ESIC Portal', status: 'Connected', desc: 'Checks Employees State Insurance Compliance' },
  { name: 'DigiLocker Gateway', status: 'Connected', desc: 'Verifies digital signatures on uploaded documents' },
  { name: 'CPPP Debarment Registry', status: 'Connected', desc: 'Searches 34 CPSE blacklists & debarment orders' }
];

export const AUDIT_LOGS = [
  { date: '16-Sep-2026 14:20', bidder: 'TechCorp India Pvt Ltd', tender: 'GEM/2026/B/582910', result: '95% (Pass)', action: 'Qualified by Procurement Officer' },
  { date: '16-Sep-2026 14:22', bidder: 'Apex Global Hardware Ltd', tender: 'GEM/2026/B/582910', result: '32% (Fail)', action: 'Disqualified - Debarred on CPPP' },
  { date: '16-Sep-2026 14:25', bidder: 'Surya Green Energy Ltd', tender: 'GEM/2026/B/582910', result: '68% (Warning)', action: 'Clarification Letter Issued' },
  { date: '17-Sep-2026 10:15', bidder: 'SunPower Infrastructures Ltd', tender: 'GEM/2026/B/948211', result: '92% (Pass)', action: 'Technical Bid Approved' },
  { date: '17-Sep-2026 11:30', bidder: 'Helios Clean Energy Systems', tender: 'GEM/2026/B/948211', result: '64% (Warning)', action: 'MII Clarification Requested' },
  { date: '18-Sep-2026 09:40', bidder: 'Zenith Solar Power Tech Pvt Ltd', tender: 'GEM/2026/B/948211', result: '98% (Pass)', action: 'Qualified - High MII Margin' },
  { date: '18-Sep-2026 11:10', bidder: 'Sterling FM & Security Services Ltd', tender: 'GEM/2026/B/301944', result: '96% (Pass)', action: 'Technical Bid Approved' },
  { date: '18-Sep-2026 15:05', bidder: 'MedTech Healthcare Solutions Ltd', tender: 'GEM/2026/B/771029', result: '94% (Pass)', action: 'AERB & MII Verified - Qualified' }
];
