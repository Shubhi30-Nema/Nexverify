/**
 * ==============================================================================
 * BACKEND LIVE GOVERNMENT API ADAPTER (NODE.JS EXPRESS RUNTIME)
 * ==============================================================================
 * Production Gateway for Government of India Portals (GSTN, MCA21, CPPP, Udyam)
 * 
 * SPACE RESERVED FOR OFFICIAL GOVERNMENT CREDENTIALS & ENDPOINTS
 * ==============================================================================
 */

import axios from 'axios';

export class LiveGovtAdapter {
  constructor(config = {}) {
    this.adapterName = 'BackendLiveGovtAdapter (NIC Direct)';

    /* ========================================================================== */
    /* ====== PRODUCTION ENDPOINTS (REPLACE WITH OFFICIAL NIC/MEITY HOSTS) ====== */
    /* ========================================================================== */
    this.endpoints = {
      gstn: process.env.GOVT_GSTN_API_URL || 'https://api.gst.gov.in/taxpayerapi/v1.2',
      udyam: process.env.GOVT_UDYAM_API_URL || 'https://apisetu.gov.in/api/v1/msme',
      mca21: process.env.GOVT_MCA21_API_URL || 'https://apisetu.gov.in/api/v1/mca',
      cppp: process.env.GOVT_CPPP_API_URL || 'https://gem.gov.in/api/v2/cppp-debarment'
    };

    /* ========================================================================== */
    /* ====== PRODUCTION CREDENTIALS & PKI DIGITAL SIGNATURE KEYS         ====== */
    /* ========================================================================== */
    this.credentials = {
      clientId: process.env.GOVT_CLIENT_ID || '',
      clientSecret: process.env.GOVT_CLIENT_SECRET || '',
      pkiCertPath: process.env.GOVT_PKI_CERT_PATH || ''
    };
  }

  _isConfigured() {
    return Boolean(this.credentials.clientId && this.credentials.clientSecret);
  }

  _getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'X-Gov-Client-Id': this.credentials.clientId,
      'X-Gov-Timestamp': new Date().toISOString(),
      'X-Gov-Auth-Signature': 'RSA-SHA256-HSM-TOKEN'
    };
  }

  async verifyGstn(gstin) {
    if (!this._isConfigured()) {
      throw new Error(`[LIVE GOVT API] Missing credentials in server .env (GOVT_CLIENT_ID). Target: ${this.endpoints.gstn}`);
    }

    /* ====== PRODUCTION HTTP AXIOS CALL ====== */
    const res = await axios.get(`${this.endpoints.gstn}/taxpayer/${gstin}`, {
      headers: this._getAuthHeaders()
    });
    return { success: true, isMock: false, data: res.data };
  }

  async verifyCpppDebarment(bidderQuery) {
    if (!this._isConfigured()) {
      throw new Error(`[LIVE GOVT API] Missing credentials in server .env (GOVT_CLIENT_ID). Target: ${this.endpoints.cppp}`);
    }

    const res = await axios.post(`${this.endpoints.cppp}/search`, bidderQuery, {
      headers: this._getAuthHeaders()
    });
    return { success: true, isMock: false, data: res.data };
  }
}
