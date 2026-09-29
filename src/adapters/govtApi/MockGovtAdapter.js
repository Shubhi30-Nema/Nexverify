/**
 * ==============================================================================
 * MOCK GOVERNMENT API ADAPTER (OFFLINE SANDBOX FOR JUDGES & DEVELOPMENT)
 * ==============================================================================
 * Class: MockGovtAdapter
 * 
 * Supports all mandatory Government Verification Portals:
 *   1. Udyam / MSME Registration
 *   2. GST Registration & Filing
 *   3. PAN & Income Tax Compliance
 *   4. Make in India (MII) / Local Content Requirements
 *   5. EPFO / ESIC Statutory Compliance
 *   6. Startup India, NSIC & OEM Authorization
 *   7. DigiLocker / Document Verification
 *   8. CPPP Debarment & Blacklist Registry
 * ==============================================================================
 */

import { GovtApiInterface } from './GovtApiInterface.js';

export class MockGovtAdapter extends GovtApiInterface {
  constructor(options = {}) {
    super();
    this.adapterName = 'MockGovtAdapter (NIC Offline Sandbox)';
    this.schemaVersion = 'NIC-GOVT-STD-v3';
    this.latencyMs = options.latencyMs !== undefined ? options.latencyMs : 280;
  }

  async _simulateLatency() {
    if (this.latencyMs > 0) {
      await new Promise(resolve => setTimeout(resolve, this.latencyMs));
    }
  }

  _generateGovtTxnId(prefix) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `NIC-${prefix}-${timestamp}-${rand}`;
  }

  /**
   * 1. UDYAM / MSME PORTAL VERIFICATION
   */
  async verifyUdyam(udyamNo, options = {}) {
    await this._simulateLatency();
    const cleanUdyam = (udyamNo || '').trim().toUpperCase();

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'Ministry of MSME (Udyam Registration Portal)',
      endpointSimulated: 'GET /verify/udyam-number',
      transactionId: this._generateGovtTxnId('MSME'),
      queriedAt: new Date().toISOString(),
      data: {
        udyamRegistrationNumber: cleanUdyam || 'UDYAM-DL-01-0049281',
        enterpriseType: 'Medium Enterprise',
        majorActivity: 'Manufacturing & Technology Equipment',
        organizationType: 'Private Limited Company',
        plantMachineryInvestment: '₹ 18.5 Crore',
        totalTurnover: '₹ 42.0 Crore',
        msmeExemptionEligible: true, // EMD / Tender fee exemption valid under GFR 153
        registrationDate: '10/09/2020',
        activeStatus: 'VERIFIED & ACTIVE',
        socialCategory: 'General',
        dicJurisdiction: 'DIC South Delhi'
      }
    };
  }

  /**
   * 2. GST REGISTRATION & FILING GATEWAY
   */
  async verifyGstn(gstin, options = {}) {
    await this._simulateLatency();
    const cleanGst = (gstin || '').trim().toUpperCase();

    const isApexDebarred = cleanGst.includes('07AAACA9921') || cleanGst.includes('APEX');
    const isSuryaWarning = cleanGst.includes('27AABCS9912') || cleanGst.includes('SURYA');

    if (isApexDebarred) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'GSTN Goods & Services Tax Network',
        endpointSimulated: 'POST /returns/gstr3b',
        transactionId: this._generateGovtTxnId('GSTN'),
        queriedAt: new Date().toISOString(),
        data: {
          gstin: cleanGst,
          legalName: 'Apex Global Hardware Ltd',
          tradeName: 'Apex Hardware Enterprises',
          registrationDate: '01/07/2017',
          taxpayerType: 'Regular',
          gstinStatus: 'Suspended / Cancelled Suo-Moto',
          isCompliant: false,
          filingRegularityScore: 30,
          complianceRating: '1 Star (Critical Default)',
          gstr3bStatus: 'DEFAULTED (Last filed: 8 months overdue)',
          gstr1Status: 'INACTIVE',
          taxDefaultFlags: ['Section 29(2) Cancellation Proceedings Initiated', 'Input Tax Credit Mismatch > 35%'],
          stateJurisdiction: 'Ward 45, New Delhi'
        }
      };
    }

    if (isSuryaWarning) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'GSTN Goods & Services Tax Network',
        endpointSimulated: 'POST /returns/gstr3b',
        transactionId: this._generateGovtTxnId('GSTN'),
        queriedAt: new Date().toISOString(),
        data: {
          gstin: cleanGst,
          legalName: 'Surya Green Energy Ltd',
          tradeName: 'Surya Green Energy Solutions',
          registrationDate: '14/03/2018',
          taxpayerType: 'Regular',
          gstinStatus: 'Active',
          isCompliant: true,
          filingRegularityScore: 82,
          complianceRating: '4 Star (Moderate Delay)',
          gstr3bStatus: 'FILED (With Minor Late Filing Fee Paid)',
          gstr1Status: 'FILED',
          taxDefaultFlags: ['Occasional delay in FY 2025-26 Q2 filing settled with interest'],
          stateJurisdiction: 'Division 03, Mumbai, Maharashtra'
        }
      };
    }

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'GSTN Goods & Services Tax Network',
      endpointSimulated: 'POST /returns/gstr3b',
      transactionId: this._generateGovtTxnId('GSTN'),
      queriedAt: new Date().toISOString(),
      data: {
        gstin: cleanGst || '07AAACT1020N1Z5',
        legalName: 'TechCorp India Pvt Ltd',
        tradeName: 'TechCorp Solutions',
        registrationDate: '12/08/2017',
        taxpayerType: 'Regular',
        gstinStatus: 'Active',
        isCompliant: true,
        filingRegularityScore: 98,
        complianceRating: '5 Star (High Compliance)',
        gstr3bStatus: 'FILED (Current & Regular)',
        gstr1Status: 'FILED (Current & Regular)',
        taxDefaultFlags: [],
        annualTurnoverSlab: '₹ 25 Crore to ₹ 100 Crore',
        stateJurisdiction: 'Ward 12, New Delhi'
      }
    };
  }

  /**
   * 3A. PAN VERIFICATION GATEWAY
   */
  async verifyPan(pan, options = {}) {
    await this._simulateLatency();
    const cleanPan = (pan || '').trim().toUpperCase();
    const isApex = cleanPan.includes('AAACA9921') || cleanPan.includes('APEX');

    if (isApex) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'Income Tax Department (PAN Verification Gateway)',
        endpointSimulated: 'POST /pan/verify-status',
        transactionId: this._generateGovtTxnId('PAN'),
        queriedAt: new Date().toISOString(),
        data: {
          pan: cleanPan || 'AAACA9921B',
          panStatus: 'INOPERATIVE / SUSPENDED',
          isPanValid: false,
          holderName: 'APEX GLOBAL HARDWARE LTD',
          category: 'Company',
          aadhaarSeedingStatus: 'NON-COMPLIANT',
          panIssueDate: '12/04/2012',
          jurisdictionWard: 'Income Tax Ward 45(1), Delhi',
          complianceWarning: 'PAN flagged as Inoperative due to non-compliance with Section 139AA.'
        }
      };
    }

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'Income Tax Department (PAN Verification Gateway)',
      endpointSimulated: 'POST /pan/verify-status',
      transactionId: this._generateGovtTxnId('PAN'),
      queriedAt: new Date().toISOString(),
      data: {
        pan: cleanPan || 'AAACT1020N',
        panStatus: 'ACTIVE & OPERATIVE',
        isPanValid: true,
        holderName: 'TECHCORP INDIA PVT LTD',
        category: 'Company (Domestic)',
        aadhaarSeedingStatus: 'Exempted (Corporate Entity)',
        panIssueDate: '15/09/2015',
        jurisdictionWard: 'Corporate Ward 12(3), New Delhi',
        complianceRemarks: 'Valid PAN in accordance with CBDT master registry.'
      }
    };
  }

  /**
   * 3B. INCOME TAX (ITR) & TURNOVER COMPLIANCE GATEWAY
   */
  async verifyItr(pan, options = {}) {
    await this._simulateLatency();
    const cleanPan = (pan || '').trim().toUpperCase();
    const isApex = cleanPan.includes('AAACA9921') || cleanPan.includes('APEX');
    const isSurya = cleanPan.includes('AABCS9912') || cleanPan.includes('SURYA');

    if (isApex) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'Central Board of Direct Taxes (CBDT e-Filing API)',
        endpointSimulated: 'POST /itr/turnover-verification',
        transactionId: this._generateGovtTxnId('CBDT'),
        queriedAt: new Date().toISOString(),
        data: {
          pan: cleanPan,
          overallCompliance: 'CRITICAL FAILURE / TURNOVER SHORTFALL',
          statutoryAuditStatus: 'UNSATISFACTORY / PENDING DEMAND',
          outstandingTaxDemand: '₹ 1.42 Crore under Section 156',
          threeYearAverageTurnoverCr: 19.0,
          minimumTurnoverRequiredCr: 30.0,
          turnoverShortfallNotice: 'Deficit of ₹ 11.0 Crore vs Tender Eligibility Criteria',
          itrFilingHistory: [
            { assessmentYear: 'AY 2025-26', form: 'ITR-6', status: 'Defective Notice u/s 139(9)', grossTurnoverCr: 19.0 },
            { assessmentYear: 'AY 2024-25', form: 'ITR-6', status: 'Belated Return Filed', grossTurnoverCr: 20.5 },
            { assessmentYear: 'AY 2023-24', form: 'ITR-6', status: 'Filed', grossTurnoverCr: 22.0 }
          ]
        }
      };
    }

    if (isSurya) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'Central Board of Direct Taxes (CBDT e-Filing API)',
        endpointSimulated: 'POST /itr/turnover-verification',
        transactionId: this._generateGovtTxnId('CBDT'),
        queriedAt: new Date().toISOString(),
        data: {
          pan: cleanPan,
          overallCompliance: 'SATISFACTORY (MARGINAL)',
          statutoryAuditStatus: 'Clean Audit Report Filed',
          threeYearAverageTurnoverCr: 10.5,
          minimumTurnoverRequiredCr: 10.0,
          itrFilingHistory: [
            { assessmentYear: 'AY 2025-26', form: 'ITR-6', status: 'Filed with Late Fee u/s 234F', grossTurnoverCr: 11.2 },
            { assessmentYear: 'AY 2024-25', form: 'ITR-6', status: 'Filed Regular', grossTurnoverCr: 10.5 },
            { assessmentYear: 'AY 2023-24', form: 'ITR-6', status: 'Filed Regular', grossTurnoverCr: 9.8 }
          ]
        }
      };
    }

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'Central Board of Direct Taxes (CBDT e-Filing API)',
      endpointSimulated: 'POST /itr/turnover-verification',
      transactionId: this._generateGovtTxnId('CBDT'),
      queriedAt: new Date().toISOString(),
      data: {
        pan: cleanPan || 'AAACT1020N',
        overallCompliance: 'HIGH COMPLIANCE / AUDIT VERIFIED',
        statutoryAuditReportForm3CA_CD: 'Filed & Certified by Statutory Auditor (Clean)',
        threeYearAverageTurnoverCr: 37.23,
        minimumTurnoverRequiredCr: 25.0,
        itrFilingHistory: [
          { assessmentYear: 'AY 2025-26', form: 'ITR-6', status: 'Filed on Time & e-Verified', grossTurnoverCr: 42.0 },
          { assessmentYear: 'AY 2024-25', form: 'ITR-6', status: 'Filed on Time & e-Verified', grossTurnoverCr: 38.5 },
          { assessmentYear: 'AY 2023-24', form: 'ITR-6', status: 'Filed on Time & e-Verified', grossTurnoverCr: 31.2 }
        ],
        taxClearanceStatus: 'No outstanding tax arrears'
      }
    };
  }

  async verifyPanItr(pan, options = {}) {
    return this.verifyItr(pan, options);
  }

  /**
   * 4. MAKE IN INDIA (MII) / LOCAL CONTENT REQUIREMENTS GATEWAY
   */
  async verifyMiiLocalContent(query, options = {}) {
    await this._simulateLatency();
    const queryStr = JSON.stringify(query || '').toUpperCase();

    const isApex = queryStr.includes('APEX') || queryStr.includes('07AAACA9921');
    const isSurya = queryStr.includes('SURYA') || queryStr.includes('27AABCS9912');

    if (isApex) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'DPIIT Make in India (MII) Compliance Gateway',
        endpointSimulated: 'POST /mii/v2/local-content-verify',
        transactionId: this._generateGovtTxnId('MII'),
        queriedAt: new Date().toISOString(),
        data: {
          supplierClassification: 'Non-Local Supplier (<20% Local Content)',
          localContentPercentage: 14.0,
          minimumRequirement: 50.0,
          marginOfPurchasePreferenceEligible: false,
          statutoryComplianceStatus: 'REJECTED / NON-COMPLIANT',
          billOfMaterialsAudit: 'Falsified domestic BOM declaration. Assembled from 86% imported knocked-down kits.',
          charteredAccountantAttestation: 'Invalid / Disowned by practicing CA firm',
          actionMandated: 'Ineligible under Public Procurement (Preference to Make in India) Order 2017'
        }
      };
    }

    if (isSurya) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'DPIIT Make in India (MII) Compliance Gateway',
        endpointSimulated: 'POST /mii/v2/local-content-verify',
        transactionId: this._generateGovtTxnId('MII'),
        queriedAt: new Date().toISOString(),
        data: {
          supplierClassification: 'Class-II Local Supplier (20% to 50% Local Content)',
          localContentPercentage: 48.0,
          minimumRequirement: 50.0,
          marginOfPurchasePreferenceEligible: false,
          statutoryComplianceStatus: 'BORDERLINE (Clarification Issued)',
          billOfMaterialsAudit: 'Indigenous components: 48.0%, Imported inverter cells: 52.0%',
          charteredAccountantAttestation: 'UDIN verified: 26019482BKLT9918',
          actionMandated: 'Class-I requires >=50%. Bidder qualifies as Class-II only. Cannot claim Class-I preference.'
        }
      };
    }

    // Default TechCorp (Compliant Class-I)
    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'DPIIT Make in India (MII) Compliance Gateway',
      endpointSimulated: 'POST /mii/v2/local-content-verify',
      transactionId: this._generateGovtTxnId('MII'),
      queriedAt: new Date().toISOString(),
      data: {
        supplierClassification: 'Class-I Local Supplier (>=50% Local Content)',
        localContentPercentage: 68.5,
        minimumRequirement: 50.0,
        marginOfPurchasePreferenceEligible: true,
        statutoryComplianceStatus: 'QUALIFIED & VERIFIED',
        domesticManufacturingLocation: 'Plot 42, Electronics City, Noida, Uttar Pradesh',
        billOfMaterialsAudit: 'PCB fabrication, SMT assembly, chassis tooling certified indigenous',
        charteredAccountantAttestation: 'Valid UDIN: 26094821ARST1092 (ICAI Statutory Auditor)',
        actionMandated: 'Eligible for 20% purchase preference margin under GFR 153'
      }
    };
  }

  /**
   * 5. EPFO / ESIC STATUTORY COMPLIANCE GATEWAY
   */
  async verifyEpfoEsic(query, options = {}) {
    await this._simulateLatency();
    const queryStr = JSON.stringify(query || '').toUpperCase();
    const isApex = queryStr.includes('APEX') || queryStr.includes('07AAACA9921');

    if (isApex) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'Ministry of Labour & Employment (EPFO & ESIC Unified Portal)',
        endpointSimulated: 'POST /labour/v1/compliance-check',
        transactionId: this._generateGovtTxnId('LABOUR'),
        queriedAt: new Date().toISOString(),
        data: {
          overallStatus: 'NON-COMPLIANT / DEFAULT NOTICE ACTIVE',
          epfo: {
            establishmentCode: 'DLCPM0099182000',
            status: 'Default Notice 7A Issued',
            lastEcrFiled: 'December 2025 (8 months overdue)',
            activeSubscribers: 18,
            duesPending: '₹ 4,12,000'
          },
          esic: {
            employerCode: '20000991820000111',
            status: 'Arrears Outstanding',
            defaulterList: 'YES (Recovery notice issued)'
          }
        }
      };
    }

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'Ministry of Labour & Employment (EPFO & ESIC Unified Portal)',
      endpointSimulated: 'POST /labour/v1/compliance-check',
      transactionId: this._generateGovtTxnId('LABOUR'),
      queriedAt: new Date().toISOString(),
      data: {
        overallStatus: 'REGULAR & COMPLIANT',
        epfo: {
          establishmentCode: 'DLCPM0019284000',
          status: 'Active Compliance',
          lastEcrFiled: 'August 2026 (Regular)',
          activeSubscribers: 245,
          monthlyDepositAmount: '₹ 8,92,400',
          defaultNotice: 'None'
        },
        esic: {
          employerCode: '20000381920000999',
          status: 'Regular & Compliant',
          lastContributionPeriod: 'July 2026',
          insuredEmployeesCount: 180,
          defaulterFlag: 'NO'
        }
      }
    };
  }

  async verifyEpfo(establishmentCode, options = {}) {
    return this.verifyEpfoEsic({ establishmentCode }, options);
  }

  async verifyEsic(esicCode, options = {}) {
    return this.verifyEpfoEsic({ esicCode }, options);
  }

  /**
   * 6. STARTUP INDIA, NSIC & OEM AUTHORIZATION GATEWAY
   */
  async verifyStartupNsicOem(query, options = {}) {
    await this._simulateLatency();
    const queryStr = JSON.stringify(query || '').toUpperCase();

    const isApex = queryStr.includes('APEX') || queryStr.includes('07AAACA9921');
    const isSurya = queryStr.includes('SURYA') || queryStr.includes('27AABCS9912');

    if (isApex) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'DPIIT Startup India, NSIC & OEM Authorization Gateway',
        endpointSimulated: 'POST /enterprise/v1/special-status-verify',
        transactionId: this._generateGovtTxnId('STARTUP'),
        queriedAt: new Date().toISOString(),
        data: {
          overallStatus: 'VERIFICATION FAILED',
          startupIndia: {
            isDpiitRecognized: false,
            dippNumber: 'N/A',
            exemptionEligible: false
          },
          nsicRegistration: {
            isRegistered: false,
            certificateStatus: 'EXPIRED / CANCELLED (Validity ended 2023)',
            sprsNumber: 'N/A'
          },
          oemAuthorization: {
            status: 'REJECTED — FRAUDULENT MAF LETTERHEAD',
            oemVerifiedDirectly: false,
            oemName: 'Generic Hardware OEM',
            verificationNotes: 'OEM confirmed authorization letter not issued by their authorized signatory.'
          }
        }
      };
    }

    if (isSurya) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'DPIIT Startup India, NSIC & OEM Authorization Gateway',
        endpointSimulated: 'POST /enterprise/v1/special-status-verify',
        transactionId: this._generateGovtTxnId('STARTUP'),
        queriedAt: new Date().toISOString(),
        data: {
          overallStatus: 'PARTIALLY VERIFIED',
          startupIndia: {
            isDpiitRecognized: false,
            dippNumber: 'N/A',
            exemptionEligible: false
          },
          nsicRegistration: {
            isRegistered: true,
            certificateStatus: 'ACTIVE & VALID',
            sprsNumber: 'NSIC/MUM/SPRS/2024/0912',
            monetaryLimitCr: 5.0,
            validTill: '31-Mar-2027'
          },
          oemAuthorization: {
            status: 'VERIFIED (Tier-2 Distributor MAF)',
            oemVerifiedDirectly: true,
            oemName: 'Surya Solar Tech Panels Ltd',
            oemLetterReference: 'ST/MAF/2026/0942'
          }
        }
      };
    }

    // Default TechCorp (Compliant)
    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'DPIIT Startup India, NSIC & OEM Authorization Gateway',
      endpointSimulated: 'POST /enterprise/v1/special-status-verify',
      transactionId: this._generateGovtTxnId('STARTUP'),
      queriedAt: new Date().toISOString(),
      data: {
        overallStatus: 'ALL CREDENTIALS VERIFIED & ACTIVE',
        startupIndia: {
          isDpiitRecognized: true,
          dippCertificateNumber: 'DIPP89124',
          incorporationDate: '15/04/2015',
          exemptionEligible: true, // Prior turnover and experience waiver under GFR 173(i)
          validTill: 'Active DPIIT Status'
        },
        nsicRegistration: {
          isRegistered: true,
          certificateStatus: 'ACTIVE & VALID',
          sprsNumber: 'NSIC/GP/DEL/2022/9481',
          monetaryLimitCr: 25.0,
          storesItemCategory: 'IT Equipment & High-Performance Workstations'
        },
        oemAuthorization: {
          status: 'OFFICIALLY VERIFIED WITH OEM DIRECT REPOSITORY',
          oemVerifiedDirectly: true,
          oemName: 'Bharat Electronics / National OEM Partner',
          mafReferenceNumber: 'MAF-OEM-2026-DEL-89410',
        }
      }
    };
  }

  /**
   * 6A. STARTUP INDIA RECOGNITION GATEWAY (DPIIT)
   */
  async verifyStartupIndia(query, options = {}) {
    await this._simulateLatency();
    const queryStr = JSON.stringify(query || '').toUpperCase();
    const isTechCorp = queryStr.includes('TECHCORP') || queryStr.includes('DIPP89124');

    if (isTechCorp) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'DPIIT Startup India Portal (Ministry of Commerce & Industry)',
        endpointSimulated: 'POST /startup/v2/verify-recognition',
        transactionId: this._generateGovtTxnId('STARTUP'),
        queriedAt: new Date().toISOString(),
        data: {
          recognitionStatus: 'RECOGNIZED STARTUP',
          dippCertificateNumber: 'DIPP89124',
          entityName: 'TechCorp India Pvt Ltd',
          industrySector: 'IT & Hardware Manufacturing',
          incorporationDate: '15/04/2015',
          gfr173ExemptionEligible: true,
          waiverEntitlement: 'Exempted from Prior Turnover & Prior Experience under GFR 173(i)',
          taxHolidayEligible: 'Section 80-IAC Certified',
          validityStatus: 'Active DPIIT Recognition'
        }
      };
    }

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'DPIIT Startup India Portal (Ministry of Commerce & Industry)',
      endpointSimulated: 'POST /startup/v2/verify-recognition',
      transactionId: this._generateGovtTxnId('STARTUP'),
      queriedAt: new Date().toISOString(),
      data: {
        recognitionStatus: 'NOT A RECOGNIZED STARTUP',
        dippCertificateNumber: 'N/A',
        gfr173ExemptionEligible: false,
        waiverEntitlement: 'Standard Bidder Qualification Criteria (Turnover & Experience Mandatory)',
        remarks: 'No active DPIIT startup recognition certificate found in master database.'
      }
    };
  }

  /**
   * 6B. NSIC REGISTRATION PORTAL (SPRS SCHEME)
   */
  async verifyNsic(query, options = {}) {
    await this._simulateLatency();
    const queryStr = JSON.stringify(query || '').toUpperCase();
    const isApex = queryStr.includes('APEX') || queryStr.includes('07AAACA9921');
    const isSurya = queryStr.includes('SURYA') || queryStr.includes('27AABCS9912');

    if (isApex) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'National Small Industries Corporation (NSIC SPRS Portal)',
        endpointSimulated: 'POST /nsic/sprs/verify-certificate',
        transactionId: this._generateGovtTxnId('NSIC'),
        queriedAt: new Date().toISOString(),
        data: {
          registrationStatus: 'EXPIRED / DE-REGISTERED',
          sprsNumber: 'NSIC/DEL/GP/2018/1092',
          monetaryLimitCr: 0,
          tenderFeeExemption: false,
          emdExemption: false,
          validityNotice: 'Certificate expired on 31-Dec-2023. Not renewed.',
          actionRequired: 'Tender fee and EMD must be submitted in full.'
        }
      };
    }

    if (isSurya) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'National Small Industries Corporation (NSIC SPRS Portal)',
        endpointSimulated: 'POST /nsic/sprs/verify-certificate',
        transactionId: this._generateGovtTxnId('NSIC'),
        queriedAt: new Date().toISOString(),
        data: {
          registrationStatus: 'ACTIVE & CERTIFIED',
          sprsNumber: 'NSIC/MUM/SPRS/2024/0912',
          monetaryLimitCr: 5.0,
          storesItemCategory: 'Solar PV Panels & Clean Energy Systems',
          validTill: '31-Mar-2027',
          tenderFeeExemption: true,
          emdExemption: true,
          benefitsUnderPublicProcurement: 'Eligible for tender document free of cost & EMD exemption'
        }
      };
    }

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'National Small Industries Corporation (NSIC SPRS Portal)',
      endpointSimulated: 'POST /nsic/sprs/verify-certificate',
      transactionId: this._generateGovtTxnId('NSIC'),
      queriedAt: new Date().toISOString(),
      data: {
        registrationStatus: 'ACTIVE & CERTIFIED (SINGLE POINT REGISTRATION)',
        sprsNumber: 'NSIC/GP/DEL/2022/9481',
        monetaryLimitCr: 25.0,
        storesItemCategory: 'IT Hardware, Desktop Workstations & Microcomputers',
        validTill: '30-Jun-2027',
        tenderFeeExemption: true,
        emdExemption: true,
        benefitsUnderPublicProcurement: 'Eligible for waiver of EMD and 358 stores purchase preference'
      }
    };
  }

  /**
   * 6C. OEM AUTHORIZATION (MAF) VERIFICATION GATEWAY
   */
  async verifyOemAuth(query, options = {}) {
    await this._simulateLatency();
    const queryStr = JSON.stringify(query || '').toUpperCase();
    const isApex = queryStr.includes('APEX') || queryStr.includes('07AAACA9921');

    if (isApex) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'Central OEM Authorization Verification Gateway (GeM Direct OEM Hub)',
        endpointSimulated: 'POST /oem/maf/verify-letter',
        transactionId: this._generateGovtTxnId('OEM'),
        queriedAt: new Date().toISOString(),
        data: {
          mafStatus: 'FRAUDULENT / REJECTED',
          isAuthorizedPartner: false,
          declaredOem: 'Global Hardware OEM Corporation',
          directOemCheckResult: 'OEM verified that authorization letter serial #MAF-2025-9921 was never issued.',
          warrantyGuarantee: 'NO OEM WARRANTY (Gray Market / Refurbished Risk)',
          bidImpact: 'CRITICAL FAILURE — Technical bid disqualification mandated for forged OEM MAF.'
        }
      };
    }

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'Central OEM Authorization Verification Gateway (GeM Direct OEM Hub)',
      endpointSimulated: 'POST /oem/maf/verify-letter',
      transactionId: this._generateGovtTxnId('OEM'),
      queriedAt: new Date().toISOString(),
      data: {
        mafStatus: 'OFFICIALLY VERIFIED WITH OEM DIRECT REPOSITORY',
        isAuthorizedPartner: true,
        partnerTier: 'Tier-1 Platinum National Partner',
        oemName: 'Bharat Electronics / National OEM Partner',
        mafReferenceNumber: 'MAF-OEM-2026-DEL-89410',
        tenderSpecificAuthorization: 'GEM/2026/B/582910',
        warrantyCommitment: '5-Year On-Site Comprehensive OEM Direct Warranty & Spares Availability Guaranteed',
        authorizedSignatory: 'Executive Vice President — Public Sector Sales',
        authenticityValidation: 'Digital QR Code & Cryptographic Signature Validated'
      }
    };
  }

  /**
   * 7. DIGILOCKER / DOCUMENT VERIFICATION GATEWAY
   */
  async verifyDigiLockerDoc(documentHash, options = {}) {
    await this._simulateLatency();

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'DigiLocker National Document Exchange (MeitY)',
      endpointSimulated: 'POST /file/verify-pki',
      transactionId: this._generateGovtTxnId('DLOCKR'),
      queriedAt: new Date().toISOString(),
      data: {
        documentHashSha256: documentHash || '8f4c2b9a76d1e430c5e62f0a1b9e8c7d4a3f2e1d0b9a8c7e6f5d4c3b2a1e0f9',
        integrityCheck: 'PASSED (Hash strictly matches DigiLocker repository)',
        digitalSignature: {
          isSigned: true,
          signedBy: 'Controller of Certifying Authorities (CCA India) Licensed CA',
          certSerialNumber: '9482-1092-4820-1948',
          signingTimestamp: new Date().toISOString(),
          isCertValid: true,
          certExpiry: '31-Dec-2027'
        },
        tamperProofResult: 'AUTHENTIC & UNTAMPERED'
      }
    };
  }

  /**
   * 8. CPPP DEBARMENT & BLACKLIST REGISTRY
   */
  async verifyCpppDebarment(query, options = {}) {
    await this._simulateLatency();
    const queryStr = JSON.stringify(query || '').toUpperCase();

    const isDebarred = queryStr.includes('APEX') || queryStr.includes('07AAACA9921') || queryStr.includes('DEBARRED');

    if (isDebarred) {
      return {
        success: true,
        isMock: true,
        adapter: this.adapterName,
        gateway: 'Central Public Procurement Portal (CPPP) Debarment Watchlist',
        endpointSimulated: 'POST /cppp/blacklist-check',
        transactionId: this._generateGovtTxnId('CPPP'),
        queriedAt: new Date().toISOString(),
        data: {
          debarmentStatus: 'DEBARRED / BLACKLISTED',
          isEligibleForTender: false,
          actionRecommended: 'MANDATORY DISQUALIFICATION UNDER GFR 2017 RULE 151',
          blacklistRecords: [
            {
              orderNumber: 'CPPP/DEB/2025/DL-0941',
              issuingAuthority: 'National Thermal Power Corporation (NTPC Ltd)',
              reason: 'Submission of falsified test inspection certificates & non-performance',
              periodFrom: '15-Jan-2025',
              periodTo: '14-Jan-2027',
              applicableAcrossAllMinistries: true,
              governingRule: 'GFR 2017 Rule 151(iii)'
            }
          ]
        }
      };
    }

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'Central Public Procurement Portal (CPPP) Debarment Watchlist',
      endpointSimulated: 'POST /cppp/blacklist-check',
      transactionId: this._generateGovtTxnId('CPPP'),
      queriedAt: new Date().toISOString(),
      data: {
        debarmentStatus: 'CLEAN / NOT DEBARRED',
        isEligibleForTender: true,
        actionRecommended: 'PROCEED WITH BID EVALUATION',
        recordsScanned: 34,
        watchlistMatches: 0,
        cpseBlacklistHistory: 'No adverse entries found in 34 CPSE databases.'
      }
    };
  }

  async verifyMcaCin(cin, options = {}) {
    await this._simulateLatency();
    const cleanCin = (cin || '').trim().toUpperCase();

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'Ministry of Corporate Affairs (MCA21 V3 Portal)',
      endpointSimulated: 'GET /mca/master-data',
      transactionId: this._generateGovtTxnId('MCA'),
      queriedAt: new Date().toISOString(),
      data: {
        cin: cleanCin || 'U72900DL2015PTC281904',
        companyName: 'TechCorp India Pvt Ltd',
        rocOffice: 'RoC Delhi',
        classOfCompany: 'Private',
        authorizedCapital: '₹ 10,00,00,000 (10 Cr)',
        paidUpCapital: '₹ 5,00,00,000 (5 Cr)',
        dateOfIncorporation: '15/04/2015',
        companyStatus: 'Active',
        activeDirectors: [
          { din: '08192041', name: 'Rajiv Mehra', designation: 'Managing Director', status: 'Active DIN' }
        ]
      }
    };
  }

  async healthCheckAll() {
    await this._simulateLatency();
    return {
      adapter: this.adapterName,
      environment: 'MOCK_SANDBOX',
      allPortalsOnline: true,
      gateways: [
        { id: 'udyam', name: 'Udyam / MSME Portal', status: 'HEALTHY', latency: '142ms' },
        { id: 'gstn', name: 'GST Registration Gateway', status: 'HEALTHY', latency: '185ms' },
        { id: 'cbdt', name: 'PAN & Income Tax Compliance', status: 'HEALTHY', latency: '190ms' },
        { id: 'mii', name: 'Make in India / Local Content', status: 'HEALTHY', latency: '210ms' },
        { id: 'epfo_esic', name: 'EPFO / ESIC Compliance', status: 'HEALTHY', latency: '220ms' },
        { id: 'startup_nsic_oem', name: 'Startup India, NSIC & OEM', status: 'HEALTHY', latency: '230ms' },
        { id: 'digilocker', name: 'DigiLocker / Document Verification', status: 'HEALTHY', latency: '160ms' },
        { id: 'cppp', name: 'CPPP Debarment Registry', status: 'HEALTHY', latency: '130ms' }
      ]
    };
  }
}
