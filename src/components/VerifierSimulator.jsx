import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Loader2, 
  Globe, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Terminal,
  Sparkles,
  Lock
} from 'lucide-react';
import { SAMPLE_BIDDERS, PORTAL_GATEWAYS } from '../data/mockData';

export default function VerifierSimulator({ onSelectBidder, defaultBidderId }) {
  const [selectedBidderId, setSelectedBidderId] = useState(defaultBidderId || 'BID-88102');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: OCR, 2: Portals, 3: AI Engine, 4: Complete
  const [activePortalIndex, setActivePortalIndex] = useState(-1);
  const [terminalLogs, setTerminalLogs] = useState([]);

  const selectedBidder = SAMPLE_BIDDERS.find(b => b.bidId === selectedBidderId) || SAMPLE_BIDDERS[0];

  const steps = [
    { id: 1, title: 'Document Parsing & OCR Extraction', desc: 'Parsing uploaded PDFs, XMLs & extracting registration credentials.' },
    { id: 2, title: 'Multi-Portal API Verification Sync', desc: 'Direct queries to 10+ Government API gateways (Udyam, GSTN, IT, MCA, EPFO, CPPP).' },
    { id: 3, title: 'AI Discrepancy & MII Local Content Engine', desc: 'Cross-matching declared BOMs, tax filings, financial balance sheets & debarments.' },
    { id: 4, title: 'Compliance Score & Risk Classification', desc: 'Generating overall compliance rating, risk matrix, and officer decision prompt.' }
  ];

  const addLog = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setTerminalLogs(prev => [...prev, { time, msg, type }]);
  };

  const startVerificationProcess = () => {
    setIsRunning(true);
    setCurrentStep(1);
    setActivePortalIndex(-1);
    setTerminalLogs([]);

    addLog(`[INIT] Initializing NexVerify AI Compliance Engine for Bidder ${selectedBidder.bidId}...`, 'info');
    addLog(`[OCR] Parsing uploaded Technical Proposal & Financial Statements for ${selectedBidder.companyName}...`, 'info');

    // Step 1: OCR (1.5s)
    setTimeout(() => {
      addLog(`[OCR SUCCESS] Extracted Udyam: ${selectedBidder.udyamNo}, GSTIN: ${selectedBidder.gstin}, CIN: ${selectedBidder.cin}`, 'success');
      setCurrentStep(2);

      // Step 2: Portals sequential loop
      let portalIdx = 0;
      const portalInterval = setInterval(() => {
        if (portalIdx < PORTAL_GATEWAYS.length) {
          const portal = PORTAL_GATEWAYS[portalIdx];
          setActivePortalIndex(portalIdx);
          addLog(`[API SYNC] Querying ${portal.name} (${portal.endpoint})... LATENCY: ${portal.latency}`, 'portal');
          portalIdx++;
        } else {
          clearInterval(portalInterval);
          setCurrentStep(3);
          addLog(`[AI ENGINE] Analyzing Make in India BOM Declaration vs Component Import Certificates...`, 'info');

          // Step 3: AI Engine (2s)
          setTimeout(() => {
            if (selectedBidder.overallScore < 50) {
              addLog(`[CRITICAL ALERT] Debarment record found on CPPP Registry! Signature hash mismatch on OEM Auth certificate!`, 'error');
            } else if (selectedBidder.overallScore < 80) {
              addLog(`[WARNING] GSTR-3B filing delay detected. Declared MII (65%) differs from calculated BOM (51.8%).`, 'warn');
            } else {
              addLog(`[AI ENGINE VERIFIED] All 14 statutory checks passed with 100% hash authenticity.`, 'success');
            }

            setCurrentStep(4);
            setIsRunning(false);
            addLog(`[COMPLETE] Compliance Score: ${selectedBidder.overallScore}/100 | Risk Level: ${selectedBidder.riskLevel}`, 'success');
          }, 2000);
        }
      }, 300);

    }, 1500);
  };

  useEffect(() => {
    // Reset state on bidder change
    setCurrentStep(0);
    setTerminalLogs([]);
  }, [selectedBidderId]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Real-Time AI Verification Pipeline Simulator
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" /> AI Compliance Engine Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate automated extraction, multi-portal API cross-checks, and AI risk matrix calculation for GeM bids.
          </p>
        </div>

        {/* Bidder Switcher Dropdown */}
        <div className="flex items-center gap-3 bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold pl-2">Select Bidder to Test:</span>
          <select
            value={selectedBidderId}
            onChange={(e) => setSelectedBidderId(e.target.value)}
            disabled={isRunning}
            className="bg-slate-950 border border-slate-700 text-cyan-300 font-bold px-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500 cursor-pointer text-xs"
          >
            {SAMPLE_BIDDERS.map(b => (
              <option key={b.bidId} value={b.bidId}>
                {b.companyName} ({b.riskLevel})
              </option>
            ))}
          </select>

          <button
            onClick={startVerificationProcess}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
              isRunning 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            {isRunning ? (
              <> <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> Verifying... </>
            ) : (
              <> <Play className="w-4 h-4 fill-slate-950" /> Run AI Verifier Pipeline </>
            )}
          </button>
        </div>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Stepper & Active Process Monitor (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stepper progress */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              Pipeline Execution Steps
            </h3>

            <div className="space-y-4">
              {steps.map((step) => {
                const isDone = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                return (
                  <div 
                    key={step.id} 
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                      isCurrent 
                        ? 'bg-cyan-950/30 border-cyan-500/50 shadow-md shadow-cyan-500/5' 
                        : isDone 
                          ? 'bg-slate-900/40 border-slate-800/80 opacity-90' 
                          : 'bg-slate-950/40 border-slate-900 opacity-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      isDone 
                        ? 'bg-emerald-500 text-slate-950' 
                        : isCurrent 
                          ? 'bg-cyan-500 text-slate-950 animate-pulse' 
                          : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold ${isCurrent ? 'text-cyan-300' : isDone ? 'text-emerald-400' : 'text-slate-300'}`}>
                          {step.title}
                        </h4>
                        {isCurrent && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> Processing
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Government Portals Sync Matrix */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" /> Government Portals API Gateway Status Matrix
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {PORTAL_GATEWAYS.map((p, idx) => {
                const isActive = activePortalIndex === idx;
                const isPassed = activePortalIndex > idx || currentStep === 4;

                return (
                  <div
                    key={p.id}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isActive 
                        ? 'bg-cyan-500/20 border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20' 
                        : isPassed 
                          ? 'bg-emerald-950/20 border-emerald-800/50' 
                          : 'bg-slate-900/40 border-slate-800'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 font-mono truncate">{p.id.toUpperCase()}</div>
                    <div className={`text-xs font-bold mt-1 truncate ${
                      isActive ? 'text-cyan-300' : isPassed ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {p.name.split(' ')[0]}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{p.latency}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Terminal & Recommendation Output (1 col) */}
        <div className="space-y-6">
          {/* Live Output Terminal */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Live AI Terminal Stream
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl font-mono text-[11px] h-64 overflow-y-auto space-y-1.5 border border-slate-900">
              {terminalLogs.length === 0 ? (
                <div className="text-slate-600 italic text-center py-20">
                  Click "Run AI Verifier Pipeline" to start live verification...
                </div>
              ) : (
                terminalLogs.map((log, i) => (
                  <div key={i} className="leading-tight">
                    <span className="text-slate-600 font-sans mr-2">[{log.time}]</span>
                    <span className={
                      log.type === 'error' ? 'text-rose-400 font-bold' :
                      log.type === 'warn' ? 'text-amber-400' :
                      log.type === 'success' ? 'text-emerald-400 font-bold' :
                      log.type === 'portal' ? 'text-cyan-400' : 'text-slate-300'
                    }>
                      {log.msg}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Final Verification Summary Card */}
          {currentStep === 4 && (
            <div className={`p-6 rounded-2xl border shadow-2xl space-y-4 animate-scaleUp ${
              selectedBidder.overallScore > 80 
                ? 'bg-emerald-950/30 border-emerald-500/50' 
                : selectedBidder.overallScore > 50 
                  ? 'bg-amber-950/30 border-amber-500/50' 
                  : 'bg-rose-950/30 border-rose-500/50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Overall Verification Status
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  selectedBidder.overallScore > 80 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                  selectedBidder.overallScore > 50 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  {selectedBidder.riskLevel}
                </span>
              </div>

              <div>
                <div className="text-3xl font-extrabold font-mono text-white">
                  {selectedBidder.overallScore} <span className="text-sm text-slate-400 font-sans">/ 100 Score</span>
                </div>
                <div className="text-xs font-bold text-cyan-300 mt-1">
                  AI Recommendation: {selectedBidder.recommendation}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {selectedBidder.recommendationReason}
                </p>
              </div>

              <button
                onClick={() => onSelectBidder(selectedBidder)}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20"
              >
                Inspect Detailed 14-Point Statutory Audit <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
