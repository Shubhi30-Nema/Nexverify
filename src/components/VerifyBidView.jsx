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
  Scale
} from 'lucide-react';
import { TENDERS, BIDDERS } from '../data/mockData';
import CompanyDataRepresentation from './CompanyDataRepresentation';
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
  const [hasVerified, setHasVerified] = useState(true);
  const [stepProgress, setStepProgress] = useState(6);
  const [officerDecision, setOfficerDecision] = useState(null);
  const [showJudgePitch, setShowJudgePitch] = useState(false);
  const [showCompanyAnalytics, setShowCompanyAnalytics] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'crosschecks', 'scoring', 'analytics'

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
    setHasVerified(true);
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
      {/* JUDGE PRESENTATION / QUICK PROTOTYPE GUIDE */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 rounded-2xl border border-blue-800/80 shadow-xl space-y-3">
        <div 
          className="flex items-center justify-between cursor-pointer select-none"
          onClick={() => setShowJudgePitch(!showJudgePitch)}
        >
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-extrabold text-white">
                NexVerify Prototype Engine: PaddleOCR 3.0 Multi-Document Reading & Harmonization
              </h3>
              <p className="text-[11px] text-slate-300 hidden sm:block">
                Click to toggle architectural summary on statutory document extraction and scoring.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono font-bold border border-amber-400/30">
              PROTOTYPE DEMO GUIDE
            </span>
            {showJudgePitch ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>
        </div>

        {showJudgePitch && (
          <div className="pt-2 border-t border-blue-800/60 space-y-3 text-xs leading-relaxed text-slate-200 animate-fadeIn">
            <p className="bg-slate-950/60 p-3 rounded-xl border border-blue-800/60">
              <strong className="text-amber-300 block font-bold mb-1">🎯 Automated Verification Workflow:</strong>
              This platform replaces weeks of manual procurement cross-checking. The AI uses <strong>PaddleOCR 3.0</strong> to read all technical bid documents (PDFs & photo scans), detects discrepancies across statutory portals, and generates an objective 100-point compliance score.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-blue-950/40 p-3 rounded-lg border border-blue-800/50">
                <span className="text-cyan-300 font-bold block mb-0.5">1. Multi-Doc OCR Parsing</span>
                Scans Udyam certificates, GST filings, PAN cards, MII affidavits, balance sheets, and OEM auth letters.
              </div>

              <div className="bg-blue-950/40 p-3 rounded-lg border border-blue-800/50">
                <span className="text-emerald-300 font-bold block mb-0.5">2. Pairwise Cross-Checking</span>
                Compares registration credentials within pairs of documents and all over the technical bid dossier.
              </div>

              <div className="bg-blue-950/40 p-3 rounded-lg border border-blue-800/50">
                <span className="text-amber-300 font-bold block mb-0.5">3. Composite Scoring & Analytics</span>
                Calculates individual document scores and provides visual bar graph data representations of company capacity.
              </div>
            </div>
          </div>
        )}
      </div>

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
                <> <ScanText className="w-4 h-4" /> {t('runPaddleOcrBtn', language)} </>
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
              <Loader2 className="w-4 h-4 text-blue-700 animate-spin" /> PaddleOCR 3.0 Scanning & Multi-Document Reconciliation...
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
                  <div className="text-xs font-semibold text-gray-600">PaddleOCR Composite Score</div>
                  <div className="text-3xl font-extrabold font-mono">
                    {selectedBidder.score} <span className="text-sm font-sans text-gray-500">/ 100 Pts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendation Summary */}
            <div className="mt-4 p-4 bg-white/90 rounded-lg border border-gray-200 text-xs space-y-1">
              <strong className="text-gray-900 block font-bold">PaddleOCR Scan Finding & AI Qualification Recommendation:</strong>
              <p className="text-gray-700 leading-relaxed">{selectedBidder.summary}</p>
            </div>

            {/* Actions: View Company Bar Graphs / Data Representation */}
            <div className="mt-4 pt-3 border-t border-gray-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-gray-600">
                Turnover: <strong>{selectedBidder.turnover}</strong> • MII Content: <strong>{selectedBidder.localContent}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCompanyAnalytics(!showCompanyAnalytics)}
                  className="px-3 py-1.5 bg-white hover:bg-gray-100 text-blue-900 font-bold rounded-lg border border-blue-300 shadow-2xs flex items-center gap-1.5 transition-colors"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-blue-700" />
                  {showCompanyAnalytics ? 'Hide Data Representation' : '📊 Show Company Data Representation (Bar Graphs)'}
                  {showCompanyAnalytics ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setShowAnalyticsModal(true)}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Full Company Analytics Page
                </button>
              </div>
            </div>
          </div>

          {/* Inline Company Data Representation / Bar Graph Section (Hidden by default, toggled by user) */}
          {showCompanyAnalytics && (
            <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-blue-200 shadow-sm animate-fadeIn">
              <div className="p-4 bg-white rounded-xl">
                <CompanyDataRepresentation bidder={selectedBidder} tender={selectedTender} />
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
                The PaddleOCR multi-document cross-checking engine identified discrepancies between submitted documents and statutory portals:
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

            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-2.5 px-1 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'analytics' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Bar Graphs & Company Data Representation
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

          {/* TAB 3: Full Company Analytics & Bar Graphs */}
          {activeTab === 'analytics' && (
            <CompanyDataRepresentation bidder={selectedBidder} tender={selectedTender} />
          )}

          {/* 7 Statutory Direct Portal Checks Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden font-sans">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 font-bold text-xs text-gray-800 flex items-center justify-between">
              <span>7 Statutory & Technical Verification Checks</span>
              <span className="text-gray-500 text-[11px]">Direct Government Portal Cross-Checks</span>
            </div>

            <div className="divide-y divide-gray-100">
              {selectedBidder.checks.map((check, idx) => {
                const isPass = check.status === 'Pass';
                const isWarn = check.status === 'Warning';
                return (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-gray-50">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-gray-900 flex items-center gap-2">
                        {isPass ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> :
                         isWarn ? <AlertCircle className="w-4 h-4 text-amber-600" /> :
                         <XCircle className="w-4 h-4 text-rose-600" />}
                        {check.name}
                      </div>
                      <p className="text-xs text-gray-600 pl-6">{check.detail}</p>
                    </div>

                    <span className={`px-2.5 py-1 rounded text-[11px] font-bold self-start sm:self-center ${
                      isPass ? 'bg-emerald-100 text-emerald-800' :
                      isWarn ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {check.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Procurement Officer Decision Module */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 font-sans">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Procurement Officer Decision (Final Qualification)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

      {/* Analytics Modal */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <CompanyDataRepresentation 
            bidder={selectedBidder} 
            tender={selectedTender} 
            isModal={true} 
            onClose={() => setShowAnalyticsModal(false)} 
          />
        </div>
      )}
    </div>
  );
}
