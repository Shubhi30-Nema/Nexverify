// seed.js — Populates MongoDB with realistic demo data for judge presentation
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nexverify';

// ── Schemas (inline to keep seed self-contained) ────────────────────────

const userSchema = new mongoose.Schema({
  name: String, email: String, password: String,
  role: String, department: String, employeeId: String, isActive: Boolean,
}, { timestamps: true });

const bidderSchema = new mongoose.Schema({
  legalName: String, gstin: String, pan: String, udyamNumber: String,
  cin: String, contactEmail: String, address: String, riskLevel: String,
  tenders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tender' }],
}, { timestamps: true });

const tenderSchema = new mongoose.Schema({
  tenderId: { type: String, unique: true }, title: String, category: String,
  department: String, estimatedValue: Number, estimatedValueLabel: String,
  miiThreshold: Number, turnoverRequirement: Number,
  requiredDocuments: [String], closingDate: Date, status: String,
  bidders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bidder' }],
}, { timestamps: true });

const documentSchema = new mongoose.Schema({
  bidderId: mongoose.Schema.Types.Mixed, tenderId: mongoose.Schema.Types.Mixed,
  docType: String, fileName: String, originalName: String, filePath: String,
  webPath: String, mimeType: String, sizeBytes: Number, digitalHash: String,
  ocrStatus: String, ocrConfidence: Number, boundingPolygonCount: Number,
  rawText: String, extractedFields: mongoose.Schema.Types.Mixed,
  ocrError: String, uploadedAt: Date,
}, { timestamps: true });

const verificationSchema = new mongoose.Schema({
  tenderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender' },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bidder' },
  officerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  docScores: [mongoose.Schema.Types.Mixed],
  crossChecks: [mongoose.Schema.Types.Mixed],
  compositeScore: Number, complianceStatus: String,
  criticalFlags: [String],
  ocrMetrics: mongoose.Schema.Types.Mixed,
  decision: String, decisionReason: String, decisionAt: Date,
  startedAt: Date, completedAt: Date, status: String,
}, { timestamps: true });

const auditLogSchema = new mongoose.Schema({
  verificationId: { type: mongoose.Schema.Types.ObjectId },
  tenderId: { type: mongoose.Schema.Types.ObjectId },
  bidderId: { type: mongoose.Schema.Types.ObjectId },
  actorId: { type: mongoose.Schema.Types.ObjectId },
  actorName: String, actorRole: String, actionType: String,
  payload: mongoose.Schema.Types.Mixed, ipAddress: String, userAgent: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Bidder = mongoose.model('Bidder', bidderSchema);
const Tender = mongoose.model('Tender', tenderSchema);
const Document = mongoose.model('Document', documentSchema);
const Verification = mongoose.model('Verification', verificationSchema);
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

// ── Seed Data ───────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('[Seed] Connected to MongoDB:', MONGO_URI);

  // Drop existing data
  await Promise.all([
    User.deleteMany({}), Bidder.deleteMany({}), Tender.deleteMany({}),
    Document.deleteMany({}), Verification.deleteMany({}), AuditLog.deleteMany({}),
  ]);
  console.log('[Seed] Cleared existing collections');

  // ─── Users ──────────────────────────────────────────────────────────
  const hashedPw = await bcrypt.hash('Officer@2026', 12);
  const users = await User.insertMany([
    { name: 'Rajesh Kumar Sharma', email: 'rajesh.sharma@gov.in', password: hashedPw, role: 'procurement_officer', department: 'Ministry of Defence', employeeId: 'GOV-NIC-40921', isActive: true },
    { name: 'Priya Venkatesh', email: 'priya.venkatesh@gov.in', password: hashedPw, role: 'procurement_officer', department: 'Ministry of Railways', employeeId: 'GOV-NIC-51032', isActive: true },
    { name: 'Amit Patel', email: 'amit.patel@gov.in', password: hashedPw, role: 'admin', department: 'GeM Administration', employeeId: 'GOV-NIC-10005', isActive: true },
  ]);
  console.log(`[Seed] Inserted ${users.length} users`);

  // ─── Bidders ────────────────────────────────────────────────────────
  const bidders = await Bidder.insertMany([
    {
      legalName: 'Bharat Heavy Electricals Ltd',
      gstin: '09AAACB5765R1ZB',
      pan: 'AAACB5765R',
      udyamNumber: 'UDYAM-UP-09-0012345',
      cin: 'L40101UP1964GOI001973',
      contactEmail: 'bids@bhel.in',
      address: 'BHEL House, Siri Fort, New Delhi - 110049',
      riskLevel: 'Low',
    },
    {
      legalName: 'Tata Advanced Systems Ltd',
      gstin: '36AADCT2345M1ZK',
      pan: 'AADCT2345M',
      udyamNumber: 'UDYAM-TG-36-0098712',
      cin: 'U35999TG2007PLC054631',
      contactEmail: 'procurement@tataadvanced.com',
      address: 'Plot 31, Adibatla SEZ, Hyderabad - 501510',
      riskLevel: 'Low',
    },
    {
      legalName: 'Reliance Defence Engineering Ltd',
      gstin: '27AABCR9876N1Z3',
      pan: 'AABCR9876N',
      udyamNumber: '',
      cin: 'U74999MH2015PLC123456',
      contactEmail: 'gem-bids@reliancedefence.com',
      address: 'Maker Chambers IV, Nariman Point, Mumbai - 400021',
      riskLevel: 'Medium',
    },
    {
      legalName: 'Larsen & Toubro Defence',
      gstin: '27AABCL1234P1ZQ',
      pan: 'AABCL1234P',
      udyamNumber: 'UDYAM-MH-27-0054321',
      cin: 'L99999MH1946PLC004768',
      contactEmail: 'defence.bids@lt.com',
      address: 'L&T House, Ballard Estate, Mumbai - 400001',
      riskLevel: 'Low',
    },
    {
      legalName: 'Navratna Infra Solutions Pvt Ltd',
      gstin: '07AAFCN6543K1ZR',
      pan: 'AAFCN6543K',
      udyamNumber: 'UDYAM-DL-07-0076890',
      cin: 'U45201DL2018PTC330215',
      contactEmail: 'info@navratnainfra.in',
      address: '12/4, Nehru Place, New Delhi - 110019',
      riskLevel: 'High',
    },
  ]);
  console.log(`[Seed] Inserted ${bidders.length} bidders`);

  // ─── Tenders ────────────────────────────────────────────────────────
  const tenders = await Tender.insertMany([
    {
      tenderId: 'GEM/2026/B/582910',
      title: 'Supply of 500 KV Power Transformers for Northern Grid',
      category: 'Electrical Equipment',
      department: 'Ministry of Power',
      estimatedValue: 38.5,
      estimatedValueLabel: '₹ 38.5 Crore',
      miiThreshold: 60,
      turnoverRequirement: 15,
      requiredDocuments: ['UDYAM_MSME', 'GSTR_3B', 'PAN_ITR', 'MII_AFFIDAVIT', 'CPPP_DEBARMENT', 'EPFO_ECR', 'BALANCE_SHEET'],
      closingDate: new Date('2026-10-15'),
      status: 'evaluation',
      bidders: [bidders[0]._id, bidders[1]._id, bidders[4]._id],
    },
    {
      tenderId: 'GEM/2026/B/619204',
      title: 'Procurement of Armoured Vehicle Communication Systems',
      category: 'Defence Electronics',
      department: 'Ministry of Defence',
      estimatedValue: 124.7,
      estimatedValueLabel: '₹ 124.7 Crore',
      miiThreshold: 50,
      turnoverRequirement: 50,
      requiredDocuments: ['UDYAM_MSME', 'GSTR_3B', 'PAN_ITR', 'MII_AFFIDAVIT', 'CPPP_DEBARMENT', 'OEM_AUTH', 'IMPORT_BILL_OF_ENTRY', 'EPFO_ECR', 'BALANCE_SHEET'],
      closingDate: new Date('2026-11-01'),
      status: 'open',
      bidders: [bidders[1]._id, bidders[2]._id, bidders[3]._id],
    },
    {
      tenderId: 'GEM/2026/B/703185',
      title: 'Railway Bridge Construction - Varanasi–Prayagraj Section',
      category: 'Infrastructure',
      department: 'Ministry of Railways',
      estimatedValue: 86.2,
      estimatedValueLabel: '₹ 86.2 Crore',
      miiThreshold: 60,
      turnoverRequirement: 30,
      requiredDocuments: ['UDYAM_MSME', 'GSTR_3B', 'PAN_ITR', 'MII_AFFIDAVIT', 'CPPP_DEBARMENT', 'EPFO_ECR', 'BALANCE_SHEET'],
      closingDate: new Date('2026-10-25'),
      status: 'evaluation',
      bidders: [bidders[0]._id, bidders[3]._id, bidders[4]._id],
    },
  ]);

  // Link tenders back to bidders
  await Bidder.updateOne({ _id: bidders[0]._id }, { $set: { tenders: [tenders[0]._id, tenders[2]._id] } });
  await Bidder.updateOne({ _id: bidders[1]._id }, { $set: { tenders: [tenders[0]._id, tenders[1]._id] } });
  await Bidder.updateOne({ _id: bidders[2]._id }, { $set: { tenders: [tenders[1]._id] } });
  await Bidder.updateOne({ _id: bidders[3]._id }, { $set: { tenders: [tenders[1]._id, tenders[2]._id] } });
  await Bidder.updateOne({ _id: bidders[4]._id }, { $set: { tenders: [tenders[0]._id, tenders[2]._id] } });
  console.log(`[Seed] Inserted ${tenders.length} tenders`);

  // ─── Documents (uploaded bid documents with OCR results) ────────────
  const now = new Date();
  const docs = await Document.insertMany([
    // Bidder 0 (BHEL) — Tender 0
    {
      bidderId: bidders[0]._id, tenderId: tenders[0]._id,
      docType: 'UDYAM_MSME', fileName: 'bhel_udyam_cert.pdf', originalName: 'BHEL_Udyam_Certificate.pdf',
      filePath: './uploads/bhel_udyam_cert.pdf', webPath: '/uploads/bhel_udyam_cert.pdf',
      mimeType: 'application/pdf', sizeBytes: 284510, digitalHash: 'sha256:a3f8c1d92e4b7...',
      ocrStatus: 'done', ocrConfidence: 94.2, boundingPolygonCount: 147,
      rawText: 'UDYAM REGISTRATION CERTIFICATE ... Bharat Heavy Electricals Ltd ... UDYAM-UP-09-0012345 ... Medium Enterprise ...',
      extractedFields: { enterprise_name: 'Bharat Heavy Electricals Ltd', udyam_number: 'UDYAM-UP-09-0012345', category: 'Medium', nic_code: '27101', date_of_registration: '2021-04-15', address: 'BHEL House, Siri Fort, New Delhi' },
      uploadedAt: new Date(now - 3 * 24 * 3600000),
    },
    {
      bidderId: bidders[0]._id, tenderId: tenders[0]._id,
      docType: 'GSTR_3B', fileName: 'bhel_gstr3b_aug2026.pdf', originalName: 'BHEL_GSTR3B_Aug2026.pdf',
      filePath: './uploads/bhel_gstr3b_aug2026.pdf', webPath: '/uploads/bhel_gstr3b_aug2026.pdf',
      mimeType: 'application/pdf', sizeBytes: 198320, digitalHash: 'sha256:b7d4e2f10c3a5...',
      ocrStatus: 'done', ocrConfidence: 91.8, boundingPolygonCount: 203,
      rawText: 'FORM GSTR-3B ... GSTIN: 09AAACB5765R1ZB ... Tax Period: August 2026 ... Total Tax Payable: ₹14,52,890 ...',
      extractedFields: { gstin: '09AAACB5765R1ZB', legal_name: 'Bharat Heavy Electricals Ltd', tax_period: 'August 2026', total_tax_payable: 1452890, filing_date: '2026-09-10', filing_status: 'Filed on time' },
      uploadedAt: new Date(now - 3 * 24 * 3600000),
    },
    {
      bidderId: bidders[0]._id, tenderId: tenders[0]._id,
      docType: 'PAN_ITR', fileName: 'bhel_itr_ay2026.pdf', originalName: 'BHEL_ITR_AY2025-26.pdf',
      filePath: './uploads/bhel_itr_ay2026.pdf', webPath: '/uploads/bhel_itr_ay2026.pdf',
      mimeType: 'application/pdf', sizeBytes: 456210, digitalHash: 'sha256:c9e8f3a21d6b4...',
      ocrStatus: 'done', ocrConfidence: 88.5, boundingPolygonCount: 312,
      rawText: 'INCOME TAX RETURN ... PAN: AAACB5765R ... Assessment Year: 2025-26 ... Gross Total Income: ₹1,24,56,78,900 ...',
      extractedFields: { pan: 'AAACB5765R', legal_name: 'Bharat Heavy Electricals Ltd', assessment_year: '2025-26', gross_income: 12456789000, tax_paid: 3489200000, filing_date: '2026-07-31', turnover: 28500000000 },
      uploadedAt: new Date(now - 3 * 24 * 3600000),
    },
    {
      bidderId: bidders[0]._id, tenderId: tenders[0]._id,
      docType: 'MII_AFFIDAVIT', fileName: 'bhel_mii_affidavit.pdf', originalName: 'BHEL_MII_Self_Declaration.pdf',
      filePath: './uploads/bhel_mii_affidavit.pdf', webPath: '/uploads/bhel_mii_affidavit.pdf',
      mimeType: 'application/pdf', sizeBytes: 125640, digitalHash: 'sha256:d4a7b8c62e1f9...',
      ocrStatus: 'done', ocrConfidence: 92.1, boundingPolygonCount: 89,
      rawText: 'SELF DECLARATION ... Make in India ... Local Content: 78% ... Bharat Heavy Electricals Ltd ...',
      extractedFields: { legal_name: 'Bharat Heavy Electricals Ltd', local_content_percentage: 78, declaration_date: '2026-09-05', notarized: true, affidavit_number: 'AFF/2026/DEL/44521' },
      uploadedAt: new Date(now - 3 * 24 * 3600000),
    },
    {
      bidderId: bidders[0]._id, tenderId: tenders[0]._id,
      docType: 'CPPP_DEBARMENT', fileName: 'bhel_cppp_clearance.pdf', originalName: 'BHEL_CPPP_No_Debarment.pdf',
      filePath: './uploads/bhel_cppp_clearance.pdf', webPath: '/uploads/bhel_cppp_clearance.pdf',
      mimeType: 'application/pdf', sizeBytes: 87450, digitalHash: 'sha256:e5f6a9d83c2b1...',
      ocrStatus: 'done', ocrConfidence: 96.3, boundingPolygonCount: 56,
      rawText: 'CENTRAL PUBLIC PROCUREMENT PORTAL ... No Debarment Record Found ... Entity: Bharat Heavy Electricals Ltd ...',
      extractedFields: { legal_name: 'Bharat Heavy Electricals Ltd', debarment_status: 'CLEAR', checked_date: '2026-09-12', portal_reference: 'CPPP/CHK/2026/891245' },
      uploadedAt: new Date(now - 3 * 24 * 3600000),
    },
    {
      bidderId: bidders[0]._id, tenderId: tenders[0]._id,
      docType: 'EPFO_ECR', fileName: 'bhel_epfo_ecr.pdf', originalName: 'BHEL_EPFO_ECR_Sep2026.pdf',
      filePath: './uploads/bhel_epfo_ecr.pdf', webPath: '/uploads/bhel_epfo_ecr.pdf',
      mimeType: 'application/pdf', sizeBytes: 312780, digitalHash: 'sha256:f2c3d4e5a6b78...',
      ocrStatus: 'done', ocrConfidence: 89.7, boundingPolygonCount: 275,
      rawText: 'ELECTRONIC CHALLAN CUM RETURN ... Establishment Code: UPBHL0012345 ... Total Employees: 4,821 ...',
      extractedFields: { establishment_name: 'Bharat Heavy Electricals Ltd', establishment_code: 'UPBHL0012345', total_employees: 4821, total_contribution: 8945600, month: 'August 2026', compliance_status: 'Compliant' },
      uploadedAt: new Date(now - 2 * 24 * 3600000),
    },
    {
      bidderId: bidders[0]._id, tenderId: tenders[0]._id,
      docType: 'BALANCE_SHEET', fileName: 'bhel_balance_sheet.pdf', originalName: 'BHEL_Audited_BS_FY2025-26.pdf',
      filePath: './uploads/bhel_balance_sheet.pdf', webPath: '/uploads/bhel_balance_sheet.pdf',
      mimeType: 'application/pdf', sizeBytes: 892340, digitalHash: 'sha256:a1b2c3d4e5f67...',
      ocrStatus: 'done', ocrConfidence: 85.4, boundingPolygonCount: 520,
      rawText: 'AUDITED BALANCE SHEET ... FY 2025-26 ... Bharat Heavy Electricals Ltd ... Total Revenue: ₹28,500 Crore ...',
      extractedFields: { legal_name: 'Bharat Heavy Electricals Ltd', financial_year: '2025-26', total_revenue_cr: 28500, net_profit_cr: 1240, total_assets_cr: 45200, auditor: 'S.R. Batliboi & Associates LLP', audit_date: '2026-06-28' },
      uploadedAt: new Date(now - 2 * 24 * 3600000),
    },

    // Bidder 1 (Tata) — Tender 0
    {
      bidderId: bidders[1]._id, tenderId: tenders[0]._id,
      docType: 'UDYAM_MSME', fileName: 'tata_udyam_cert.pdf', originalName: 'TASL_Udyam_Registration.pdf',
      filePath: './uploads/tata_udyam_cert.pdf', webPath: '/uploads/tata_udyam_cert.pdf',
      mimeType: 'application/pdf', sizeBytes: 267890, digitalHash: 'sha256:g8h9i0j1k2l34...',
      ocrStatus: 'done', ocrConfidence: 93.5, boundingPolygonCount: 134,
      rawText: 'UDYAM REGISTRATION CERTIFICATE ... Tata Advanced Systems Ltd ... UDYAM-TG-36-0098712 ...',
      extractedFields: { enterprise_name: 'Tata Advanced Systems Ltd', udyam_number: 'UDYAM-TG-36-0098712', category: 'Large', nic_code: '30400', date_of_registration: '2020-11-22', address: 'Adibatla SEZ, Hyderabad' },
      uploadedAt: new Date(now - 4 * 24 * 3600000),
    },
    {
      bidderId: bidders[1]._id, tenderId: tenders[0]._id,
      docType: 'GSTR_3B', fileName: 'tata_gstr3b.pdf', originalName: 'TASL_GSTR3B_Aug2026.pdf',
      filePath: './uploads/tata_gstr3b.pdf', webPath: '/uploads/tata_gstr3b.pdf',
      mimeType: 'application/pdf', sizeBytes: 210450, digitalHash: 'sha256:m5n6o7p8q9r01...',
      ocrStatus: 'done', ocrConfidence: 90.2, boundingPolygonCount: 195,
      rawText: 'FORM GSTR-3B ... GSTIN: 36AADCT2345M1ZK ... Tax Period: August 2026 ...',
      extractedFields: { gstin: '36AADCT2345M1ZK', legal_name: 'Tata Advanced Systems Ltd', tax_period: 'August 2026', total_tax_payable: 2834500, filing_date: '2026-09-08', filing_status: 'Filed on time' },
      uploadedAt: new Date(now - 4 * 24 * 3600000),
    },

    // Bidder 4 (Navratna — High Risk) — Tender 0
    {
      bidderId: bidders[4]._id, tenderId: tenders[0]._id,
      docType: 'GSTR_3B', fileName: 'navratna_gstr3b.pdf', originalName: 'Navratna_GSTR3B_Jul2026.pdf',
      filePath: './uploads/navratna_gstr3b.pdf', webPath: '/uploads/navratna_gstr3b.pdf',
      mimeType: 'application/pdf', sizeBytes: 145600, digitalHash: 'sha256:s2t3u4v5w6x78...',
      ocrStatus: 'done', ocrConfidence: 72.4, boundingPolygonCount: 168,
      rawText: 'FORM GSTR-3B ... GSTIN: 07AAFCN6543K1ZR ... Tax Period: July 2026 ... FILED LATE ...',
      extractedFields: { gstin: '07AAFCN6543K1ZR', legal_name: 'Navratna Infra Solutions Pvt Ltd', tax_period: 'July 2026', total_tax_payable: 345200, filing_date: '2026-09-01', filing_status: 'Filed late - 32 days overdue', late_fee: 5000 },
      uploadedAt: new Date(now - 1 * 24 * 3600000),
    },
    {
      bidderId: bidders[4]._id, tenderId: tenders[0]._id,
      docType: 'CPPP_DEBARMENT', fileName: 'navratna_cppp.pdf', originalName: 'Navratna_CPPP_Check.pdf',
      filePath: './uploads/navratna_cppp.pdf', webPath: '/uploads/navratna_cppp.pdf',
      mimeType: 'application/pdf', sizeBytes: 92310, digitalHash: 'sha256:y9z0a1b2c3d45...',
      ocrStatus: 'done', ocrConfidence: 95.1, boundingPolygonCount: 62,
      rawText: 'CENTRAL PUBLIC PROCUREMENT PORTAL ... DEBARMENT RECORD FOUND ... Navratna Infra Solutions ... Debarred by MoRTH ...',
      extractedFields: { legal_name: 'Navratna Infra Solutions Pvt Ltd', debarment_status: 'DEBARRED', debarred_by: 'Ministry of Road Transport & Highways', debarment_date: '2025-08-14', debarment_reason: 'Quality non-compliance in NH-44 project', debarment_period: '2 years', reinstatement_date: '2027-08-14' },
      uploadedAt: new Date(now - 1 * 24 * 3600000),
    },

    // Bidder 2 (Reliance Defence) — Tender 1
    {
      bidderId: bidders[2]._id, tenderId: tenders[1]._id,
      docType: 'OEM_AUTH', fileName: 'reliance_oem_auth.pdf', originalName: 'Reliance_OEM_Authorization_Thales.pdf',
      filePath: './uploads/reliance_oem_auth.pdf', webPath: '/uploads/reliance_oem_auth.pdf',
      mimeType: 'application/pdf', sizeBytes: 178920, digitalHash: 'sha256:e6f7g8h9i0j12...',
      ocrStatus: 'done', ocrConfidence: 87.9, boundingPolygonCount: 105,
      rawText: 'OEM AUTHORIZATION CERTIFICATE ... Thales Defence & Security ... Authorized: Reliance Defence Engineering Ltd ...',
      extractedFields: { oem_name: 'Thales Defence & Security', authorized_entity: 'Reliance Defence Engineering Ltd', product_category: 'Tactical Communication Systems', authorization_date: '2026-03-15', validity: '2027-03-14', territory: 'Republic of India' },
      uploadedAt: new Date(now - 2 * 24 * 3600000),
    },
    {
      bidderId: bidders[2]._id, tenderId: tenders[1]._id,
      docType: 'IMPORT_BILL_OF_ENTRY', fileName: 'reliance_boe.pdf', originalName: 'Reliance_Bill_of_Entry_2026.pdf',
      filePath: './uploads/reliance_boe.pdf', webPath: '/uploads/reliance_boe.pdf',
      mimeType: 'application/pdf', sizeBytes: 345670, digitalHash: 'sha256:k3l4m5n6o7p89...',
      ocrStatus: 'done', ocrConfidence: 83.6, boundingPolygonCount: 289,
      rawText: 'BILL OF ENTRY ... Customs House Mumbai ... Importer: Reliance Defence Engineering Ltd ... CIF Value: ₹18,45,00,000 ...',
      extractedFields: { importer_name: 'Reliance Defence Engineering Ltd', boe_number: 'BOE/MUM/2026/784512', boe_date: '2026-06-20', cif_value: 184500000, customs_duty_paid: 36900000, port: 'JNPT Mumbai', hs_code: '85176290', country_of_origin: 'France' },
      uploadedAt: new Date(now - 2 * 24 * 3600000),
    },
  ]);
  console.log(`[Seed] Inserted ${docs.length} documents`);

  // ─── Verifications ──────────────────────────────────────────────────
  const verifications = await Verification.insertMany([
    {
      tenderId: tenders[0]._id, bidderId: bidders[0]._id, officerId: users[0]._id,
      docScores: [
        { docType: 'UDYAM_MSME', score: 14, maxScore: 15, rawScore: 14, deductions: [] },
        { docType: 'GSTR_3B', score: 18, maxScore: 20, rawScore: 18, deductions: [{ field: 'filing_timeliness', reason: 'Filing within due date window', statute: 'CGST Act § 39', points: 0 }] },
        { docType: 'PAN_ITR', score: 14, maxScore: 15, rawScore: 14, deductions: [{ field: 'turnover_check', reason: 'Turnover ₹28,500 Cr exceeds ₹15 Cr requirement', statute: 'GFR 2017 Rule 170', points: 0 }] },
        { docType: 'MII_AFFIDAVIT', score: 15, maxScore: 15, rawScore: 15, deductions: [] },
        { docType: 'CPPP_DEBARMENT', score: 10, maxScore: 10, rawScore: 10, deductions: [] },
        { docType: 'EPFO_ECR', score: 8, maxScore: 10, rawScore: 8, deductions: [{ field: 'employee_count', reason: 'Large workforce verified - 4821 employees', statute: 'EPF Act 1952 § 1(3)', points: 0 }] },
        { docType: 'BALANCE_SHEET', score: 13, maxScore: 15, rawScore: 13, deductions: [{ field: 'audit_recency', reason: 'Audit completed within FY', statute: 'Companies Act 2013 § 139', points: -2 }] },
      ],
      crossChecks: [
        { fieldKey: 'legal_name', docA: 'UDYAM_MSME', docB: 'GSTR_3B', valueA: 'Bharat Heavy Electricals Ltd', valueB: 'Bharat Heavy Electricals Ltd', match: true, similarity: 1.0, statute: 'GeM GTC Clause 12', reason: 'Entity name consistent across documents' },
        { fieldKey: 'legal_name', docA: 'PAN_ITR', docB: 'BALANCE_SHEET', valueA: 'Bharat Heavy Electricals Ltd', valueB: 'Bharat Heavy Electricals Ltd', match: true, similarity: 1.0, statute: 'GeM GTC Clause 12', reason: 'Name matches on PAN & Balance Sheet' },
        { fieldKey: 'pan_gstin', docA: 'GSTR_3B', docB: 'PAN_ITR', valueA: '09AAACB5765R1ZB', valueB: 'AAACB5765R', match: true, similarity: 1.0, statute: 'CGST Act § 25', reason: 'PAN embedded in GSTIN matches ITR PAN' },
      ],
      compositeScore: 92, complianceStatus: 'Compliant', criticalFlags: [],
      ocrMetrics: { totalPages: 24, totalBoundingBoxes: 1602, avgConfidence: 91.1, processingTimeMs: 12450 },
      decision: 'Qualified', decisionReason: 'All statutory documents verified. High compliance score. No debarment. MII 78% exceeds 60% threshold.',
      decisionAt: new Date(now - 1 * 24 * 3600000), startedAt: new Date(now - 3 * 24 * 3600000), completedAt: new Date(now - 1 * 24 * 3600000), status: 'done',
    },
    {
      tenderId: tenders[0]._id, bidderId: bidders[4]._id, officerId: users[0]._id,
      docScores: [
        { docType: 'GSTR_3B', score: 8, maxScore: 20, rawScore: 8, deductions: [{ field: 'gst_filing_lag', reason: 'GSTR-3B filed 32 days late', statute: 'CGST Act § 47', points: -8 }, { field: 'late_fee', reason: 'Late fee of ₹5,000 levied', statute: 'CGST Act § 47(2)', points: -4 }] },
        { docType: 'CPPP_DEBARMENT', score: 0, maxScore: 10, rawScore: 0, deductions: [{ field: 'debarment_found', reason: 'DEBARRED by MoRTH — Quality non-compliance in NH-44 project. Debarment valid until 2027-08-14', statute: 'GFR 2017 Rule 151', points: -10 }] },
      ],
      crossChecks: [
        { fieldKey: 'legal_name', docA: 'GSTR_3B', docB: 'CPPP_DEBARMENT', valueA: 'Navratna Infra Solutions Pvt Ltd', valueB: 'Navratna Infra Solutions Pvt Ltd', match: true, similarity: 1.0, statute: 'GeM GTC Clause 12', reason: 'Name consistent but entity is DEBARRED' },
      ],
      compositeScore: 23, complianceStatus: 'Non-Compliant',
      criticalFlags: ['ACTIVE DEBARMENT — MoRTH (until Aug 2027)', 'GST filing 32 days overdue', 'Incomplete document submission (5 of 7 required docs missing)'],
      ocrMetrics: { totalPages: 6, totalBoundingBoxes: 230, avgConfidence: 83.7, processingTimeMs: 3200 },
      decision: 'Disqualified', decisionReason: 'Bidder is actively debarred by MoRTH. CPPP records confirm debarment until Aug 2027. Additionally, GST returns filed late and majority of required documents not submitted.',
      decisionAt: new Date(now - 0.5 * 24 * 3600000), startedAt: new Date(now - 1 * 24 * 3600000), completedAt: new Date(now - 0.5 * 24 * 3600000), status: 'done',
    },
    {
      tenderId: tenders[1]._id, bidderId: bidders[2]._id, officerId: users[1]._id,
      docScores: [
        { docType: 'OEM_AUTH', score: 9, maxScore: 10, rawScore: 9, deductions: [{ field: 'territory_scope', reason: 'Authorization limited to India only', statute: 'Defence Procurement Policy 2016', points: -1 }] },
        { docType: 'IMPORT_BILL_OF_ENTRY', score: 12, maxScore: 15, rawScore: 12, deductions: [{ field: 'import_value', reason: 'High import component — CIF ₹18.45 Cr may affect MII compliance', statute: 'Make in India Order 2017', points: -3 }] },
      ],
      crossChecks: [
        { fieldKey: 'entity_name', docA: 'OEM_AUTH', docB: 'IMPORT_BILL_OF_ENTRY', valueA: 'Reliance Defence Engineering Ltd', valueB: 'Reliance Defence Engineering Ltd', match: true, similarity: 1.0, statute: 'GeM GTC Clause 12', reason: 'Importer matches OEM authorized entity' },
      ],
      compositeScore: 68, complianceStatus: 'Pending',
      criticalFlags: ['High import component may impact MII threshold'],
      ocrMetrics: { totalPages: 12, totalBoundingBoxes: 394, avgConfidence: 85.7, processingTimeMs: 5800 },
      decision: null, decisionReason: null, decisionAt: null,
      startedAt: new Date(now - 2 * 24 * 3600000), completedAt: null, status: 'in_progress',
    },
  ]);
  console.log(`[Seed] Inserted ${verifications.length} verifications`);

  // ─── Audit Logs ─────────────────────────────────────────────────────
  const auditLogs = await AuditLog.insertMany([
    { verificationId: verifications[0]._id, tenderId: tenders[0]._id, bidderId: bidders[0]._id, actorId: users[0]._id, actorName: 'Rajesh Kumar Sharma', actorRole: 'procurement_officer', actionType: 'VERIFICATION_STARTED', payload: { tenderId: 'GEM/2026/B/582910', bidderName: 'Bharat Heavy Electricals Ltd' }, ipAddress: '10.10.42.15', userAgent: 'Mozilla/5.0 NexVerify/1.0' },
    { verificationId: verifications[0]._id, tenderId: tenders[0]._id, bidderId: bidders[0]._id, actorId: users[0]._id, actorName: 'Rajesh Kumar Sharma', actorRole: 'procurement_officer', actionType: 'DOCUMENT_UPLOADED', payload: { docType: 'UDYAM_MSME', fileName: 'bhel_udyam_cert.pdf', sizeBytes: 284510 }, ipAddress: '10.10.42.15', userAgent: 'Mozilla/5.0 NexVerify/1.0' },
    { verificationId: verifications[0]._id, tenderId: tenders[0]._id, bidderId: bidders[0]._id, actorId: users[0]._id, actorName: 'Rajesh Kumar Sharma', actorRole: 'procurement_officer', actionType: 'OCR_COMPLETED', payload: { totalDocs: 7, avgConfidence: 91.1, processingTimeMs: 12450 }, ipAddress: '10.10.42.15', userAgent: 'Mozilla/5.0 NexVerify/1.0' },
    { verificationId: verifications[0]._id, tenderId: tenders[0]._id, bidderId: bidders[0]._id, actorId: users[0]._id, actorName: 'Rajesh Kumar Sharma', actorRole: 'procurement_officer', actionType: 'SCORING_COMPLETED', payload: { compositeScore: 92, complianceStatus: 'Compliant' }, ipAddress: '10.10.42.15', userAgent: 'Mozilla/5.0 NexVerify/1.0' },
    { verificationId: verifications[0]._id, tenderId: tenders[0]._id, bidderId: bidders[0]._id, actorId: users[0]._id, actorName: 'Rajesh Kumar Sharma', actorRole: 'procurement_officer', actionType: 'DECISION_MADE', payload: { decision: 'Qualified', reason: 'All statutory documents verified. High compliance score.' }, ipAddress: '10.10.42.15', userAgent: 'Mozilla/5.0 NexVerify/1.0' },
    { verificationId: verifications[1]._id, tenderId: tenders[0]._id, bidderId: bidders[4]._id, actorId: users[0]._id, actorName: 'Rajesh Kumar Sharma', actorRole: 'procurement_officer', actionType: 'VERIFICATION_STARTED', payload: { tenderId: 'GEM/2026/B/582910', bidderName: 'Navratna Infra Solutions Pvt Ltd' }, ipAddress: '10.10.42.15', userAgent: 'Mozilla/5.0 NexVerify/1.0' },
    { verificationId: verifications[1]._id, tenderId: tenders[0]._id, bidderId: bidders[4]._id, actorId: users[0]._id, actorName: 'Rajesh Kumar Sharma', actorRole: 'procurement_officer', actionType: 'SCORING_COMPLETED', payload: { compositeScore: 23, complianceStatus: 'Non-Compliant', criticalFlags: ['ACTIVE DEBARMENT', 'GST filing overdue'] }, ipAddress: '10.10.42.15', userAgent: 'Mozilla/5.0 NexVerify/1.0' },
    { verificationId: verifications[1]._id, tenderId: tenders[0]._id, bidderId: bidders[4]._id, actorId: users[0]._id, actorName: 'Rajesh Kumar Sharma', actorRole: 'procurement_officer', actionType: 'DECISION_MADE', payload: { decision: 'Disqualified', reason: 'Bidder is actively debarred by MoRTH. CPPP records confirm debarment until Aug 2027.' }, ipAddress: '10.10.42.15', userAgent: 'Mozilla/5.0 NexVerify/1.0' },
    { verificationId: verifications[2]._id, tenderId: tenders[1]._id, bidderId: bidders[2]._id, actorId: users[1]._id, actorName: 'Priya Venkatesh', actorRole: 'procurement_officer', actionType: 'VERIFICATION_STARTED', payload: { tenderId: 'GEM/2026/B/619204', bidderName: 'Reliance Defence Engineering Ltd' }, ipAddress: '10.10.55.88', userAgent: 'Mozilla/5.0 NexVerify/1.0' },
    { verificationId: verifications[2]._id, tenderId: tenders[1]._id, bidderId: bidders[2]._id, actorId: users[1]._id, actorName: 'Priya Venkatesh', actorRole: 'procurement_officer', actionType: 'DOCUMENT_UPLOADED', payload: { docType: 'OEM_AUTH', fileName: 'reliance_oem_auth.pdf' }, ipAddress: '10.10.55.88', userAgent: 'Mozilla/5.0 NexVerify/1.0' },
  ]);
  console.log(`[Seed] Inserted ${auditLogs.length} audit logs`);

  // ─── Summary ────────────────────────────────────────────────────────
  console.log('\n✅  Seed complete! Database: nexverify');
  console.log('─────────────────────────────────────');
  console.log(`  Users:          ${users.length}`);
  console.log(`  Bidders:        ${bidders.length}`);
  console.log(`  Tenders:        ${tenders.length}`);
  console.log(`  Documents:      ${docs.length}`);
  console.log(`  Verifications:  ${verifications.length}`);
  console.log(`  Audit Logs:     ${auditLogs.length}`);
  console.log('─────────────────────────────────────');
  console.log('Open MongoDB Compass → mongodb://localhost:27017/nexverify');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('[Seed] Error:', err);
  process.exit(1);
});
