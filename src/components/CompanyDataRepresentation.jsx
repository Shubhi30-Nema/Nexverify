import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Users, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Award,
  Layers,
  Percent,
  Calendar,
  X
} from 'lucide-react';

export default function CompanyDataRepresentation({ bidder, tender, isModal = false, onClose }) {
  const [activeTab, setActiveTab] = useState('all');

  if (!bidder) return null;

  const turnoverHistory = bidder.turnoverHistory || [
    { year: 'FY 2023-24', amount: 35.0 },
    { year: 'FY 2024-25', amount: 38.0 },
    { year: 'FY 2025-26', amount: 42.5 }
  ];

  const localContent = bidder.localContentBreakdown || {
    local: parseFloat(bidder.localContent) || 68.4,
    imported: 100 - (parseFloat(bidder.localContent) || 68.4),
    required: tender?.miiReqNum || 50.0
  };

  const docScores = bidder.documentScores || [];
  const statutoryIndices = bidder.statutoryIndices || [
    { name: 'GST Filing Timeliness', score: 95, max: 100 },
    { name: 'ITR Consistency', score: 100, max: 100 },
    { name: 'MII Compliance', score: 90, max: 100 },
    { name: 'Debarment Cleanliness', score: 100, max: 100 },
    { name: 'Hash Authenticity', score: 100, max: 100 }
  ];

  const company = bidder.companyDetails || {
    cin: 'U72200DL2018PTC334912',
    incorporationDate: '14-Mar-2018',
    directors: ['Executive Director'],
    registeredAddress: 'Registered Corporate Office, India',
    employeeCountEPFO: 250,
    creditRating: 'CRISIL A (Stable)',
    paidUpCapital: '₹ 5.0 Crore'
  };

  // Compute maximum amount for turnover bar chart scaling
  const maxTurnover = Math.max(...turnoverHistory.map(t => t.amount), tender?.turnoverReqNum || 25, 10);
  const tenderReqTurnover = tender?.turnoverReqNum || 25.0;

  return (
    <div className={`space-y-6 font-sans ${isModal ? 'bg-white p-6 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-mono font-bold">
              {bidder.id}
            </span>
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-700" />
              Company Intelligence & Data Representation: {bidder.companyName}
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Visual data breakdown of financial capacity, Make-in-India compliance, document scores, and corporate governance.
          </p>
        </div>

        {isModal && onClose && (
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors self-end sm:self-auto"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs border-b border-gray-100 pb-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
            activeTab === 'all' ? 'bg-blue-700 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Visualizations
        </button>
        <button
          onClick={() => setActiveTab('turnover')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
            activeTab === 'turnover' ? 'bg-blue-700 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Financial Turnover Bar Graph
        </button>
        <button
          onClick={() => setActiveTab('mii')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
            activeTab === 'mii' ? 'bg-blue-700 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Make in India (MII) Composition
        </button>
        <button
          onClick={() => setActiveTab('scores')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
            activeTab === 'scores' ? 'bg-blue-700 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Document Scoring Weights
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
          <span className="text-gray-500 block">3-Year Annual Turnover</span>
          <span className="text-base font-bold text-gray-900 font-mono">{bidder.turnover}</span>
          <span className="text-[10px] text-emerald-700 font-medium block">
            Req: ₹ {tenderReqTurnover} Cr
          </span>
        </div>

        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
          <span className="text-gray-500 block">Make in India Local Content</span>
          <span className="text-base font-bold text-gray-900 font-mono">{bidder.localContent}</span>
          <span className="text-[10px] text-blue-700 font-medium block">
            Min Req: {tender?.miiRequirement || '50%'}
          </span>
        </div>

        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
          <span className="text-gray-500 block">Statutory Employees (EPFO)</span>
          <span className="text-base font-bold text-gray-900 font-mono">{company.employeeCountEPFO} Workers</span>
          <span className="text-[10px] text-gray-500 block">ECR Verified</span>
        </div>

        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
          <span className="text-gray-500 block">Credit Rating</span>
          <span className="text-base font-bold text-purple-900 font-mono">{company.creditRating}</span>
          <span className="text-[10px] text-gray-500 block">Rating Agency</span>
        </div>
      </div>

      {/* VISUALIZATION 1: Financial Turnover Bar Graph */}
      {(activeTab === 'all' || activeTab === 'turnover') && (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                3-Year Audited Annual Turnover Comparison vs Tender Threshold
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Evaluates gross receipts reported in audited financial statements & ITR Form 6.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200 self-start sm:self-auto">
              Tender Minimum: ₹ {tenderReqTurnover} Cr / yr
            </span>
          </div>

          {/* Bar Graph Representation */}
          <div className="space-y-3 pt-2">
            {turnoverHistory.map((item, idx) => {
              const percentage = Math.min(100, Math.round((item.amount / (maxTurnover * 1.15)) * 100));
              const exceedsReq = item.amount >= tenderReqTurnover;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-700 font-mono">{item.year}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-extrabold text-gray-900">₹ {item.amount.toFixed(1)} Crore</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        exceedsReq ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {exceedsReq ? 'Eligible' : 'Shortfall'}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-100 h-6 rounded-lg overflow-hidden relative flex items-center">
                    <div
                      className={`h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-bold text-white ${
                        exceedsReq ? 'bg-gradient-to-r from-blue-600 to-emerald-600' : 'bg-gradient-to-r from-rose-500 to-rose-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 15 ? `₹ ${item.amount} Cr` : ''}
                    </div>

                    {/* Tender threshold marker line */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-500 z-10"
                      style={{ left: `${(tenderReqTurnover / (maxTurnover * 1.15)) * 100}%` }}
                      title={`Tender Minimum: ₹ ${tenderReqTurnover} Cr`}
                    />
                  </div>
                </div>
              );
            })}

            {/* Threshold Legend */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
                <span>Audited Annual Turnover</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-amber-500 inline-block" />
                <span className="text-amber-700 font-bold">Mandatory Tender Threshold Line (₹ {tenderReqTurnover} Cr)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VISUALIZATION 2: Make in India Local Content Composition */}
      {(activeTab === 'all' || activeTab === 'mii') && (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-700" />
                Make in India (MII) Value-Addition Composition
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Domestic value addition verified from Bill of Quantities (BOQ) vs Imported component customs bills.
              </p>
            </div>
            <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
              localContent.local >= localContent.required ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              Class-I Margin: {localContent.local >= localContent.required ? `+${(localContent.local - localContent.required).toFixed(1)}%` : `-${(localContent.required - localContent.local).toFixed(1)}%`}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {/* Stacked Composition Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-700">Domestic Content: {localContent.local}%</span>
                <span className="text-slate-600">Imported Content: {localContent.imported.toFixed(1)}%</span>
              </div>

              <div className="w-full h-8 bg-gray-200 rounded-xl overflow-hidden flex relative">
                <div 
                  className="bg-emerald-600 h-full flex items-center justify-center text-xs text-white font-bold transition-all duration-500"
                  style={{ width: `${localContent.local}%` }}
                >
                  {localContent.local}% Local
                </div>
                <div 
                  className="bg-slate-500 h-full flex items-center justify-center text-xs text-white font-bold transition-all duration-500"
                  style={{ width: `${localContent.imported}%` }}
                >
                  {localContent.imported.toFixed(1)}% Import
                </div>

                {/* Requirement Marker */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 z-10 shadow"
                  style={{ left: `${localContent.required}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-gray-500 pt-1">
                <span>0%</span>
                <span className="text-amber-700 font-bold">▲ Minimum Tender Requirement: {localContent.required}%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs text-blue-900 leading-relaxed">
              <strong>MII Classification: </strong> 
              {localContent.local >= 50 ? 'Class-I Local Supplier (Eligible for purchase preference & 20% price band margin)' :
               localContent.local >= 20 ? 'Class-II Local Supplier (Non-local preference, subject to open tender competition)' :
               'Non-Local Supplier (Ineligible under Public Procurement Order 2017)'}
            </div>
          </div>
        </div>
      )}

      {/* VISUALIZATION 3: Document Compliance Score Weights */}
      {(activeTab === 'all' || activeTab === 'scores') && (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-700" />
                PaddleOCR Scored Documents vs Weight Ceilings
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Bar comparison showing points scored vs statutory weight allocation out of 100 points.
              </p>
            </div>
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-purple-50 text-purple-800 rounded border border-purple-200">
              Total Score: {bidder.score} / 100 Pts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {docScores.map((ds, idx) => {
              const pct = Math.round((ds.score / ds.maxScore) * 100);
              const isPass = ds.status === 'Pass';
              const isWarn = ds.status === 'Warning';
              return (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-800 truncate max-w-[200px]">{ds.doc}</span>
                    <span className="font-mono text-gray-900">{ds.score} / {ds.maxScore} pts</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isPass ? 'bg-emerald-600' : isWarn ? 'bg-amber-500' : 'bg-rose-600'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>OCR: {ds.ocrConfidence || '99.5%'}</span>
                    <span className={isPass ? 'text-emerald-700 font-bold' : isWarn ? 'text-amber-700 font-bold' : 'text-rose-700 font-bold'}>
                      {pct}% Achieved
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Corporate Entity Details */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-700" />
          MCA21 Corporate Master Data & Governance Credentials
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-gray-500 block">Corporate Identification No (CIN)</span>
            <span className="font-mono font-bold text-gray-900">{company.cin}</span>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-gray-500 block">Date of Incorporation</span>
            <span className="font-bold text-gray-900">{company.incorporationDate}</span>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-gray-500 block">Paid-Up Capital</span>
            <span className="font-mono font-bold text-gray-900">{company.paidUpCapital}</span>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 sm:col-span-2">
            <span className="text-gray-500 block">Registered Corporate Address</span>
            <span className="font-medium text-gray-800">{company.registeredAddress}</span>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-gray-500 block">Active Board Directors</span>
            <span className="font-medium text-gray-800">{company.directors.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
