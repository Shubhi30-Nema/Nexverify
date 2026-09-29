import React, { useState } from 'react';
import { 
  FileText, 
  Building2, 
  Calendar, 
  Users, 
  ChevronDown, 
  Filter, 
  Search, 
  Ban, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Info,
  ExternalLink,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import { TENDERS, BIDDERS } from '../data/mockData';
import { t } from '../data/translations';

export default function TendersView({ onSelectVerifyBidder, onLogAction, language = 'English' }) {
  const [expandedTenderId, setExpandedTenderId] = useState(TENDERS[0].id);
  const [riskFilter, setRiskFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [awardedBidders, setAwardedBidders] = useState({
    'GEM/2026/B/582910': 'BID-101' // Default demo award
  });
  const [selectedBlacklistDetail, setSelectedBlacklistDetail] = useState(null);

  const handleSelectBidderForAward = (tender, bidder) => {
    if (bidder.isBlacklisted) {
      alert(`❌ CANNOT SELECT BLACKLISTED BIDDER:\n\n${bidder.companyName} is blacklisted under GFR 2017 Rule 151.\n\nReason:\n${(bidder.blacklistReasons || []).join('\n')}\n\nHuman and procurement officers are strictly prohibited from selecting blacklisted bidders.`);
      return;
    }

    setAwardedBidders(prev => ({
      ...prev,
      [tender.id]: bidder.id
    }));

    if (onLogAction) {
      onLogAction({
        date: new Date().toLocaleString(),
        bidder: bidder.companyName,
        tender: tender.id,
        result: `${bidder.score}% (Risk: ${bidder.riskScore}%)`,
        action: `Selected & Awarded Tender by Procurement Officer`
      });
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-700" /> {t('tendersTitle', language)}
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            {t('tendersSub', language)}
          </p>
        </div>

        {/* Company Risk & Blacklist Filter & Search */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchTendersPlaceholder', language)}
              className="pl-8 pr-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-300 font-semibold">
            <Filter className="w-3.5 h-3.5 text-gray-500 ml-1" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-transparent text-gray-700 cursor-pointer pr-1 focus:outline-none"
            >
              <option value="All">All Bidders</option>
              <option value="Eligible">Eligible Only (Selectable)</option>
              <option value="Blacklisted">Blacklisted (Selection Blocked)</option>
              <option value="Low Risk">Low Risk (&lt;25%)</option>
              <option value="Medium Risk">Medium Risk (25-54%)</option>
              <option value="High Risk">High Risk / Blacklisted (&ge;55%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statutory Enforcement Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-xl border border-blue-800/70 text-white text-xs space-y-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Automated Blacklisting & Procurement Officer Selection Protocol (GFR 2017 Rule 151)
          </div>
          <span className="px-2 py-0.5 rounded bg-blue-900/60 text-cyan-300 font-mono text-[10px] border border-blue-700">
            11 Documents Total (4 Mandatory + 7 Equal Priority)
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-[11px] text-slate-300">
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-blue-900/60">
            <strong className="text-rose-400 block font-bold mb-0.5">1. Mandatory Docs (ITR, GST, Udyam, PAN):</strong>
            Zero tolerance. Any mistake in verification or pairwise cross-check automatically blacklists the bidder immediately.
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-blue-900/60">
            <strong className="text-cyan-300 block font-bold mb-0.5">2. Remaining 7 Docs (14.29% Equal Weight):</strong>
            Mathematical Risk Score = (1/7) * &Sigma; (100 - Score_i). If Risk Score &ge; 55.0%, bidder is automatically blacklisted.
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-blue-900/60">
            <strong className="text-amber-300 block font-bold mb-0.5">3. Human Officer Selection Lockout:</strong>
            Blacklisted bidders are shown in the tender for full audit transparency, but selection/award is strictly blocked.
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {TENDERS.map(tender => {
          const isExpanded = expandedTenderId === tender.id;
          const awardedBidderId = awardedBidders[tender.id];
          const awardedBidder = BIDDERS.find(b => b.id === awardedBidderId);

          const tenderBidders = BIDDERS.filter(b => {
            const matchesTender = b.tenderId === tender.id;
            let matchesRisk = true;
            if (riskFilter === 'Eligible') {
              matchesRisk = !b.isBlacklisted;
            } else if (riskFilter === 'Blacklisted') {
              matchesRisk = b.isBlacklisted;
            } else if (riskFilter !== 'All') {
              matchesRisk = b.riskLevel === riskFilter || (riskFilter === 'High Risk' && b.isBlacklisted);
            }
            const matchesSearch = b.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  b.gstin.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTender && matchesRisk && matchesSearch;
          });

          return (
            <div key={tender.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div 
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedTenderId(isExpanded ? null : tender.id)}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-mono font-bold rounded">
                      {tender.id}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{tender.department}</span>
                    {awardedBidder && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded flex items-center gap-1 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Awarded: {awardedBidder.companyName}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{tender.title}</h3>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Estimated Budget</div>
                    <div className="text-xs font-bold text-emerald-700">{tender.estimatedBudget}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500">{t('closingDate', language)}</div>
                    <div className="text-xs font-semibold text-gray-700">{tender.closingDate}</div>
                  </div>

                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180 text-blue-700' : ''}`} />
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-200 p-5 bg-gray-50 space-y-4">
                  {/* Tender Requirement summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 rounded-lg border border-gray-200 text-xs">
                    <div>
                      <span className="text-gray-500">Make in India Requirement:</span>
                      <div className="font-bold text-gray-900">{tender.miiRequirement}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Turnover Requirement:</span>
                      <div className="font-bold text-gray-900">{tender.turnoverRequirement}</div>
                    </div>
                  </div>

                  {/* Bidders Table */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-3 bg-gray-100 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-gray-800">
                        Participating Bidders & Eligibility Audit ({tenderBidders.length} Bidders)
                      </span>
                      <span className="text-gray-500 text-[11px]">
                        Blacklisted bidders are shown with selection disabled per GFR 2017 Rule 151
                      </span>
                    </div>

                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                        <tr>
                          <th className="p-3">{t('bidderCompany', language)}</th>
                          <th className="p-3">GSTIN / PAN</th>
                          <th className="p-3">Compliance Score</th>
                          <th className="p-3">Risk Score (7 Docs)</th>
                          <th className="p-3">Blacklist Status</th>
                          <th className="p-3 text-right">Procurement Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {tenderBidders.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="p-4 text-center text-gray-500">
                              No bidders matching filter criteria.
                            </td>
                          </tr>
                        ) : (
                          tenderBidders.map(b => {
                            const isBlacklisted = b.isBlacklisted;
                            const isAwarded = awardedBidderId === b.id;
                            const riskScore = b.riskScore !== undefined ? b.riskScore : (100 - b.score);

                            return (
                              <tr 
                                key={b.id} 
                                className={`transition-colors ${
                                  isBlacklisted ? 'bg-rose-50/40 hover:bg-rose-50/70' :
                                  isAwarded ? 'bg-emerald-50/50 hover:bg-emerald-50/80' :
                                  'hover:bg-gray-50'
                                }`}
                              >
                                <td className="p-3">
                                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                                    {b.companyName}
                                    {isAwarded && (
                                      <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded text-[10px] font-bold">
                                        Selected
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-gray-500 font-mono">
                                    ID: {b.id} • MSME: {b.udyamNo || 'N/A'}
                                  </div>
                                </td>

                                <td className="p-3 font-mono text-gray-700">
                                  <div>{b.gstin}</div>
                                  <div className="text-[10px] text-gray-500 font-sans">PAN: {b.pan}</div>
                                </td>

                                <td className="p-3 font-mono font-bold">
                                  <span className="text-gray-900">{b.score}</span>
                                  <span className="text-gray-400 text-[10px]"> / 100</span>
                                </td>

                                <td className="p-3 font-mono">
                                  <span className={`font-bold ${
                                    riskScore >= 55 ? 'text-rose-700' :
                                    riskScore >= 25 ? 'text-amber-700' :
                                    'text-emerald-700'
                                  }`}>
                                    {riskScore}%
                                  </span>
                                  <div className="text-[10px] text-gray-500 font-sans">
                                    {riskScore >= 55 ? '≥ 55% Threshold' : 'Safe Margin'}
                                  </div>
                                </td>

                                <td className="p-3">
                                  {isBlacklisted ? (
                                    <div className="space-y-1">
                                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white shadow-2xs">
                                        <Ban className="w-3 h-3" /> BLACKLISTED
                                      </span>
                                      <div className="text-[10px] text-rose-800 font-medium leading-tight max-w-[240px]">
                                        {(b.blacklistReasons && b.blacklistReasons[0]) || 'Mandatory document mistake / Risk Score ≥ 55%'}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="space-y-0.5">
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                                        b.badgeColor === 'green' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                                        'bg-amber-100 text-amber-800 border border-amber-300'
                                      }`}>
                                        <ShieldCheck className="w-3 h-3" /> Eligible / Selectable
                                      </span>
                                      <div className="text-[10px] text-gray-500">
                                        {b.riskLevel || 'Low Risk'}
                                      </div>
                                    </div>
                                  )}
                                </td>

                                <td className="p-3 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    {/* SELECTION BUTTON: STRICTLY DISABLED FOR BLACKLISTED BIDDERS */}
                                    {isBlacklisted ? (
                                      <div className="relative group">
                                        <button
                                          disabled
                                          className="px-2.5 py-1.5 bg-gray-100 text-gray-400 border border-gray-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-not-allowed select-none opacity-80"
                                          title={`Selection Prohibited: ${b.companyName} is blacklisted and cannot be selected by procurement officers.`}
                                        >
                                          <Ban className="w-3.5 h-3.5 text-rose-600" />
                                          <span className="hidden sm:inline">Selection Blocked</span>
                                        </button>
                                        <div className="absolute right-0 bottom-full mb-1 hidden group-hover:block z-20 w-64 p-2 bg-slate-900 text-white text-[11px] rounded shadow-lg border border-slate-700 pointer-events-none text-left">
                                          <strong className="text-rose-400 block">⛔ SELECTION PROHIBITED:</strong>
                                          Under GFR Rule 151, procurement officers cannot select blacklisted vendors.
                                        </div>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => handleSelectBidderForAward(tender, b)}
                                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs ${
                                          isAwarded 
                                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-400' 
                                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                                        }`}
                                      >
                                        {isAwarded ? (
                                          <> <CheckCircle2 className="w-3.5 h-3.5" /> Awarded </>
                                        ) : (
                                          <> <Award className="w-3.5 h-3.5" /> Select Bidder </>
                                        )}
                                      </button>
                                    )}

                                    {/* VERIFY BUTTON */}
                                    <button
                                      onClick={() => onSelectVerifyBidder(b.id, tender.id)}
                                      className="px-2.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-2xs"
                                    >
                                      {t('verifyBidderBtn', language)}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
