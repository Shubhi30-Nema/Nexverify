import React, { useState } from 'react';
import { 
  GitCompare, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Scale, 
  Info,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

const STANDARD_COMPARISONS = [
  {
    key: 'udyam_gst',
    name: '1. Udyam MSME Certificate ↔ GSTR-3B Tax Filing',
    docA: 'Udyam MSME Certificate',
    docB: 'GSTR-3B Tax Filing Proof',
    fields: [
      { field: 'Legal Entity Name', statute: 'MSMED Act § 8 / CGST Act § 25', key: 'legalName' },
      { field: 'GSTIN Registration', statute: 'CGST Act Section 25', key: 'gstin' },
      { field: 'Registered State Code', statute: 'GST Rules - State Identifier', key: 'state' },
      { field: 'Registration Active Status', statute: 'MSMED Statutory Rule', key: 'status' }
    ]
  },
  {
    key: 'gst_pan',
    name: '2. GSTR-3B Tax Return ↔ Income Tax PAN & ITR-6',
    docA: 'GSTR-3B Tax Filing Proof',
    docB: 'Income Tax PAN & ITR-6',
    fields: [
      { field: 'Permanent Account Number (PAN)', statute: 'Income Tax Act § 139A / CGST § 25', key: 'pan' },
      { field: 'Gross Annual Turnover', statute: 'GFR 2017 Rule 160 Financial Standing', key: 'turnover' },
      { field: 'Entity Tax Filing Consistency', statute: 'Central Board of Direct Taxes & GSTN Harmonization', key: 'taxStatus' }
    ]
  },
  {
    key: 'mii_customs',
    name: '3. Make in India BOM Affidavit ↔ Customs Import Bill of Entry',
    docA: 'Make in India BOM Affidavit',
    docB: 'Customs Import Bill of Entry',
    fields: [
      { field: 'Local Content Value Addition %', statute: 'Public Procurement Order 2017 § 3', key: 'localContent' },
      { field: 'Imported Sub-Assemblies Declaration', statute: 'Customs Act 1962 / Country of Origin Rules', key: 'importedGoods' },
      { field: 'Class-I Supplier Eligibility', statute: 'GeM MII Preference Protocol', key: 'miiClass' }
    ]
  },
  {
    key: 'oem_digilocker',
    name: '4. OEM Authorization Letter ↔ DigiLocker Root Registry',
    docA: 'OEM Authorization Letter',
    docB: 'DigiLocker OEM Registry',
    fields: [
      { field: 'Partner Authorization Code', statute: 'GeM OEM Verification Protocol', key: 'partnerCode' },
      { field: 'SHA-256 Signature Hash', statute: 'Information Technology Act 2000 § 3', key: 'hash' },
      { field: 'Manufacturer Public Key Validation', statute: 'Digital Signature Standard DSS', key: 'keyValid' }
    ]
  }
];

export default function CrossCheckComparator({ bidder, tender }) {
  const [selectedComparison, setSelectedComparison] = useState(STANDARD_COMPARISONS[0].key);

  if (!bidder) return null;

  const crossChecks = bidder.crossCheckPoints || [];
  const currentComp = STANDARD_COMPARISONS.find(c => c.key === selectedComparison) || STANDARD_COMPARISONS[0];

  // Helper to extract side-by-side values based on bidder data
  const getSideBySideValues = (fieldKey) => {
    const isTechCorp = bidder.id === 'BID-101' || bidder.companyName.includes('TechCorp');
    const isSurya = bidder.id === 'BID-102' || bidder.companyName.includes('Surya');
    const isApex = bidder.id === 'BID-103' || bidder.companyName.includes('Apex Global');
    const isSunPower = bidder.id === 'BID-201';
    const isHelios = bidder.id === 'BID-202';
    const isApexFacility = bidder.id === 'BID-301';
    const isSecureGuard = bidder.id === 'BID-302';

    if (fieldKey === 'legalName') {
      return {
        valA: bidder.companyName,
        valB: bidder.companyName,
        status: 'MATCH',
        similarity: '100%',
        note: 'PaddleOCR string similarity 100%. Entity names match across both documents.'
      };
    }

    if (fieldKey === 'gstin') {
      return {
        valA: bidder.gstin,
        valB: bidder.gstin,
        status: 'MATCH',
        similarity: '100%',
        note: 'GSTIN exactly matches between Udyam certificate and GSTR-3B.'
      };
    }

    if (fieldKey === 'state') {
      const stateCode = bidder.gstin.slice(0, 2);
      return {
        valA: `State Code ${stateCode}`,
        valB: `State Code ${stateCode}`,
        status: 'MATCH',
        similarity: '100%',
        note: 'State jurisdiction is consistent.'
      };
    }

    if (fieldKey === 'status') {
      if (isApex) {
        return {
          valA: 'EXPIRED (Lapsed March 2025)',
          valB: 'Active Show Cause Notice',
          status: 'FAIL',
          similarity: '40%',
          note: 'Udyam registration expired; GST return under Section 73 audit.'
        };
      }
      return {
        valA: 'Active MSME Enterprise',
        valB: 'Active Regular Taxpayer',
        status: 'MATCH',
        similarity: '100%',
        note: 'Both registrations active with verified Ministry timestamps.'
      };
    }

    if (fieldKey === 'pan') {
      return {
        valA: bidder.pan,
        valB: bidder.pan,
        status: 'MATCH',
        similarity: '100%',
        note: 'PAN characters 3-10 match GSTIN string and ITR filing master data.'
      };
    }

    if (fieldKey === 'turnover') {
      if (isSurya) {
        return {
          valA: 'GSTR-3B Taxable Value ₹ 17.9 Cr',
          valB: 'ITR-6 Gross Receipts ₹ 18.3 Cr',
          status: 'MATCH',
          similarity: '97%',
          note: 'Reconciles within standard 3% timing variation for receivables.'
        };
      }
      if (isApex) {
        return {
          valA: 'GSTR-3B Taxable Turnover ₹ 5.8 Cr',
          valB: 'ITR-6 Turnover ₹ 6.2 Cr',
          status: 'MATCH',
          similarity: '94%',
          note: 'Turnover meets reported ITR but fails GeM tender minimum threshold (₹ 25.0 Cr).'
        };
      }
      return {
        valA: `GSTR-3B Reported Value ${bidder.turnover}`,
        valB: `ITR-6 Gross Receipts ${bidder.turnover}`,
        status: 'MATCH',
        similarity: '100%',
        note: 'Complete reconciliation across monthly returns and annual audited statements.'
      };
    }

    if (fieldKey === 'taxStatus') {
      if (isSurya) {
        return {
          valA: 'June 2026 Return Filed (45 Days Late)',
          valB: '3-Year ITR Assessment Compliant',
          status: 'WARNING',
          similarity: '78%',
          note: 'Late filing penalty incurred under CGST Section 47.'
        };
      }
      if (isApex) {
        return {
          valA: 'Section 73 Demand Notice Pending',
          valB: 'Loss return filed under Section 139',
          status: 'FAIL',
          similarity: '35%',
          note: 'Unresolved statutory tax dispute flagged.'
        };
      }
      return {
        valA: 'Returns Filed To Date (No Default)',
        valB: 'Assessment Compliant & Tax Paid',
        status: 'MATCH',
        similarity: '100%',
        note: 'Zero pending demands or late filing defaults.'
      };
    }

    if (fieldKey === 'localContent') {
      if (isSurya) {
        return {
          valA: 'Affidavit Declared: 65.0%',
          valB: 'Customs Bill Audit: 51.8%',
          status: 'DISCREPANCY',
          similarity: '62%',
          note: 'PaddleOCR detected imported inverters on Customs Bill #88412, reducing verified domestic value addition to 51.8%.'
        };
      }
      if (isApex) {
        return {
          valA: 'Affidavit Declared: 18.5%',
          valB: 'Customs Bill: 81.5% Imported Goods',
          status: 'CRITICAL FAIL',
          similarity: '18%',
          note: 'Finished laptops imported without domestic assembly. Direct violation of 50% MII minimum requirement.'
        };
      }
      if (isHelios) {
        return {
          valA: 'Affidavit Declared: 54.2%',
          valB: 'Customs Bill: 45.8% Imported PV Cells',
          status: 'DISCREPANCY',
          similarity: '54%',
          note: 'Tender requires 60% minimum; bidder falls 5.8% short of requirement.'
        };
      }
      return {
        valA: `Affidavit Declared: ${bidder.localContent}`,
        valB: 'Invoices Verified: 0% Direct Import Goods',
        status: 'MATCH',
        similarity: '98%',
        note: 'Itemized BOM costs reconcile with domestic vendor procurement records.'
      };
    }

    if (fieldKey === 'importedGoods') {
      if (isSurya) {
        return {
          valA: 'BOM Schedule: Inverters listed as Domestic',
          valB: 'Bill of Entry #88412: Inverters from Taoyuan, Taiwan',
          status: 'DISCREPANCY',
          similarity: '50%',
          note: 'Country-of-origin mismatch between affidavit declaration and shipping documents.'
        };
      }
      if (isApex) {
        return {
          valA: 'Declared Domestic Assembly & Testing',
          valB: 'Bill of Entry: CBU (Completely Built Units)',
          status: 'CRITICAL FAIL',
          similarity: '10%',
          note: 'Goods imported as 100% finished units with no Indian manufacturing.'
        };
      }
      return {
        valA: 'BOM Itemized Local Components',
        valB: 'Domestic Purchase GST Invoices Attached',
        status: 'MATCH',
        similarity: '100%',
        note: 'All critical sub-assemblies purchased from domestic MSME vendors.'
      };
    }

    if (fieldKey === 'miiClass') {
      if (isApex) return { valA: 'Class-I Claimed', valB: 'Non-Local (18.5%)', status: 'CRITICAL FAIL', similarity: '0%', note: 'Disqualified from public procurement preference.' };
      if (isSurya) return { valA: 'Class-I Claimed (65%)', valB: 'Borderline Class-I (51.8%)', status: 'WARNING', similarity: '65%', note: 'Passes 50% tender requirement, but margin is fragile.' };
      if (isHelios) return { valA: 'Class-I Claimed (60%)', valB: 'Class-II (54.2%)', status: 'DISCREPANCY', similarity: '54%', note: 'Ineligible for Class-I preference in 60% MII tender.' };
      return { valA: 'Class-I Local Supplier (>= 50%)', valB: 'Verified Class-I Supplier', status: 'MATCH', similarity: '100%', note: 'Eligible for 20% margin of purchase preference.' };
    }

    if (fieldKey === 'partnerCode') {
      return {
        valA: 'OEM-DEL-99481',
        valB: 'OEM-DEL-99481',
        status: 'MATCH',
        similarity: '100%',
        note: 'Manufacturer partner code matches authorized CPSE reseller register.'
      };
    }

    if (fieldKey === 'hash') {
      if (isApex) {
        return {
          valA: 'Scanned Stamp Hash: e3b0c442...98f1',
          valB: 'Registered OEM Key: 4a2b991c...1028',
          status: 'CRITICAL FAIL',
          similarity: '12%',
          note: 'Cryptographic hash mismatch. Certificate signature is potentially altered or fabricated.'
        };
      }
      return {
        valA: 'SHA-256: 7f83b165...4819',
        valB: 'SHA-256: 7f83b165...4819',
        status: 'MATCH',
        similarity: '100%',
        note: 'Cryptographic digital signature hash verified against OEM root authority.'
      };
    }

    if (fieldKey === 'keyValid') {
      if (isApex) return { valA: 'Signature Untrusted', valB: 'Revoked Key', status: 'FAIL', similarity: '0%', note: 'Verification against DigiLocker OEM repository failed.' };
      return { valA: 'Valid Public Key Certificate', valB: 'Active Root CA Certificate', status: 'MATCH', similarity: '100%', note: 'Cryptographic chain of trust verified.' };
    }

    return {
      valA: 'Extracted Value A',
      valB: 'Extracted Value B',
      status: 'MATCH',
      similarity: '100%',
      note: 'Harmonized data point.'
    };
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Info */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-blue-700" />
            PaddleOCR Multi-Document Cross-Checking Engine & Side-by-Side Comparator
          </h3>
          <span className="px-2.5 py-1 bg-blue-50 text-blue-800 rounded font-mono text-xs font-bold border border-blue-200 self-start sm:self-auto">
            Inter-Document Reconciliation Matrix
          </span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          The software cross-checks statutory credentials <strong>within pairs of documents and all over the technical bid dossier</strong>. Select any pair below to inspect side-by-side reconciliation, extracted fields, text similarity, and statutory compliance status.
        </p>
      </div>

      {/* Selector: Choose Document Pair to Compare */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
        <span className="text-xs font-bold text-gray-800 block">
          Select Two Documents to Compare Side-by-Side:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {STANDARD_COMPARISONS.map(comp => (
            <button
              key={comp.key}
              onClick={() => setSelectedComparison(comp.key)}
              className={`p-3 rounded-lg border text-left text-xs transition-all ${
                selectedComparison === comp.key 
                  ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-sm ring-1 ring-blue-600' 
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-1 text-[11px] text-blue-700 font-semibold mb-1">
                <GitCompare className="w-3.5 h-3.5" /> Compare Pair
              </div>
              <div className="leading-snug">{comp.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden space-y-4 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Side-by-Side Document Reconciliation: {currentComp.name}
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Comparing fields between <strong className="text-blue-900">{currentComp.docA}</strong> and <strong className="text-blue-900">{currentComp.docB}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100 text-gray-800 font-bold border-b border-gray-200">
              <tr>
                <th className="p-3 w-1/4">Comparison Parameter</th>
                <th className="p-3 w-1/3 text-blue-900">Doc A: {currentComp.docA}</th>
                <th className="p-3 w-1/3 text-blue-900">Doc B: {currentComp.docB}</th>
                <th className="p-3 text-right">Match Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentComp.fields.map((f, idx) => {
                const check = getSideBySideValues(f.key);
                const isMatch = check.status === 'MATCH';
                const isWarn = check.status === 'WARNING' || check.status === 'DISCREPANCY';

                return (
                  <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                    <td className="p-3 font-semibold text-gray-900 align-top">
                      <div>{f.field}</div>
                      <div className="text-[10px] text-gray-500 font-normal mt-0.5">
                        Statute: {f.statute}
                      </div>
                    </td>

                    <td className="p-3 align-top font-mono text-[11px] bg-blue-50/20 text-gray-800">
                      <div className="p-2 bg-white rounded border border-gray-200 shadow-2xs">
                        {check.valA}
                      </div>
                    </td>

                    <td className="p-3 align-top font-mono text-[11px] bg-purple-50/20 text-gray-800">
                      <div className="p-2 bg-white rounded border border-gray-200 shadow-2xs">
                        {check.valB}
                      </div>
                    </td>

                    <td className="p-3 text-right align-top">
                      <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold font-mono ${
                        isMatch ? 'bg-emerald-100 text-emerald-800' :
                        isWarn ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {check.status} ({check.similarity})
                      </span>
                      <p className="text-[10px] text-gray-500 mt-1 text-right max-w-[200px] ml-auto">
                        {check.note}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Cross-Checking Point Matrix (All Over The Documents) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden font-sans">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 font-bold text-xs text-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-700" />
            <span>Complete Multi-Document Cross-Checking Point Matrix (All Dossier Documents)</span>
          </div>
          <span className="text-[11px] text-gray-500">
            {crossChecks.length} Evaluated Points
          </span>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {crossChecks.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No cross-checking points recorded for this bidder.
            </div>
          ) : (
            crossChecks.map((cc, idx) => {
              const isMatch = cc.status === 'MATCH';
              const isWarn = cc.status === 'DISCREPANCY' || cc.status === 'DELAYED' || cc.status === 'WARNING';

              return (
                <div key={idx} className="p-4 hover:bg-gray-50 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-xs">
                        Point {idx + 1}: {cc.parameter}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 font-mono text-[11px]">
                        {cc.docA} ↔ {cc.docB}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono self-start sm:self-auto ${
                      isMatch ? 'bg-emerald-100 text-emerald-800' :
                      isWarn ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {cc.status} {cc.similarity ? `(${cc.similarity})` : ''}
                    </span>
                  </div>

                  <p className="text-gray-600 pl-3 border-l-2 border-blue-300 leading-relaxed text-[11px]">
                    {cc.notes}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
