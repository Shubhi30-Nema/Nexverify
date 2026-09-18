import React from 'react';
import { Globe, CheckCircle2 } from 'lucide-react';
import { PORTALS } from '../data/mockData';

export default function PortalStatusView() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-700" /> Integrated Government API Gateways
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          NexVerify directly connects with 8 official government databases to verify statutory registrations, tax compliance, and debarment status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PORTALS.map((portal, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {portal.status}
              </span>
            </div>

            <h3 className="text-xs font-bold text-gray-900">{portal.name}</h3>
            <p className="text-[11px] text-gray-500 leading-snug">{portal.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
