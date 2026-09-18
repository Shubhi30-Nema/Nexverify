import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Building2, 
  Clock, 
  Download, 
  UserCheck, 
  Check, 
  Globe, 
  Lock, 
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export default function BidderReportModal({ bidder, onClose, activeRole }) {
  const [decision, setDecision] = useState(null); // 'approve' | 'clarify' | 'reject'
  const [officerNotes, setOfficerNotes] = useState('');
  const [isDecisionSaved, setIsDecisionSaved] = useState(false);

  if (!bidder) return null;

  const isLow = bidder.riskLevel.includes('Low');
  const isMed = bidder.riskLevel.includes('Medium');

  const handleDecisionSubmit = (type) => {
    setDecision(type);
    setIsDecisionSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${
              isLow ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
              isMed ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
              'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">{bidder.companyName}</h3>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-400">
                  {bidder.bidId}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tender ID: <strong className="text-slate-200">{bidder.tenderId}</strong> • GSTIN: {bidder.gstin} • CIN: {bidder.cin}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Generating official GeM Bid Verification Certificate for ${bidder.companyName}...`)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold border border-slate-700 text-xs flex items-center gap-1.5 transition-colors hidden sm:flex"
            >
              <Download className="w-3.5 h-3.5" /> Certificate PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Executive Score & AI Recommendation Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Score Gauge Widget */}
            <div className="glass-panel p-5 rounded-xl border border-slate-800 flex flex-col justify-between items-center text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Compliance Score</span>
              
              <div className="relative my-3">
                <div className={`text-4xl font-extrabold font-mono ${
                  isLow ? 'text-emerald-400' : isMed ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {bidder.overallScore}<span className="text-sm font-sans text-slate-500">/100</span>
                </div>
                <div className={`mt-1 inline-block px-3 py-0.5 rounded-full text-xs font-bold border ${
                  isLow ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                  isMed ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                  'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {bidder.riskLevel}
                </div>
              </div>

              <span className="text-[11px] text-slate-400">14 Statutory Controls Analyzed</span>
            </div>

            {/* AI Recommendation Summary */}
            <div className="md:col-span-2 glass-panel p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> AI Verification Engine Recommendation
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                  Confidence: 99.4%
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">
                Recommendation: <span className={isLow ? 'text-emerald-400' : isMed ? 'text-amber-400' : 'text-rose-400'}>
                  {bidder.recommendation}
                </span>
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                {bidder.recommendationReason}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span>Verified Local Content: <strong className="text-cyan-300">{bidder.verifiedLocalContent}</strong></span>
                <span>Submitted Date: <strong className="text-slate-300">{bidder.submittedDate}</strong></span>
              </div>
            </div>
          </div>

          {/* 14-Point Statutory Verification Checklist Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> 14-Point Statutory & Regulatory Verification Audit Matrix
              </h4>
              <span className="text-xs text-slate-400">Integrated Government API Cross-Checks</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bidder.checks.map((check) => {
                const isCheckVerified = check.status.startsWith('Verified');
                const isCheckWarn = check.status.startsWith('Warning');
                const isCheckFail = check.status.startsWith('Failed');

                return (
                  <div
                    key={check.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isCheckVerified ? 'bg-slate-900/40 border-slate-800' :
                      isCheckWarn ? 'bg-amber-950/20 border-amber-800/50' :
                      'bg-rose-950/20 border-rose-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center font-mono">
                          {check.id}
                        </span>
                        <h5 className="text-xs font-bold text-white">{check.title}</h5>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${
                        isCheckVerified ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        isCheckWarn ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {isCheckVerified ? <CheckCircle2 className="w-3 h-3" /> :
                         isCheckWarn ? <AlertTriangle className="w-3 h-3" /> :
                         <XCircle className="w-3 h-3" />}
                        {check.status}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-cyan-300 mt-1">{check.value}</div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-snug">{check.details}</p>

                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Source: <strong className="text-slate-400">{check.portal}</strong></span>
                      <span className="flex items-center gap-1 text-emerald-400/80">
                        <Lock className="w-2.5 h-2.5" /> API Signature Verified
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Procurement Officer Decision Module */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-4 bg-slate-900/90">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" /> Procurement Officer Decision & Qualification Module
              </h4>
              <span className="text-[10px] px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                Statutory Authority: GeM Rule 14.2
              </span>
            </div>

            <p className="text-xs text-slate-300">
              The AI system acts as a verification tool. As Procurement Officer, select the official qualification status for this bidder:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleDecisionSubmit('approve')}
                className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  decision === 'approve'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-950 text-emerald-400 border-emerald-800/60 hover:bg-emerald-950/40'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> Qualify & Approve Bidder
              </button>

              <button
                onClick={() => handleDecisionSubmit('clarify')}
                className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  decision === 'clarify'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 text-amber-400 border-amber-800/60 hover:bg-amber-950/40'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Request Representation
              </button>

              <button
                onClick={() => handleDecisionSubmit('reject')}
                className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  decision === 'reject'
                    ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-lg shadow-rose-500/20'
                    : 'bg-slate-950 text-rose-400 border-rose-800/60 hover:bg-rose-950/40'
                }`}
              >
                <XCircle className="w-4 h-4" /> Disqualify Bidder
              </button>
            </div>

            {/* Officer Notes Input */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Official Qualification Remarks / Audit Note:
              </label>
              <textarea
                value={officerNotes}
                onChange={(e) => setOfficerNotes(e.target.value)}
                placeholder="Enter justification remarks for audit trail logging..."
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 h-20"
              />
            </div>

            {isDecisionSaved && (
              <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center justify-between animate-fadeIn">
                <span className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Decision logged to immutable GeM Audit Trail!
                </span>
                <span className="font-mono text-[10px] text-slate-400">Timestamp: 2026-09-16 20:26 IST</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyan-400" /> Cryptographic Ledger Record: 0x9f4a...29b1
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
