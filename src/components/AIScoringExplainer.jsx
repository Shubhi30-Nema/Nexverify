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
  X,
  Ban,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Scale,
  Check
} from 'lucide-react';
import { calculateBidderRisk, MANDATORY_DOCUMENTS, REMAINING_7_DOCUMENTS, BLACKLIST_RISK_THRESHOLD } from '../utils/scoringEngine';

export default function AIScoringExplainer({ bidder, tender, isModal = false, onClose }) {
  const [showFormulaModal, setShowFormulaModal] = useState(true);
  const [activeTab, setActiveTab] = useState('formula'); // 'formula' | 'mandatory' | 'remaining7'

  if (!bidder) return null;

  // Compute or read risk evaluation from scoring engine
  const evalResult = bidder.riskEvaluation || calculateBidderRisk(bidder, tender);
  const isBlacklisted = evalResult.isBlacklisted;
  const hasMandatoryMistake = evalResult.hasMandatoryMistake;
  const riskScore = evalResult.calculatedRiskScore;
  const ocrMetrics = bidder.aiOcrMetrics || {
    engine: 'AI Statutory OCR Engine v4.2',
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
            <Calculator className="w-5 h-5 text-blue-700" />
            <h3 className="text-sm font-bold text-gray-900">
              Statutory Risk & Scoring Math Engine: {bidder.companyName}
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            4 Mandatory Docs Zero-Mistake Check • 7 Remaining Docs Equal Priority (14.29%) • 55% Blacklist Threshold
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFormulaModal(!showFormulaModal)}
            className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-bold border border-blue-200 flex items-center gap-1.5 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            {showFormulaModal ? 'Hide Mathematical Formula' : 'Show Mathematical Formula'}
          </button>

          {isModal && onClose && (
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mathematical Blacklist Status Overview Bar */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs ${
        isBlacklisted ? 'bg-rose-50 border-rose-300 text-rose-950' : 'bg-emerald-50 border-emerald-300 text-emerald-950'
      }`}>
        <div className="flex items-center gap-3">
          {isBlacklisted ? (
            <Ban className="w-6 h-6 text-rose-600 flex-shrink-0" />
          ) : (
            <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          )}
          <div>
            <div className="font-extrabold text-sm flex items-center gap-2">
              <span>{isBlacklisted ? 'AUTOMATICALLY BLACKLISTED' : 'COMPLIANT & ELIGIBLE FOR SELECTION'}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                isBlacklisted ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {isBlacklisted ? 'SELECTION PROHIBITED' : 'SELECTABLE'}
              </span>
            </div>
            <p className="text-[11px] mt-0.5 text-gray-700">
              {isBlacklisted ? (
                <>
                  Trigger:{' '}
                  <strong>
                    {hasMandatoryMistake && riskScore >= BLACKLIST_RISK_THRESHOLD
                      ? 'Mandatory Doc Mistake + Risk Score ≥ 55%'
                      : hasMandatoryMistake
                      ? 'Mistake detected in Mandatory Documents (ITR/GST/Udyam/PAN)'
                      : `Mathematical Risk Score (${riskScore}%) exceeds 55% threshold`}
                  </strong>
                </>
              ) : (
                'All 4 mandatory documents 100% verified without mistake; Mathematical Risk Score is safe (< 55%).'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Mathematical Risk Score</div>
            <div className={`text-2xl font-mono font-extrabold ${isBlacklisted ? 'text-rose-700' : 'text-emerald-700'}`}>
              {riskScore}%
            </div>
          </div>
          <div className="border-l border-gray-300 pl-3 text-left">
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Threshold Limit</div>
            <div className="text-sm font-mono font-bold text-gray-800">
              &ge; 55.0%
            </div>
          </div>
        </div>
      </div>

      {/* Formula & Weight Model Explanation Drawer */}
      {showFormulaModal && (
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 rounded-xl border border-blue-800/80 shadow-md space-y-4 animate-fadeIn text-xs">
          <div className="flex items-center justify-between border-b border-blue-800 pb-2">
            <span className="font-bold text-cyan-300 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" /> Mathematical Risk Formulation (11 Documents Dossier)
            </span>
            <span className="font-mono text-[11px] text-slate-300">
              Deterministic Statutory Math
            </span>
          </div>

          {/* Core Mathematical Formulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Rule 1: Mandatory Zero Mistake */}
            <div className="p-3 bg-slate-950/80 rounded-lg border border-rose-800/70 space-y-1.5 font-mono text-[11px]">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 font-sans">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Rule 1: 4 Mandatory Documents (ITR, GST, Udyam, PAN)
              </div>
              <div className="text-cyan-200">
                IF mistake(ITR) OR mistake(GST) OR mistake(Udyam) OR mistake(PAN) == TRUE
              </div>
              <div className="text-rose-400 font-bold">
                &rArr; Blacklist = TRUE (Instant Statutory Debarment)
              </div>
              <div className="text-[10px] text-slate-400 font-sans mt-1">
                Zero tolerance for errors in cross-checks or document verification of statutory identity.
              </div>
            </div>

            {/* Rule 2: 7 Remaining Equal Priority Docs */}
            <div className="p-3 bg-slate-950/80 rounded-lg border border-cyan-800/70 space-y-1.5 font-mono text-[11px]">
              <div className="text-cyan-300 font-bold flex items-center gap-1.5 font-sans">
                <Scale className="w-4 h-4 text-cyan-400" />
                Rule 2: 7 Remaining Documents (Equal Weight 1/7 each)
              </div>
              <div className="text-cyan-200">
                Compliance Score = (1/7) * &Sigma; (Score_i)
              </div>
              <div className="text-amber-300 font-bold">
                Risk Score (%) = 100% - Compliance Score = (1/7) * &Sigma; (100 - Score_i)
              </div>
              <div className="text-rose-400 font-bold">
                IF Risk Score &ge; 55.0% &rArr; Blacklist = TRUE
              </div>
            </div>
          </div>

          {/* Equal Weight Distribution for the 7 Docs */}
          <div>
            <span className="text-[11px] font-bold text-slate-300 block mb-2">
              Equal Weight Distribution of Remaining 7 Documents (100% / 7 = 14.2857% each):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-[10px]">
              {REMAINING_7_DOCUMENTS.map((doc, idx) => (
                <div key={idx} className="bg-blue-900/40 p-2 rounded-lg border border-blue-700/60 flex flex-col justify-between">
                  <div className="text-slate-300 font-semibold">{doc.shortCode}</div>
                  <div className="text-xs font-bold text-cyan-300 font-mono my-1">14.29%</div>
                  <div className="text-[9px] text-slate-400">w_{idx + 1} = 1/7</div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Bidder Calculation Result Box */}
          <div className="p-3 bg-slate-950/90 rounded-lg border border-blue-800 font-mono text-[11px] space-y-1">
            <div className="text-slate-400 text-[10px] font-sans font-semibold">Live Evaluation for {bidder.companyName}:</div>
            <div className="text-cyan-300">
              Remaining 7 Docs Compliance Score: <strong>{evalResult.remainingComplianceScore}%</strong>
            </div>
            <div className="text-amber-300">
              Calculated Mathematical Risk Score: <strong>100% - {evalResult.remainingComplianceScore}% = {riskScore}%</strong>
            </div>
            <div className="text-slate-300 font-sans text-[11px] pt-1 border-t border-slate-800">
              Result: {riskScore >= 55 ? (
                <span className="text-rose-400 font-bold">
                  ❌ Exceeds 55% threshold &rArr; Blacklisted. Officer selection prohibited.
                </span>
              ) : (
                <span className="text-emerald-400 font-bold">
                  ✓ Safe margin below 55% threshold &rArr; Selectable by procurement officer.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: 4 MANDATORY STATUTORY DOCUMENTS AUDIT */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden font-sans">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-700" />
              1. Four Mandatory Statutory Documents (Zero Mistake Tolerance)
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              ITR, GST, Udyam, PAN — Any discrepancy in verification or pairwise cross-check results in instant automatic blacklisting.
            </p>
          </div>
          <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono self-start sm:self-auto ${
            hasMandatoryMistake ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}>
            {hasMandatoryMistake ? 'MISTAKE DETECTED (BLACKLISTED)' : 'ALL 4 VERIFIED (PASS)'}
          </span>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {evalResult.mandatoryAudit.map((doc, idx) => {
            const isMistake = doc.isMistake;
            return (
              <div key={idx} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isMistake ? 'bg-rose-50/60' : 'hover:bg-gray-50'
              }`}>
                <div className="space-y-1">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    {isMistake ? (
                      <Ban className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    )}
                    <span>{doc.name}</span>
                    <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-mono text-[10px]">
                      {doc.shortCode}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono">
                    Statute: {doc.statute} • Value: {doc.extractedValue || 'N/A'}
                  </div>
                  <p className={`text-[11px] pl-6 ${isMistake ? 'text-rose-900 font-semibold' : 'text-gray-600'}`}>
                    {doc.details}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`inline-block px-2.5 py-1 rounded font-bold font-mono text-[11px] ${
                    isMistake ? 'bg-rose-600 text-white shadow-2xs' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {isMistake ? 'MISTAKE / FAIL' : 'VERIFIED PASS'}
                  </span>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {isMistake ? 'Triggers Blacklist' : 'Zero Error'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: 7 REMAINING DOCUMENTS MATHEMATICAL BREAKDOWN (EQUAL PRIORITY 14.29%) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden font-sans space-y-3 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-700" />
              2. Seven Remaining Documents Mathematical Calculation (Equal Priority: 14.2857% Each)
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Each document score S_i contributes equally to the compliance score and defect risk.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-blue-900">
              Total Risk Contribution: {riskScore}%
            </span>
          </div>
        </div>

        {/* Table of 7 Documents */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100 text-gray-800 font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">Remaining Document (i)</th>
                <th className="p-3">Score (S_i)</th>
                <th className="p-3">Equal Weight (w_i)</th>
                <th className="p-3">Weighted Pts</th>
                <th className="p-3">Risk Contribution</th>
                <th className="p-3 text-right">Finding / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {evalResult.remaining7Audit.map((doc, idx) => {
                const isPass = doc.score >= 80;
                const isWarn = doc.score >= 50 && doc.score < 80;

                return (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{doc.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{doc.statute}</div>
                    </td>

                    <td className="p-3 font-mono font-bold">
                      <span className={isPass ? 'text-emerald-700' : isWarn ? 'text-amber-700' : 'text-rose-700'}>
                        {doc.score}
                      </span>
                      <span className="text-gray-400 text-[10px]"> / 100</span>
                    </td>

                    <td className="p-3 font-mono text-gray-600">
                      14.29%
                    </td>

                    <td className="p-3 font-mono text-gray-800 font-semibold">
                      {doc.weightedPoints} pts
                    </td>

                    <td className="p-3 font-mono text-rose-700 font-semibold">
                      +{doc.riskContribution}%
                    </td>

                    <td className="p-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        isPass ? 'bg-emerald-100 text-emerald-800' :
                        isWarn ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {doc.status}
                      </span>
                      <div className="text-[10px] text-gray-500 mt-0.5 max-w-[200px] ml-auto">
                        {doc.notes}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-50 font-bold border-t border-gray-200">
              <tr>
                <td className="p-3 text-gray-800">Mathematical Totals:</td>
                <td className="p-3 font-mono text-gray-700">-</td>
                <td className="p-3 font-mono text-gray-700">100.0%</td>
                <td className="p-3 font-mono text-emerald-700">{evalResult.remainingComplianceScore} pts</td>
                <td className="p-3 font-mono text-rose-700">{riskScore}% Risk</td>
                <td className="p-3 text-right font-mono">
                  {riskScore >= 55 ? (
                    <span className="text-rose-700 font-extrabold">&ge; 55% (Blacklist Triggered)</span>
                  ) : (
                    <span className="text-emerald-700 font-extrabold">&lt; 55% (Eligible)</span>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Hardware / Engine Metrics */}
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
          <span className="text-gray-500 block">OCR Latency</span>
          <strong className="text-purple-900 font-mono">{ocrMetrics.ocrLatency}</strong>
        </div>
      </div>
    </div>
  );
}
