/**
 * ==============================================================================
 * BHARAT SARKAR / GeM STATUTORY VERIFICATION SYSTEM — ADAPTER CONTRACT
 * ==============================================================================
 * Abstract Interface: GovtApiInterface
 * 
 * DESIGN PATTERN: Adapter Pattern / Strategy Pattern
 * 
 * PURPOSE:
 * Defines the unified contract for verifying statutory credentials across
 * Government of India portals:
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

export class GovtApiInterface {
  /**
   * 1. Verify MSME Udyam Registration Number and enterprise classification (Micro, Small, Medium)
   * with the Ministry of MSME Udyam Portal.
   */
  async verifyUdyam(udyamNo, options = {}) {
    throw new Error('Method verifyUdyam() must be implemented by adapter.');
  }

  /**
   * 2. Verify GSTIN registration status, return filing history (GSTR-3B & GSTR-1),
   * and tax compliance rating with the GSTN (Goods and Services Tax Network).
   */
  async verifyGstn(gstin, options = {}) {
    throw new Error('Method verifyGstn() must be implemented by adapter.');
  }

  /**
   * 3A. Verify Permanent Account Number (PAN) validity and active status.
   */
  async verifyPan(pan, options = {}) {
    throw new Error('Method verifyPan() must be implemented by adapter.');
  }

  /**
   * 3B. Verify Income Tax (ITR) 3-year turnover consistency & tax audit compliance.
   */
  async verifyItr(pan, options = {}) {
    throw new Error('Method verifyItr() must be implemented by adapter.');
  }

  /**
   * Combined PAN and ITR verification (backward-compatibility).
   */
  async verifyPanItr(pan, options = {}) {
    throw new Error('Method verifyPanItr() must be implemented by adapter.');
  }

  /**
   * 4. Verify Make in India (MII) / Local Content Requirements under the Public
   * Procurement (Preference to Make in India) Order.
   */
  async verifyMiiLocalContent(query, options = {}) {
    throw new Error('Method verifyMiiLocalContent() must be implemented by adapter.');
  }

  /**
   * 5. Verify combined EPFO and ESIC statutory worker compliance & regular contributions.
   */
  async verifyEpfoEsic(query, options = {}) {
    throw new Error('Method verifyEpfoEsic() must be implemented by adapter.');
  }

  /**
   * Individual EPFO verification
   */
  async verifyEpfo(establishmentCode, options = {}) {
    throw new Error('Method verifyEpfo() must be implemented by adapter.');
  }

  /**
   * Individual ESIC verification
   */
  async verifyEsic(esicCode, options = {}) {
    throw new Error('Method verifyEsic() must be implemented by adapter.');
  }

  /**
   * 6A. Verify Startup India DPIIT recognition (prior turnover/experience waiver under GFR 173).
   */
  async verifyStartupIndia(query, options = {}) {
    throw new Error('Method verifyStartupIndia() must be implemented by adapter.');
  }

  /**
   * 6B. Verify NSIC Single Point Registration Scheme (SPRS) certificate.
   */
  async verifyNsic(query, options = {}) {
    throw new Error('Method verifyNsic() must be implemented by adapter.');
  }

  /**
   * 6C. Verify Manufacturer Authorization Form (MAF) directly with OEM repository.
   */
  async verifyOemAuth(query, options = {}) {
    throw new Error('Method verifyOemAuth() must be implemented by adapter.');
  }

  /**
   * Combined Startup, NSIC & OEM verification (backward-compatibility).
   */
  async verifyStartupNsicOem(query, options = {}) {
    throw new Error('Method verifyStartupNsicOem() must be implemented by adapter.');
  }

  /**
   * 7. Verify cryptographic digital signature, tamper-proofing SHA-256 hash,
   * and CCA-licensed CA issuance on documents via DigiLocker.
   */
  async verifyDigiLockerDoc(documentHash, options = {}) {
    throw new Error('Method verifyDigiLockerDoc() must be implemented by adapter.');
  }

  /**
   * 8. Verify Central Public Procurement Portal (CPPP) Debarment / Blacklist status
   * across 34 CPSEs and Central Ministries under GFR Rule 151.
   */
  async verifyCpppDebarment(query, options = {}) {
    throw new Error('Method verifyCpppDebarment() must be implemented by adapter.');
  }

  /**
   * Verify Corporate Identification Number (CIN) and Director DINs (MCA21).
   */
  async verifyMcaCin(cin, options = {}) {
    throw new Error('Method verifyMcaCin() must be implemented by adapter.');
  }

  /**
   * Health-check all gateway channels to monitor availability.
   */
  async healthCheckAll() {
    throw new Error('Method healthCheckAll() must be implemented by adapter.');
  }
}
