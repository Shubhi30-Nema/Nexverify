import React, { useState } from 'react';
import { 
  ScanText, 
  HelpCircle, 
  Layers, 
  Award, 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  ChevronDown,
  ChevronUp,
  Percent,
  X
} from 'lucide-react';

export default function AIScoringExplainer({ bidder, tender, isModal = false, onClose }) {
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  if (!bidder) return null;

  const docScores = bidder.documentScores || [];
  const ocrMetrics = bidder.paddleOcrMetrics || {
    engine: 'PaddleOCR v3.0 (PP-OCRv4 Multilingual)',
    avgConfidence: '99.5%',
    pagesScanned: 18,
    textBlocksDetected: 412,
    boundingPolyCount: 412,
    ocrLatency: '114ms / page'
  };

  return (
    <div className={`space-y-5 font-sans ${isModal ? 'bg-white p-6 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ScanText className="w-5 h-5 text-blue-700" />
            <h3 className="text-sm font-bold text-gray-900">
              PaddleOCR 3.0 & AI Scoring Methodology: {bidder.companyName}
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Transparent scoring formula and individual document-by-document evaluation breakdown.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFormulaModal(!showFormulaModal)}
            className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-bold border border-blue-200 flex items-center gap-1.5 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            {showFormulaModal ? 'Hide Scoring Math' : 'How AI Calculates Score'}
          </button>

          {isModal && onClose && (
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Formula & Weight Model Explanation Drawer */}
      {showFormulaModal && (
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white p-5 rounded-xl border border-blue-800/80 shadow-md space-y-4 animate-fadeIn text-xs">
          <div className="flex items-center justify-between border-b border-blue-800 pb-2">
            <span className="font-bold text-cyan-300 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" /> Objective 100-Point Composite Compliance Formula
            </span>
            <span className="font-mono text-[11px] text-slate-300">
              Deterministic Statutory Weighting
            </span>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-lg border border-blue-800 font-mono text-[11px] text-cyan-200 space-y-1">
            <div className="font-bold text-white">Composite Score Formula:</div>
            <div>Score = Σ (Doc_Weight_i - Statutory_Deductions_i) - Critical_Discrepancy_Penalties</div>
            <div className="text-[10px] text-slate-400 mt-1">
              Where individual document weights total 95 points, and 5 points are allocated for DigiLocker cryptographic signature integrity.
            </div>
          </div>

          {/* Statutory Weight Distribution Table */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center">
            <div className="bg-blue-900/40 p-2.5 rounded-lg border border-blue-700/60">
              <div className="text-[10px] text-slate-300 font-semibold">Udyam MSME</div>
              <div className="text-sm font-bold text-white font-mono mt-1">20 Pts</div>
              <div className="text-[9px] text-cyan-300">MSMED Act 2006</div>
            </div>

            <div className="bg-blue-900/40 p-2.5 rounded-lg border border-blue-700/60">
              <div className="text-[10px] text-slate-300 font-semibold">GSTR-3B Tax</div>
              <div className="text-sm font-bold text-white font-mono mt-1">20 Pts</div>
              <div className="text-[9px] text-cyan-300">CGST Act § 39</div>
            </div>

            <div className="bg-blue-900/40 p-2.5 rounded-lg border border-blue-700/60">
              <div className="text-[10px] text-slate-300 font-semibold">PAN & ITR-6</div>
              <div className="text-sm font-bold text-white font-mono mt-1">20 Pts</div>
              <div className="text-[9px] text-cyan-300">Income Tax § 139</div>
            </div>

            <div className="bg-blue-900/40 p-2.5 rounded-lg border border-blue-700/60">
              <div className="text-[10px] text-slate-300 font-semibold">MII Local Content</div>
              <div className="text-sm font-bold text-white font-mono mt-1">15 Pts</div>
              <div className="text-[9px] text-cyan-300">PPO 2017 Order</div>
            </div>

            <div className="bg-blue-900/40 p-2.5 rounded-lg border border-blue-700/60">
              <div className="text-[10px] text-slate-300 font-semibold">CPPP Debarment</div>
              <div className="text-sm font-bold text-white font-mono mt-1">10 Pts</div>
              <div className="text-[9px] text-cyan-300">GFR Rule 151(iii)</div>
            </div>

            <div className="bg-blue-900/40 p-2.5 rounded-lg border border-blue-700/60">
              <div className="text-[10px] text-slate-300 font-semibold">OEM Auth / License</div>
              <div className="text-sm font-bold text-white font-mono mt-1">10 Pts</div>
              <div className="text-[9px] text-cyan-300">DigiLocker Hash</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-800 text-[11px]">
              <strong className="text-emerald-300 block mb-0.5">80 - 100 Points: Low Risk</strong>
              Auto-recommended for approval and commercial bid opening.
            </div>

            <div className="p-2.5 rounded bg-amber-950/60 border border-amber-800 text-[11px]">
              <strong className="text-amber-300 block mb-0.5">60 - 79 Points: Medium Risk</strong>
              Borderline compliance. Request representation from bidder.
            </div>

            <div className="p-2.5 rounded bg-rose-950/60 border border-rose-800 text-[11px]">
              <strong className="text-rose-300 block mb-0.5">0 - 59 Points: High Risk</strong>
              Critical failure / statutory violation. Disqualification.
            </div>
          </div>
        </div>
      )}

      {/* PaddleOCR Hardware / Engine Runtime Metrics */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <span className="text-gray-500 block">OCR Recognition Engine</span>
          <strong className="text-blue-900 font-mono">{ocrMetrics.engine}</strong>
        </div>
        <div>
          <span className="text-gray-500 block">Average Text Confidence</span>
          <strong className="text-emerald-700 font-mono">{ocrMetrics.avgConfidence}</strong>
        </div>
        <div>
          <span className="text-gray-500 block">Bounding Boxes Detected</span>
          <strong className="text-gray-900 font-mono">{ocrMetrics.boundingPolyCount} Text Blocks</strong>
        </div>
        <div>
          <span className="text-gray-500 block">OCR Pipeline Latency</span>
          <strong className="text-purple-900 font-mono">{ocrMetrics.ocrLatency}</strong>
        </div>
      </div>

      {/* Individual Document Score Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            Document-by-Document Score & Deduction Breakdown ({docScores.length} Scanned Documents)
          </h4>
          <span className="text-xs font-mono font-bold text-gray-900">
            Cumulative Total: {bidder.score} / 100 Pts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {docScores.map((ds, idx) => {
            const isPass = ds.status === 'Pass';
            const isWarn = ds.status === 'Warning';
            const pct = Math.round((ds.score / ds.maxScore) * 100);

            return (
              <div 
                key={idx}
                className={`p-4 rounded-xl border space-y-2.5 text-xs transition-shadow hover:shadow-xs ${
                  isPass ? 'bg-emerald-50/40 border-emerald-200' :
                  isWarn ? 'bg-amber-50/40 border-amber-200' :
                  'bg-rose-50/40 border-rose-200'
                }`}
              >
                {/* Header: Name and Score */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-gray-900 text-xs">{ds.doc}</div>
                    <span className="text-[10px] text-gray-500 font-mono">{ds.type}</span>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                      isPass ? 'bg-emerald-100 text-emerald-800' :
                      isWarn ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {ds.score} / {ds.maxScore} Pts
                    </span>
                    <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                      {pct}% Weight
                    </div>
                  </div>
                </div>

                {/* Score Progress Bar */}
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      isPass ? 'bg-emerald-600' : isWarn ? 'bg-amber-500' : 'bg-rose-600'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* OCR Extracted Data */}
                {ds.ocrExtracted && (
                  <div className="p-2 bg-white rounded border border-gray-200 font-mono text-[10px] text-gray-800">
                    <strong className="text-blue-900 block font-sans mb-0.5">PaddleOCR Scanned Text:</strong>
                    {ds.ocrExtracted}
                  </div>
                )}

                {/* Scoring Rationale & Deduction Reason */}
                <div className="text-[11px] leading-relaxed">
                  <strong className="text-gray-700">Scoring Engine Finding: </strong>
                  <span className={isPass ? 'text-gray-600' : isWarn ? 'text-amber-900 font-semibold' : 'text-rose-900 font-semibold'}>
                    {ds.deductionReason}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
