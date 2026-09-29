/**
 * ==============================================================================
 * BACKEND MOCK GOVERNMENT API ADAPTER (NODE.JS EXPRESS RUNTIME)
 * ==============================================================================
 * Mirrors official NIC / API Setu response payloads for backend verification
 * and automated scoring services.
 * ==============================================================================
 */

export class MockGovtAdapter {
  constructor() {
    this.adapterName = 'BackendMockGovtAdapter (Node.js Sandbox)';
  }

  async verifyGstn(gstin) {
    const clean = (gstin || '').toUpperCase().trim();
    const isDebarred = clean.includes('APEX') || clean.includes('07AAACA9921');

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'GSTN Gateway (NIC)',
      data: {
        gstin: clean || '07AAACT1020N1Z5',
        legalName: isDebarred ? 'Apex Global Hardware Ltd' : 'TechCorp India Pvt Ltd',
        gstinStatus: isDebarred ? 'Cancelled' : 'Active',
        isCompliant: !isDebarred,
        filingRegularityScore: isDebarred ? 20 : 98
      }
    };
  }

  async verifyCpppDebarment(bidderQuery) {
    const str = JSON.stringify(bidderQuery || '').toUpperCase();
    const isDebarred = str.includes('APEX') || str.includes('07AAACA9921');

    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'CPPP Debarment Watchlist (GeM)',
      data: {
        debarmentStatus: isDebarred ? 'DEBARRED' : 'CLEAN',
        isEligibleForTender: !isDebarred,
        applicableRule: isDebarred ? 'GFR 2017 Rule 151(iii)' : 'None'
      }
    };
  }

  async verifyUdyam(udyamNo) {
    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'MSME Udyam Portal',
      data: {
        udyamNo: udyamNo || 'UDYAM-DL-01-0049281',
        enterpriseType: 'Medium Enterprise',
        status: 'Active'
      }
    };
  }

  async verifyMcaCin(cin) {
    return {
      success: true,
      isMock: true,
      adapter: this.adapterName,
      gateway: 'MCA21 RoC Portal',
      data: {
        cin: cin || 'U72900DL2015PTC281904',
        companyStatus: 'Active',
        paidUpCapital: '₹ 5.0 Crore'
      }
    };
  }
}
