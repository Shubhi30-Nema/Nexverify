import React from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  Zap,
  Cpu,
  ScanText,
  Award,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import { t } from '../data/translations';

export default function DashboardView({ onNavigateVerify, onNavigateUpload, language = 'English' }) {
  return (
    <div className="space-y-6 font-sans">
      {/* Hero Welcome & Quick Actions */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200 mb-2">
            <Cpu className="w-3.5 h-3.5 text-blue-700" /> {t('heroBadge', language)}
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">
            {t('heroTitle', language)}
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            {t('heroDesc', language)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateUpload}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <UploadCloud className="w-4 h-4" /> {t('uploadScanBtn', language)}
          </button>
          <button
            onClick={onNavigateVerify}
            className="px-4 py-2 bg-blue-950 hover:bg-black text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Zap className="w-4 h-4 text-cyan-400" /> {t('runVerifierBtn', language)}
          </button>
        </div>
      </div>

      {/* Top KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">{t('totalBidsScanned', language)}</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">1,420 Bids</div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {t('bidsScannedSub', language)}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">{t('paddleOcrAccuracy', language)}</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <ScanText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">99.6%</div>
          <div className="text-[11px] text-gray-600">
            {t('paddleOcrAccuracySub', language)}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">{t('highRiskFlags', language)}</span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">34 Bids</div>
          <div className="text-[11px] text-rose-600 font-semibold">
            {t('highRiskFlagsSub', language)}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">{t('paddleOcrSpeed', language)}</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">114ms / page</div>
          <div className="text-[11px] text-amber-700 font-semibold">
            {t('paddleOcrSpeedSub', language)}
          </div>
        </div>
      </div>
    </div>
  );
}

