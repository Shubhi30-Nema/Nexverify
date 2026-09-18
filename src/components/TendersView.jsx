import React, { useState } from 'react';
import { FileText, Building2, Calendar, Users, ChevronDown, Filter, Search } from 'lucide-react';
import { TENDERS, BIDDERS } from '../data/mockData';
import { t } from '../data/translations';

export default function TendersView({ onSelectVerifyBidder, language = 'English' }) {
  const [expandedTenderId, setExpandedTenderId] = useState(TENDERS[0].id);
  const [riskFilter, setRiskFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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

        {/* Company Risk Filter & Search */}
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
              <option value="All">All Risk Levels</option>
              <option value="Low Risk">Low Risk</option>
              <option value="Medium Risk">Medium Risk</option>
              <option value="High Risk">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {TENDERS.map(tender => {
          const isExpanded = expandedTenderId === tender.id;
          const tenderBidders = BIDDERS.filter(b => {
            const matchesTender = b.tenderId === tender.id;
            const matchesRisk = riskFilter === 'All' || b.riskLevel === riskFilter;
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
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                        <tr>
                          <th className="p-3">{t('bidderCompany', language)}</th>
                          <th className="p-3">GSTIN</th>
                          <th className="p-3">{t('overallScore', language)}</th>
                          <th className="p-3">Risk Classification</th>
                          <th className="p-3 text-right">{t('actions', language)}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {tenderBidders.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="p-4 text-center text-gray-500">
                              No bidders matching filter criteria.
                            </td>
                          </tr>
                        ) : (
                          tenderBidders.map(b => (
                            <tr key={b.id} className="hover:bg-gray-50">
                              <td className="p-3 font-bold text-gray-900">{b.companyName}</td>
                              <td className="p-3 font-mono text-gray-600">{b.gstin}</td>
                              <td className="p-3 font-mono font-bold">{b.score} / 100</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  b.badgeColor === 'green' ? 'bg-emerald-100 text-emerald-800' :
                                  b.badgeColor === 'amber' ? 'bg-amber-100 text-amber-800' :
                                  'bg-rose-100 text-rose-800'
                                }`}>
                                  {b.riskLevel}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => onSelectVerifyBidder(b.id, tender.id)}
                                  className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded text-xs transition-colors"
                                >
                                  {t('verifyBidderBtn', language)}
                                </button>
                              </td>
                            </tr>
                          ))
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

