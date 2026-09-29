import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Search, 
  Building2, 
  FileText, 
  ShieldCheck, 
  Loader2, 
  Check, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Info,
  GitCompare,
  AlertTriangle,
  FileCheck,
  ScanText,
  Award,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Zap,
  HelpCircle,
  BarChart3,
  ExternalLink,
  Scale,
  Ban,
  ShieldAlert,
  Calculator
} from 'lucide-react';
import { TENDERS, BIDDERS } from '../data/mockData';
import CrossCheckComparator from './CrossCheckComparator';
import AIScoringExplainer from './AIScoringExplainer';
import { t } from '../data/translations';

export default function VerifyBidView({ 
  selectedTenderId: propTenderId, 
  setSelectedTenderId: propSetTenderId, 
  selectedBidderId: propBidderId, 
  setSelectedBidderId: propSetBidderId, 
  onLogAction,
  language = 'English'
}) {
  const [localTenderId, setLocalTenderId] = useState(propTenderId || 'GEM/2026/B/582910');
  const [localBidderId, setLocalBidderId] = useState(propBidderId || 'BID-101');

  const selectedTenderId = propTenderId !== undefined ? propTenderId : localTenderId;
  const setSelectedTenderId = (tid) => {
    if (propSetTenderId) propSetTenderId(tid);
    setLocalTenderId(tid);
  };

  const selectedBidderId = propBidderId !== undefined ? propBidderId : localBidderId;
  const setSelectedBidderId = (bid) => {
    if (propSetBidderId) propSetBidderId(bid);
    setLocalBidderId(bid);
  };

  const [isVerifying, setIsVerifying] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);
  const [stepProgress, setStepProgress] = useState(6);
  const [officerDecision, setOfficerDecision] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'crosschecks'

  // Filter bidders for the current tender
  const tenderBidders = BIDDERS.filter(b => b.tenderId === selectedTenderId);
  const availableBidders = tenderBidders.length > 0 ? tenderBidders : BIDDERS;

  // Selected tender and bidder objects
  const selectedTender = TENDERS.find(t => t.id === selectedTenderId) || TENDERS[0];
  const selectedBidder = availableBidders.find(b => b.id === selectedBidderId) || availableBidders[0];

  // Auto-sync bidder when tender changes if current bidder does not belong to tender
  useEffect(() => {
    const isCurrentBidderInTender = tenderBidders.some(b => b.id === selectedBidderId);
    if (!isCurrentBidderInTender && tenderBidders.length > 0) {
      setSelectedBidderId(tenderBidders[0].id);
    }
  }, [selectedTenderId]);

  useEffect(() => {
    setHasVerified(false);
    setOfficerDecision(null);
  }, [selectedTenderId, selectedBidderId]);

  const handleTenderChange = (newTenderId) => {
    setSelectedTenderId(newTenderId);
    const matchingBidders = BIDDERS.filter(b => b.tenderId === newTenderId);
    if (matchingBidders.length > 0) {
      setSelectedBidderId(matchingBidders[0].id);
    }
  };

  const handleRunCheck = () => {
    setIsVerifying(true);
    setHasVerified(false);
    setStepProgress(0);
    setOfficerDecision(null);

    let p = 0;
    const interval = setInterval(() => {
      p++;
      setStepProgress(p);
      if (p >= 6) {
        clearInterval(interval);
        setIsVerifying(false);
        setHasVerified(true);
      }
    }, 320);
  };

  const hasFailures = (selectedBidder.failureDetails || []).length > 0 || selectedBidder.score < 80;

  return (
    <div className="space-y-6 font-sans">
      {/* Tender & Participating Bidder Selection Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <ScanText className="w-5 h-5 text-blue-700" />
              {t('verifyCenterTitle', language)}
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              {t('verifyCenterDesc', language)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 text-xs font-mono font-bold border border-blue-200">
              Active: {selectedTender.id}
            </span>
          </div>
        </div>

        {/* Dropdowns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* 1. Select Tender */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              {t('currentTenderLabel', language)}
            </label>
            <select
              value={selectedTenderId}
              onChange={(e) => handleTenderChange(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-600"
            >
              {TENDERS.map(t => (
                <option key={t.id} value={t.id}>
                  {t.id} - {t.title.slice(0, 42)}...
                </option>
              ))}
            </select>
          </div>

          {/* 2. Select Participating Bidder */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              {t('participatingBidderLabel', language)} ({tenderBidders.length} {t('available', language)}):
            </label>
            <select
              value={selectedBidderId}
              onChange={(e) => setSelectedBidderId(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-600"
            >
              {availableBidders.map(b => (
                <option key={b.id} value={b.id}>
                  {b.companyName} ({b.riskLevel} - {b.score}/100)
                </option>
              ))}
            </select>
          </div>

          {/* 3. Run Check Button */}
          <div>
            <button
              onClick={handleRunCheck}
              disabled={isVerifying}
              className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {isVerifying ? (
                <> <Loader2 className="w-4 h-4 animate-spin" /> {t('scanningBtn', language)} </>
              ) : (
                <> <ScanText className="w-4 h-4" /> {t('runOcrBtn', language)} </>
              )}
            </button>
          </div>
        </div>

        {/* Selected Context Summary Bar */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-700" />
            <span className="text-gray-500">Evaluating:</span>
            <strong className="text-gray-900">{selectedBidder.companyName}</strong>
            <span className="text-gray-400">|</span>
            <span className="font-mono text-gray-600">GSTIN: {selectedBidder.gstin}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500">Tender MII Target: <strong>{selectedTender.miiRequirement}</strong></span>
            <span className="text-gray-500">Min Turnover: <strong>{selectedTender.turnoverRequirement}</strong></span>
          </div>
        </div>
      </div>

      {/* Progress Stepper Animation */}
      {isVerifying && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 font-sans">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-800 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-700 animate-spin" /> AI Multi-Document OCR Scanning & Reconciliation...
            </span>
            <span className="font-mono text-blue-700 font-bold">{Math.round((stepProgress / 6) * 100)}%</span>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-700 transition-all duration-300 rounded-full"
              style={{ width: `${(stepProgress / 6) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <div className={`p-2 rounded border ${stepProgress >= 1 ? 'bg-blue-50 border-blue-200 text-blue-900 font-medium' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              ✓ 1. Udyam MSME Certificate OCR
            </div>
            <div className={`p-2 rounded border ${stepProgress >= 2 ? 'bg-blue-50 border-blue-200 text-blue-900 font-medium' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              ✓ 2. GSTR-3B Tax Filing Photo OCR
            </div>
            <div className={`p-2 rounded border ${stepProgress >= 3 ? 'bg-blue-50 border-blue-200 text-blue-900 font-medium' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              ✓ 3. PAN & 3-Year ITR Return OCR
            </div>
            <div className={`p-2 rounded border ${stepProgress >= 4 ? 'bg-blue-50 border-blue-200 text-blue-900 font-medium' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              ✓ 4. MII BOM Local Content Verification
            </div>
            <div className={`p-2 rounded border ${stepProgress >= 5 ? 'bg-blue-50 border-blue-200 text-blue-900 font-medium' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              ✓ 5. CPPP Central Debarment Search
            </div>
            <div className={`p-2 rounded border ${stepProgress >= 6 ? 'bg-blue-50 border-blue-200 text-blue-900 font-medium' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              ✓ 6. DigiLocker Cryptographic Hash Validation
            </div>
          </div>
        </div>
      )}

      {/* Main Verification Results Body */}
      {hasVerified && !isVerifying && (
        <div className="space-y-6">
          {/* Main Score Banner */}
          <div className={`p-6 rounded-xl border shadow-xs ${
            selectedBidder.badgeColor === 'green' ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' :
            selectedBidder.badgeColor === 'amber' ? 'bg-amber-50/80 border-amber-300 text-amber-950' :
            'bg-rose-50/80 border-rose-300 text-rose-950'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl font-extrabold">{selectedBidder.companyName}</h3>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                    selectedBidder.badgeColor === 'green' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                    selectedBidder.badgeColor === 'amber' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                    'bg-rose-100 text-rose-800 border-rose-300'
                  }`}>
                    {selectedBidder.riskLevel}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-gray-800 text-xs font-mono font-bold border border-gray-300">
                    {selectedBidder.recommendation}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  GSTIN: <strong className="font-mono text-gray-800">{selectedBidder.gstin}</strong> | PAN: <strong className="font-mono text-gray-800">{selectedBidder.pan}</strong> | Tender: <strong className="font-mono text-gray-800">{selectedTender.id}</strong>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs font-semibold text-gray-600">AI Statutory Composite Score</div>
                  <div className="text-3xl font-extrabold font-mono">
                    {selectedBidder.score} <span className="text-sm font-sans text-gray-500">/ 100 Pts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendation Summary */}
            <div className="mt-4 p-4 bg-white/90 rounded-lg border border-gray-200 text-xs space-y-1">
              <strong className="text-gray-900 block font-bold">AI Statutory Scan Finding & Recommendation:</strong>
              <p className="text-gray-700 leading-relaxed">{selectedBidder.summary}</p>
            </div>

            {/* Turnover & MII Footer */}
            <div className="mt-4 pt-3 border-t border-gray-200/70 text-xs">
              <span className="text-gray-600">
                Turnover: <strong>{selectedBidder.turnover}</strong> • MII Content: <strong>{selectedBidder.localContent}</strong>
              </span>
            </div>
          </div>

          {/* AUTOMATIC BLACKLIST ALERT BANNER */}
          {selectedBidder.isBlacklisted && (
            <div className="p-5 bg-rose-50 border-2 border-rose-500 rounded-xl space-y-3 font-sans shadow-sm animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-6 h-6 text-rose-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-extrabold text-rose-950 flex items-center gap-2">
                      AUTOMATIC BIDDER BLACKLIST ORDER ENFORCED
                      <span className="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-mono">
                        GFR 2017 RULE 151
                      </span>
                    </h4>
                    <p className="text-xs text-rose-800">
                      Procurement officer cannot select or qualify this bidder for tender award.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-rose-600 text-white font-mono font-bold text-xs rounded-lg shadow-2xs self-start sm:self-auto flex items-center gap-1.5">
                  <Ban className="w-3.5 h-3.5" /> SELECTION PROHIBITED
                </span>
              </div>

              {/* Trigger diagnostic details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 bg-white rounded-lg border border-rose-200 space-y-1">
                  <strong className="text-gray-900 block font-bold flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-700" />
                    Mandatory Documents (ITR, GST, Udyam, PAN):
                  </strong>
                  <p className="text-gray-700 leading-relaxed text-[11px]">
                    {selectedBidder.riskEvaluation?.hasMandatoryMistake ? (
                      <span className="text-rose-700 font-bold block">
                        ❌ Mistake/Discrepancy detected in mandatory statutory credentials. Automatic blacklisting triggered.
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold block">
                        ✓ All 4 mandatory documents verified without error.
                      </span>
                    )}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-rose-200 space-y-1">
                  <strong className="text-gray-900 block font-bold flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-purple-700" />
                    7 Remaining Documents Risk Score (Equal Priority 14.29% each):
                  </strong>
                  <p className="text-gray-700 leading-relaxed text-[11px]">
                    Risk Score: <strong className="font-mono text-rose-700 text-xs">{selectedBidder.riskScore}%</strong>{' '}
                    {selectedBidder.riskScore >= 55 ? (
                      <span className="text-rose-700 font-bold">(Exceeds 55.0% statutory blacklist threshold).</span>
                    ) : (
                      <span className="text-emerald-700 font-medium">(Safe margin below 55%).</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Blacklist reasons list */}
              <div className="p-3 bg-white/90 rounded-lg border border-rose-200 text-xs">
                <strong className="text-rose-950 font-bold block mb-1">Specific Blacklisting Grounds:</strong>
                <ul className="list-disc pl-5 space-y-0.5 text-rose-900 text-[11px]">
                  {(selectedBidder.blacklistReasons || []).map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}



          {/* REQUIREMENT 2: VERIFICATION FAILURE & DISCREPANCY ROOT CAUSE PANEL */}
          {hasFailures ? (
            <div className="bg-rose-50 rounded-xl border border-rose-300 p-5 space-y-3 font-sans shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <h4 className="text-sm font-extrabold text-rose-950">
                    Why Verification Failed / Discrepancy Diagnostics ({(selectedBidder.failureDetails || []).length} Points Flagged)
                  </h4>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-rose-100 text-rose-800 font-mono font-bold text-xs border border-rose-200">
                  Statutory Rule Violations Detected
                </span>
              </div>

              <p className="text-xs text-rose-900 leading-relaxed">
                The AI statutory multi-document cross-checking engine identified discrepancies between submitted documents and statutory portals:
              </p>

              <div className="space-y-3 pt-1">
                {(selectedBidder.failureDetails || []).map((fd, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-rose-200 text-xs space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-950 text-sm flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        {fd.title}
                      </span>
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-mono font-bold text-[10px] border border-rose-200">
                        {fd.ruleViolation}
                      </span>
                    </div>

                    <div className="text-gray-800 leading-relaxed pl-5 border-l-2 border-rose-300">
                      <strong>Root Cause Failure Reason: </strong>{fd.reason}
                    </div>

                    <div className="text-rose-900 font-semibold bg-rose-50/70 p-2.5 rounded border border-rose-100">
                      <strong>Impact on Tender Qualification: </strong>{fd.impact}
                    </div>

                    {fd.remedy && (
                      <div className="text-blue-900 bg-blue-50/70 p-2.5 rounded border border-blue-100">
                        <strong>Recommended Officer Action / Remedy: </strong>{fd.remedy}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Compliant Notice if no failure details */
            <div className="bg-emerald-50 rounded-xl border border-emerald-300 p-4 font-sans flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-emerald-950">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong className="font-bold block">100% Statutory Criteria Verified: Zero Discrepancies</strong>
                  <span>All technical credentials, MII local content, GST filings, and OEM hashes match across all submitted documents.</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg text-xs font-mono shadow-2xs">
                VERIFIED PASS
              </span>
            </div>
          )}

          {/* NAVIGATION TABS FOR VERIFICATION SUB-VIEWS */}
          <div className="flex border-b border-gray-200 gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 px-1 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'overview' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              Document-by-Document AI Scores
            </button>

            <button
              onClick={() => setActiveTab('crosschecks')}
              className={`pb-2.5 px-1 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'crosschecks' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              Cross-Checking Points & Side-by-Side Comparator
            </button>
          </div>

          {/* TAB 1: Document-by-Document AI Scores & Explainer */}
          {activeTab === 'overview' && (
            <AIScoringExplainer bidder={selectedBidder} tender={selectedTender} />
          )}

          {/* TAB 2: Multi-Document Cross-Checking Point Matrix & Side-by-Side Comparator */}
          {activeTab === 'crosschecks' && (
            <CrossCheckComparator bidder={selectedBidder} tender={selectedTender} />
          )}


          {/* Procurement Officer Decision Module */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 font-sans">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Procurement Officer Decision (Final Qualification)
            </h4>

            {/* SELECTION LOCKOUT BANNER FOR BLACKLISTED BIDDERS */}
            {selectedBidder.isBlacklisted && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-xs text-rose-950 flex items-start gap-2.5">
                <Ban className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-rose-900 font-bold">
                    ⛔ PROCUREMENT OFFICER SELECTION BLOCKED (Statutory Lockdown):
                  </strong>
                  <p className="text-rose-800 leading-relaxed">
                    Under GFR 2017 Rule 151 and public procurement regulations, human procurement officers <strong>cannot select, approve, or qualify</strong> this bidder because they are blacklisted.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* QUALIFY BUTTON: STRICTLY DISABLED FOR BLACKLISTED BIDDERS */}
              {selectedBidder.isBlacklisted ? (
                <button
                  disabled
                  className="py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 border bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-75 select-none"
                  title="Selection Prohibited: Bidder is blacklisted."
                >
                  <Ban className="w-4 h-4 text-rose-500" /> Selection Prohibited (Blacklisted)
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOfficerDecision('Approved');
                    if (onLogAction) {
                      onLogAction({
                        date: new Date().toLocaleString(),
                        bidder: selectedBidder.companyName,
                        tender: selectedTender.id,
                        result: `${selectedBidder.score}% (Qualified)`,
                        action: 'Qualified by Procurement Officer'
                      });
                    }
                  }}
                  className={`py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                    officerDecision === 'Approved' 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow' 
                      : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" /> Qualify & Approve Bid
                </button>
              )}

              <button
                onClick={() => {
                  setOfficerDecision('Clarification Requested');
                  if (onLogAction) {
                    onLogAction({
                      date: new Date().toLocaleString(),
                      bidder: selectedBidder.companyName,
                      tender: selectedTender.id,
                      result: `${selectedBidder.score}% (Warning)`,
                      action: 'Clarification Letter Issued'
                    });
                  }
                }}
                className={`py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  officerDecision === 'Clarification Requested' 
                    ? 'bg-amber-600 text-white border-amber-600 shadow' 
                    : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Request Representation
              </button>

              <button
                onClick={() => {
                  setOfficerDecision('Disqualified');
                  if (onLogAction) {
                    onLogAction({
                      date: new Date().toLocaleString(),
                      bidder: selectedBidder.companyName,
                      tender: selectedTender.id,
                      result: `${selectedBidder.score}% (Disqualified)`,
                      action: 'Disqualified by Procurement Officer'
                    });
                  }
                }}
                className={`py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  officerDecision === 'Disqualified' 
                    ? 'bg-rose-600 text-white border-rose-600 shadow' 
                    : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50'
                }`}
              >
                <ThumbsDown className="w-4 h-4" /> Disqualify Bidder
              </button>
            </div>

            {officerDecision && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 font-semibold flex items-center justify-between animate-fadeIn">
                <span>Decision logged: <strong>{officerDecision}</strong> for {selectedBidder.companyName}</span>
                <span className="text-[11px] text-blue-700 font-bold">Audit Log Updated</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
