import React, { useState } from 'react';
import { History, ShieldCheck, Search, Download, Clock, CheckCircle2, FileSpreadsheet, FileCode } from 'lucide-react';
import { t } from '../data/translations';

export default function AuditTrailView({ logs, language = 'English' }) {
  const [filterQuery, setFilterQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const displayLogs = logs || [];

  const filteredLogs = displayLogs.filter(l => 
    l.bidder.toLowerCase().includes(filterQuery.toLowerCase()) ||
    l.tender.toLowerCase().includes(filterQuery.toLowerCase()) ||
    l.action.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const handleExportCSV = () => {
    if (filteredLogs.length === 0) return;

    const headers = ['Timestamp', 'Bidder Company', 'Tender ID', 'AI Score Result', 'Officer Decision & Action'];
    const csvRows = [
      headers.join(','),
      ...filteredLogs.map(l => [
        `"${(l.date || '').replace(/"/g, '""')}"`,
        `"${(l.bidder || '').replace(/"/g, '""')}"`,
        `"${(l.tender || '').replace(/"/g, '""')}"`,
        `"${(l.result || '').replace(/"/g, '""')}"`,
        `"${(l.action || '').replace(/"/g, '""')}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `gem_compliance_audit_ledger_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerToast(`Successfully downloaded ${filteredLogs.length} audit records as CSV!`);
  };

  const handleExportJSON = () => {
    if (filteredLogs.length === 0) return;

    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `gem_compliance_audit_ledger_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerToast(`Successfully downloaded ${filteredLogs.length} audit records as JSON!`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="p-3.5 bg-emerald-900 text-white rounded-xl shadow-lg border border-emerald-700 flex items-center justify-between text-xs animate-fadeIn">
          <span className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" /> {toastMessage}
          </span>
          <span className="text-[10px] text-emerald-300 font-mono">Downloaded File Ready</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-700" /> {t('auditLedgerTitle', language)}
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            {t('auditLedgerDesc', language)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={t('searchAuditPlaceholder', language)}
              className="pl-8 pr-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-sm whitespace-nowrap"
              title="Download CSV Spreadsheet File"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-300" /> {t('exportCsvBtn', language)}
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg border border-gray-300 text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap"
              title="Download JSON Raw Audit Ledger"
            >
              <FileCode className="w-3.5 h-3.5 text-blue-700" /> {t('exportJsonBtn', language)}
            </button>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs font-bold text-gray-700">
          <span>Real-Time Audit Records ({filteredLogs.length})</span>
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Auto-Updating Ledger Active
          </span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
            <tr>
              <th className="p-3">{t('timestamp', language)}</th>
              <th className="p-3">{t('bidderCompany', language)}</th>
              <th className="p-3">{t('tenderId', language)}</th>
              <th className="p-3">{t('aiScoreResult', language)}</th>
              <th className="p-3">{t('officerDecisionAction', language)}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No audit logs matching search query.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-mono text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-700" /> {log.date}
                  </td>
                  <td className="p-3 font-bold text-gray-900">{log.bidder}</td>
                  <td className="p-3 font-mono text-gray-600">{log.tender}</td>
                  <td className="p-3 font-semibold text-gray-800">{log.result}</td>
                  <td className="p-3 font-medium text-blue-800">{log.action}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

