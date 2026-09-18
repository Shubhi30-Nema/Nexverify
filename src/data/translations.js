// src/data/translations.js — Complete English & Hindi (हिंदी) Translation Dictionary

export const TRANSLATIONS = {
  English: {
    // Header & Navigation
    dashboard: 'Dashboard',
    verify: 'Verify Bid',
    upload: 'Upload Docs',
    tenders: 'GeM Tenders',
    portals: 'Govt Portals',
    audit: 'Audit Log',
    officerLogin: 'Officer Login',
    officerSignIn: 'Procurement Officer Sign In',
    searchPlaceholder: 'Looking for something on GeM?',
    darkMode: 'Dark Mode',
    skipContent: 'Skip to Main Content',
    fontSize: 'Font Size',
    language: 'English',
    changeLogo: 'Set Custom Logo',
    yourLogoHere: 'YOUR LOGO HERE',
    clickInsertLogo: 'Click to insert custom logo',
    subHeaderDesc: 'GeM Bid Compliance & Statutory Verification Support',
    newOnGem: 'New on GeM',
    liveNotifs: 'Live Notifications & Audit Alerts',
    markAllRead: 'Mark all read',
    clearNotifs: 'Clear notifications',
    noNotifs: 'No new notifications',

    // Dashboard View
    heroBadge: 'Powered by PaddleOCR v3.0 High-Precision Recognition Engine',
    heroTitle: 'GeM Procurement Compliance Engine & PaddleOCR Reader',
    heroDesc: 'Automated statutory document parsing, multi-portal API cross-checks, and AI qualification scoring for government tenders.',
    uploadScanBtn: 'Upload & Scan Documents',
    runVerifierBtn: 'Run AI Verifier Engine',
    totalBidsScanned: 'Total Bids Scanned',
    bidsScannedSub: '100% Multi-Portal Automated Sync',
    paddleOcrAccuracy: 'PaddleOCR Accuracy',
    paddleOcrAccuracySub: 'Multilingual PP-OCRv4 Text Recognition',
    highRiskFlags: 'High-Risk Flags Detected',
    highRiskFlagsSub: 'CPPP Blacklists & Signature Forgeries Flagged',
    paddleOcrSpeed: 'PaddleOCR Speed',
    paddleOcrSpeedSub: '⚡ 96% Faster than manual document check',

    // Verify Bid View
    verifyCenterTitle: 'Automated GeM Bid Verification Center',
    verifyCenterDesc: 'Current GeM tender and participating bidder are automatically synchronized with verification diagnostics.',
    currentTenderLabel: '1. Current GeM Tender:',
    participatingBidderLabel: '2. Participating Bidder for this Tender',
    available: 'Available',
    runPaddleOcrBtn: 'Run PaddleOCR Verification',
    scanningBtn: 'PaddleOCR Scanning...',
    aiScoringMatrix: 'AI Statutory Qualification Scoring Matrix',
    overallScore: 'Overall Compliance Score',
    recommendation: 'Qualification Recommendation',
    qualifyBidder: 'QUALIFY BIDDER',
    seekClarification: 'SEEK CLARIFICATION',
    disqualifyBidder: 'DISQUALIFY BIDDER',
    statutoryAuditChecks: 'Statutory Multi-Portal Audit Checks',
    crossCheckTitle: 'Multi-Document Pairwise Cross-Check Matrix',

    // Tenders View
    tendersTitle: 'Active GeM Tenders & Live Bids',
    tendersSub: 'Select a tender and bidder to run instant statutory verification cross-checks.',
    searchTendersPlaceholder: 'Search tender number, category, or item...',
    tenderNo: 'Tender No.',
    category: 'Category',
    closingDate: 'Closing Date',
    participatingBidders: 'Participating Bidders',
    actions: 'Actions',
    verifyBidderBtn: 'Verify Bidder',

    // Portal Status View
    portalsTitle: 'Government Statutory API Portals Live Status',
    portalsSub: 'Real-time connectivity monitoring for Udyam, GSTN, MCA21, CPPP, EPFO, ESIC & DigiLocker APIs.',
    apiStatus: 'API Status',
    latency: 'Latency',
    lastSync: 'Last Sync',
    operational: 'OPERATIONAL',

    // Audit Trail View
    auditLedgerTitle: 'Real-Time Compliance Audit Ledger History',
    auditLedgerDesc: 'Time-stamped, immutable record of all automated portal checks, document extractions, and procurement officer qualification decisions.',
    searchAuditPlaceholder: 'Search audit trail...',
    exportCsvBtn: 'Export CSV Log',
    exportJsonBtn: 'Export JSON',
    timestamp: 'Timestamp',
    bidderCompany: 'Bidder Company',
    tenderId: 'Tender ID',
    aiScoreResult: 'AI Score Result',
    officerDecisionAction: 'Officer Decision & Action',

    // Document Upload View
    uploadTitle: 'Upload & Scan Tender Documents',
    uploadDesc: 'Upload bidder PDF, scanned JPG/PNG images or ZIP folders to perform automated PaddleOCR text extraction.',
    dragDropText: 'Drag & drop tender document files here',
    orBrowse: 'or browse files from your computer',
    startOcrScan: 'Start PaddleOCR Auto-Analysis',

    // Footer
    footerTitle: 'NextVerifier Engine • Bharat Sarkar GeM Compliance Platform',
    footerDesc: 'Automated Statutory Verification Engine (Udyam, GSTN, IT, MCA21, EPFO, ESIC, DigiLocker, CPPP)'
  },

  Hindi: {
    // Header & Navigation
    dashboard: 'डैशबोर्ड',
    verify: 'बिड सत्यापन',
    upload: 'दस्तावेज़ अपलोड',
    tenders: 'GeM निविदाएं',
    portals: 'सरकारी पोर्टल',
    audit: 'लेखा परीक्षा लॉग',
    officerLogin: 'अधिकारी लॉगिन',
    officerSignIn: 'खरीद अधिकारी साइन इन',
    searchPlaceholder: 'GeM पोर्टल पर कुछ खोजें...',
    darkMode: 'डार्क मोड',
    skipContent: 'मुख्य सामग्री पर जाएं',
    fontSize: 'फ़ॉन्ट आकार',
    language: 'हिंदी',
    changeLogo: 'कस्टम लोगो सेट करें',
    yourLogoHere: 'आपका लोगो यहां',
    clickInsertLogo: 'कस्टम लोगो डालने के लिए क्लिक करें',
    subHeaderDesc: 'GeM बोली अनुपालन और वैधानिक सत्यापन सहायता',
    newOnGem: 'GeM पर नया',
    liveNotifs: 'लाइव सूचनाएं और ऑडिट अलर्ट',
    markAllRead: 'सभी पढ़े हुए चिह्नित करें',
    clearNotifs: 'सूचनाएं साफ करें',
    noNotifs: 'कोई नई सूचना नहीं',

    // Dashboard View
    heroBadge: 'पैडलओसीआर v3.0 उच्च-सटीकता पहचान इंजन द्वारा संचालित',
    heroTitle: 'GeM खरीद अनुपालन इंजन और पैडलओसीआर दस्तावेज़ रीडर',
    heroDesc: 'स्वचालित वैधानिक दस्तावेज़ पार्सिंग, बहु-पोर्टल एपीआई क्रॉस-चेक, और सरकारी निविदाओं के लिए एआई योग्यता स्कोरिंग।',
    uploadScanBtn: 'दस्तावेज़ अपलोड और स्कैन करें',
    runVerifierBtn: 'AI सत्यापनकर्ता इंजन चलाएं',
    totalBidsScanned: 'कुल स्कैन की गई बोलियां',
    bidsScannedSub: '100% बहु-पोर्टल स्वचालित सिंक',
    paddleOcrAccuracy: 'पैडलओसीआर शुद्धता',
    paddleOcrAccuracySub: 'बहुभाषी PP-OCRv4 पाठ पहचान',
    highRiskFlags: 'उच्च जोखिम ध्वज मिले',
    highRiskFlagsSub: 'CPPP ब्लैकलिस्ट और जालसाजी का पता चला',
    paddleOcrSpeed: 'पैडलओसीआर गति',
    paddleOcrSpeedSub: '⚡ मैनुअल दस्तावेज़ जांच से 96% तेज़',

    // Verify Bid View
    verifyCenterTitle: 'स्वचालित GeM बोली सत्यापन केंद्र',
    verifyCenterDesc: 'वर्तमान GeM निविदा और भाग लेने वाले बोलीदाता स्वचालित रूप से सत्यापन निदान के साथ समन्वयित होते हैं।',
    currentTenderLabel: '1. वर्तमान GeM निविदा:',
    participatingBidderLabel: '2. इस निविदा के लिए भाग लेने वाला बोलीदाता',
    available: 'उपलब्ध',
    runPaddleOcrBtn: 'पैडलओसीआर सत्यापन चलाएं',
    scanningBtn: 'पैडलओसीआर स्कैनिंग जारी है...',
    aiScoringMatrix: 'AI वैधानिक योग्यता स्कोरिंग मैट्रिक्स',
    overallScore: 'समग्र अनुपालन स्कोर',
    recommendation: 'योग्यता सिफारिश',
    qualifyBidder: 'बोलीदाता योग्य घोषित करें',
    seekClarification: 'स्पष्टीकरण मांगें',
    disqualifyBidder: 'बोलीदाता अयोग्य घोषित करें',
    statutoryAuditChecks: 'वैधानिक बहु-पोर्टल लेखा परीक्षा जांच',
    crossCheckTitle: 'बहु-दस्तावेज़ जोड़ीदार क्रॉस-चेक मैट्रिक्स',

    // Tenders View
    tendersTitle: 'सक्रिय GeM निविदाएं और लाइव बोलियां',
    tendersSub: 'त्वरित वैधानिक सत्यापन क्रॉस-चेक चलाने के लिए निविदा और बोलीदाता चुनें।',
    searchTendersPlaceholder: 'निविदा संख्या, श्रेणी, या वस्तु खोजें...',
    tenderNo: 'निविदा संख्या',
    category: 'श्रेणी',
    closingDate: 'अंतिम तिथि',
    participatingBidders: 'भाग लेने वाले बोलीदाता',
    actions: 'कार्रवाई',
    verifyBidderBtn: 'बोलीदाता सत्यापित करें',

    // Portal Status View
    portalsTitle: 'सरकारी वैधानिक एपीआई पोर्टल स्थिति',
    portalsSub: 'उद्यम, जीएसटीएन, एमसीए21, सीपीपीपी, ईपीएफओ, ईएसआईसी और डिजीलॉकर एपीआई का वास्तविक समय अनुश्रवण।',
    apiStatus: 'एपीआई स्थिति',
    latency: 'विलंबता',
    lastSync: 'अंतिम सिंक',
    operational: 'कार्यरत',

    // Audit Trail View
    auditLedgerTitle: 'वास्तविक समय अनुपालन लेखा परीक्षा खाता इतिहास',
    auditLedgerDesc: 'सभी स्वचालित पोर्टल जांचों, दस्तावेज़ निष्कर्षणों, और खरीद अधिकारी योग्यता निर्णयों का समय-मुद्रित रिकॉर्ड।',
    searchAuditPlaceholder: 'लेखा परीक्षा निशान खोजें...',
    exportCsvBtn: 'CSV लॉग निर्यात करें',
    exportJsonBtn: 'JSON निर्यात करें',
    timestamp: 'समय मोहर',
    bidderCompany: 'बोलीदाता कंपनी',
    tenderId: 'निविदा आईडी',
    aiScoreResult: 'AI स्कोर परिणाम',
    officerDecisionAction: 'अधिकारी निर्णय और कार्रवाई',

    // Document Upload View
    uploadTitle: 'निविदा दस्तावेज़ अपलोड और स्कैन करें',
    uploadDesc: 'स्वचालित पैडलओसीआर पाठ निष्कर्षण करने के लिए बोलीदाता पीडीएफ, स्कैन की गई छवियों या ज़िप फ़ाइलों को अपलोड करें।',
    dragDropText: 'यहां निविदा दस्तावेज़ फ़ाइलें खींचें और छोड़ें',
    orBrowse: 'या अपने कंप्यूटर से फ़ाइलें चुनें',
    startOcrScan: 'पैडलओसीआर स्वतः विश्लेषण शुरू करें',

    // Footer
    footerTitle: 'नेक्स्टवेरिफायर इंजन • भारत सरकार GeM अनुपालन मंच',
    footerDesc: 'स्वचालित वैधानिक सत्यापन इंजन (उद्यम, जीएसटीएन, आयकर, एमसीए21, ईपीएफओ, ईएसआईसी, डिजीलॉकर, सीपीपीपी)'
  }
};

// Helper function to get translated text with fallback
export function t(key, language = 'English') {
  const langDict = TRANSLATIONS[language] || TRANSLATIONS['English'];
  return langDict[key] || TRANSLATIONS['English']?.[key] || key;
}

