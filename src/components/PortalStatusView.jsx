import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Lock, 
  Play, 
  RefreshCw, 
  Terminal, 
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  Award,
  FileCheck,
  Users,
  Building2,
  FileText,
  CreditCard,
  TrendingUp,
  Rocket,
  Cpu
} from 'lucide-react';
import { govtGateway } from '../adapters/govtApi';

export default function PortalStatusView({ language = 'English' }) {
  const [gatewayMode, setGatewayMode] = useState(govtGateway.getMode());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState('pan');
  const [selectedEntityPreset, setSelectedEntityPreset] = useState('techcorp');
  const [customQueryInput, setCustomQueryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [testError, setTestError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Pre-configured Test Entities
  const TEST_ENTITIES = {
    techcorp: {
      name: 'TechCorp India Pvt Ltd',
      tag: 'Compliant (Class-I)',
      gstin: '07AAACT1020N1Z5',
      udyam: 'UDYAM-DL-01-0049281',
      cin: 'U72900DL2015PTC281904',
      pan: 'AAACT1020N',
      epfoCode: 'DLCPM0019284000',
      esicCode: '20000381920000999',
      dippNo: 'DIPP89124',
      sprsNo: 'NSIC/GP/DEL/2022/9481',
      oemName: 'Bharat Electronics / National OEM Partner'
    },
    surya: {
      name: 'Surya Green Energy Ltd',
      tag: 'Warning (Class-II)',
      gstin: '27AABCS9912B1Z8',
      udyam: 'UDYAM-MH-15-0038102',
      cin: 'U40106MH2018PLC309112',
      pan: 'AABCS9912B',
      epfoCode: 'MHBAN0028192000',
      esicCode: '31000928190000222',
      dippNo: 'N/A',
      sprsNo: 'NSIC/MUM/SPRS/2024/0912',
      oemName: 'Surya Solar Tech Panels Ltd'
    },
    apex: {
      name: 'Apex Global Hardware Ltd',
      tag: 'Debarred (GFR 151)',
      gstin: '07AAACA9921B1Z2',
      udyam: 'UDYAM-DL-03-0099412',
      cin: 'U30007DL2012PLC231890',
      pan: 'AAACA9921B',
      epfoCode: 'DLCPM0099182000',
      esicCode: '20000991820000111',
      dippNo: 'N/A',
      sprsNo: 'EXPIRED-2023',
      oemName: 'Generic Hardware OEM'
    }
  };

  // Official Government Gateway Connectivity Matrix Portals (Separated portals)
  const PORTAL_LIST = [
    {
      id: 'udyam',
      name: 'Udyam / MSME Registration',
      status: 'Connected',
      desc: 'Verifies MSME Registration, Enterprise Classification (Micro/Small/Medium) & GFR 153 tender fee/EMD exemptions',
      ministry: 'Ministry of MSME',
      endpoint: 'GET /verify/udyam-number',
      paramLabel: 'Udyam Registration No.',
      icon: Building2
    },
    {
      id: 'gstn',
      name: 'GST Registration & Filing',
      status: 'Connected',
      desc: 'Checks active GSTIN status, tax compliance rating, and GSTR-3B / GSTR-1 return filing regularity',
      ministry: 'Ministry of Finance / GSTN',
      endpoint: 'POST /returns/gstr3b',
      paramLabel: 'GSTIN',
      icon: FileText
    },
    {
      id: 'pan',
      name: 'PAN Verification Gateway',
      status: 'Connected',
      desc: 'Validates Permanent Account Number (PAN) authenticity, operative status, entity type, and Aadhaar linking',
      ministry: 'Income Tax Department / NSDL',
      endpoint: 'POST /pan/verify-status',
      paramLabel: 'PAN Number',
      icon: CreditCard
    },
    {
      id: 'itr',
      name: 'Income Tax (ITR) Compliance',
      status: 'Connected',
      desc: 'Validates 3-year turnover consistency, ITR-6 acknowledgments, and Form 3CA/CD tax audit compliance',
      ministry: 'Central Board of Direct Taxes (CBDT)',
      endpoint: 'POST /itr/turnover-verification',
      paramLabel: 'PAN / Assessment Year',
      icon: TrendingUp
    },
    {
      id: 'mii',
      name: 'Make in India / Local Content Requirements',
      status: 'Connected',
      desc: 'Validates Class-I (>=50%) or Class-II local supplier self-certification, BOM indigenous content %, and statutory CA audit',
      ministry: 'DPIIT / Ministry of Commerce & Industry',
      endpoint: 'POST /mii/v2/local-content-verify',
      paramLabel: 'Bidder Name / GSTIN',
      icon: Award
    },
    {
      id: 'epfo_esic',
      name: 'EPFO / ESIC Statutory Compliance',
      status: 'Connected',
      desc: 'Verifies Employees Provident Fund (EPFO ECR) and State Insurance (ESIC) monthly contributions, worker deposits & active payroll',
      ministry: 'Ministry of Labour & Employment',
      endpoint: 'POST /labour/v1/compliance-check',
      paramLabel: 'Establishment / ESIC Code',
      icon: Users
    },
    {
      id: 'startup_india',
      name: 'Startup India Recognition Portal',
      status: 'Connected',
      desc: 'Verifies DPIIT Startup Recognition Certificate for prior turnover & experience relaxation under GFR 173(i)',
      ministry: 'DPIIT / Ministry of Commerce & Industry',
      endpoint: 'POST /startup/v2/verify-recognition',
      paramLabel: 'Company Name / DIPP Ref',
      icon: Rocket
    },
    {
      id: 'nsic',
      name: 'NSIC Registration Portal',
      status: 'Connected',
      desc: 'Verifies NSIC Single Point Registration Scheme (SPRS) validity, monetary limits & stores category exemptions',
      ministry: 'National Small Industries Corporation (NSIC)',
      endpoint: 'POST /nsic/sprs/verify-certificate',
      paramLabel: 'Company Name / SPRS No.',
      icon: ShieldCheck
    },
    {
      id: 'oem_auth',
      name: 'OEM Authorization Gateway',
      status: 'Connected',
      desc: 'Verifies Manufacturer Authorization Form (MAF) directly with OEM repository to prevent gray-market/counterfeit bids',
      ministry: 'GeM Direct OEM Hub / Ministry of Commerce',
      endpoint: 'POST /oem/maf/verify-letter',
      paramLabel: 'Declared OEM / MAF Ref',
      icon: Cpu
    },
    {
      id: 'digilocker',
      name: 'DigiLocker / Document Verification',
      status: 'Connected',
      desc: 'Verifies digital cryptographic signatures, PKI certificate chains, and SHA-256 document tamper-proofing via National Exchange',
      ministry: 'MeitY / CCA India',
      endpoint: 'POST /file/verify-pki',
      paramLabel: 'Document SHA-256 Hash',
      icon: FileCheck
    },
    {
      id: 'cppp',
      name: 'CPPP Debarment & Blacklist Registry',
      status: 'Connected',
      desc: 'Searches 34 CPSE blacklists & debarment orders under GFR 2017 Rule 151 to prevent debarred vendor participation',
      ministry: 'Ministry of Finance / GeM',
      endpoint: 'POST /cppp/blacklist-check',
      paramLabel: 'Bidder Query (GSTIN/Name)',
      icon: AlertTriangle
    }
  ];

  // Subscribe to Gateway changes
  useEffect(() => {
    const unsubscribe = govtGateway.subscribe(() => {
      setGatewayMode(govtGateway.getMode());
    });
    return () => unsubscribe();
  }, []);

  // Update query input when selected portal or entity preset changes
  useEffect(() => {
    const portal = PORTAL_LIST.find(p => p.id === selectedPortal) || PORTAL_LIST[0];
    const currentEntity = TEST_ENTITIES[selectedEntityPreset];
    let val = '';
    if (portal.id === 'udyam') val = currentEntity.udyam;
    else if (portal.id === 'gstn') val = currentEntity.gstin;
    else if (portal.id === 'pan') val = currentEntity.pan;
    else if (portal.id === 'itr') val = currentEntity.pan;
    else if (portal.id === 'mii') val = `${currentEntity.name} (GSTIN: ${currentEntity.gstin})`;
    else if (portal.id === 'epfo_esic') val = currentEntity.epfoCode;
    else if (portal.id === 'startup_india') val = `${currentEntity.name} [${currentEntity.dippNo}]`;
    else if (portal.id === 'nsic') val = `${currentEntity.name} [SPRS: ${currentEntity.sprsNo}]`;
    else if (portal.id === 'oem_auth') val = `${currentEntity.oemName}`;
    else if (portal.id === 'digilocker') val = '8f4c2b9a76d1e430c5e62f0a1b9e8c7d';
    else if (portal.id === 'cppp') val = currentEntity.gstin;

    setCustomQueryInput(val);
  }, [selectedPortal, selectedEntityPreset]);

  // Open the Test Modal for a specific portal
  const handleOpenTestModal = (portalId) => {
    setSelectedPortal(portalId);
    setTestResult(null);
    setTestError(null);
    setIsModalOpen(true);
  };

  // Close Test Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTestResult(null);
    setTestError(null);
  };

  // Toggle Mode
  const handleModeToggle = (mode) => {
    govtGateway.setMode(mode);
    setGatewayMode(mode);
    setTestResult(null);
    setTestError(null);
  };

  // Run Test Query
  const runTestQuery = async () => {
    setIsLoading(true);
    setTestResult(null);
    setTestError(null);

    const param = customQueryInput.trim();
    const currentEntity = TEST_ENTITIES[selectedEntityPreset];

    try {
      let res;
      switch (selectedPortal) {
        case 'udyam':
          res = await govtGateway.verifyUdyam(param);
          break;
        case 'gstn':
          res = await govtGateway.verifyGstn(param);
          break;
        case 'pan':
          res = await govtGateway.verifyPan(param);
          break;
        case 'itr':
          res = await govtGateway.verifyItr(param);
          break;
        case 'mii':
          res = await govtGateway.verifyMiiLocalContent({ bidderName: currentEntity.name, gstin: currentEntity.gstin, query: param });
          break;
        case 'epfo_esic':
          res = await govtGateway.verifyEpfoEsic({ establishmentCode: param, esicCode: currentEntity.esicCode, companyName: currentEntity.name });
          break;
        case 'startup_india':
          res = await govtGateway.verifyStartupIndia({ companyName: currentEntity.name, dippNo: currentEntity.dippNo, gstin: currentEntity.gstin });
          break;
        case 'nsic':
          res = await govtGateway.verifyNsic({ companyName: currentEntity.name, sprsNo: currentEntity.sprsNo, gstin: currentEntity.gstin });
          break;
        case 'oem_auth':
          res = await govtGateway.verifyOemAuth({ declaredOem: currentEntity.oemName, companyName: currentEntity.name, gstin: currentEntity.gstin });
          break;
        case 'digilocker':
          res = await govtGateway.verifyDigiLockerDoc(param);
          break;
        case 'cppp':
          res = await govtGateway.verifyCpppDebarment({ gstin: currentEntity.gstin, companyName: currentEntity.name });
          break;
        default:
          res = await govtGateway.verifyUdyam(param);
      }
      setTestResult(res);
    } catch (err) {
      setTestError({
        message: err.message,
        isGovtAuthPending: err.isGovtAuthPending
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (testResult) {
      navigator.clipboard.writeText(JSON.stringify(testResult, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activePortal = PORTAL_LIST.find(p => p.id === selectedPortal) || PORTAL_LIST[0];

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* CLEAN HEADER                                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-700" /> 
            Official Government Gateway Connectivity Matrix
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            NexVerify connects directly with 11 official government databases to verify statutory registrations, tax compliance, and debarment status. Click <strong>Test API</strong> on any gateway to inspect the live response.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {PORTAL_LIST.length} / {PORTAL_LIST.length} Gateways Active
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* OFFICIAL GOVERNMENT GATEWAY CONNECTIVITY MATRIX               */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {PORTAL_LIST.map((portal) => {
          const Icon = portal.icon;
          return (
            <div 
              key={portal.id} 
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {portal.status}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <Icon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <h3 className="text-xs font-bold text-gray-900 leading-snug">{portal.name}</h3>
                </div>
                
                <p className="text-[11px] text-gray-500 leading-snug">{portal.desc}</p>
                
                <div className="text-[10px] text-blue-800/80 font-medium">
                  {portal.ministry}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                  Connected
                </span>
                <button
                  onClick={() => handleOpenTestModal(portal.id)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Test API</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TEST API MODAL / SLIDE WINDOW                                 */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b1b28] text-white w-full max-w-3xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Top Bar */}
            <div className="px-5 py-3.5 bg-[#07131c] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <div>
                  <h3 className="text-xs font-bold text-gray-100">{activePortal.name} — Test Console</h3>
                  <div className="text-[10px] text-gray-400 font-mono">{activePortal.endpoint} • {activePortal.ministry}</div>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              
              {/* ACTIVE ADAPTER ENGINE BUTTONS (WITHOUT ANY DESCRIPTION) */}
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-gray-300">ACTIVE ADAPTER ENGINE:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleModeToggle('MOCK')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      gatewayMode === 'MOCK'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 border border-emerald-400/40'
                        : 'bg-slate-800 text-gray-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${gatewayMode === 'MOCK' ? 'bg-emerald-200 animate-ping' : 'bg-gray-500'}`} />
                    <span>Mock Adapter Sandbox</span>
                    <span className="text-[9px] bg-black/30 px-1 py-0.2 rounded font-mono">DEMO</span>
                  </button>

                  <button
                    onClick={() => handleModeToggle('LIVE')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      gatewayMode === 'LIVE'
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40 border border-amber-400/40'
                        : 'bg-slate-800 text-gray-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    <Lock className="w-3 h-3 text-amber-300" />
                    <span>Live Govt Gateway</span>
                    <span className="text-[9px] bg-black/30 px-1 py-0.2 rounded font-mono">PROD</span>
                  </button>
                </div>
              </div>

              {/* Entity Scenario Preset Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400">Select Test Bidder Scenario:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {Object.entries(TEST_ENTITIES).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedEntityPreset(key)}
                      className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                        selectedEntityPreset === key
                          ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200 font-bold'
                          : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-gray-300'
                      }`}
                    >
                      <div className="truncate font-medium">{item.name}</div>
                      <div className="text-[10px] mt-0.5 flex items-center justify-between">
                        <span className="font-mono text-gray-400">{key === 'techcorp' ? 'TechCorp' : key === 'surya' ? 'Surya' : 'Apex'}</span>
                        <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                          key === 'techcorp' ? 'bg-emerald-500/20 text-emerald-300' :
                          key === 'surya' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-rose-500/20 text-rose-300'
                        }`}>
                          {item.tag}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Query Parameter Input & Execute Button */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    value={customQueryInput}
                    onChange={(e) => setCustomQueryInput(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    placeholder={`Enter ${activePortal.paramLabel}...`}
                  />
                </div>
                <button
                  onClick={runTestQuery}
                  disabled={isLoading || !customQueryInput.trim()}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Querying Portal...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Execute Query</span>
                    </>
                  )}
                </button>
              </div>

              {/* Response Console Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono min-h-[220px] max-h-[360px] overflow-y-auto">
                {isLoading && (
                  <div className="py-12 flex flex-col items-center justify-center space-y-2 text-cyan-400">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span className="text-xs text-gray-300">Connecting to {activePortal.name}...</span>
                    <span className="text-[10px] text-gray-500">Simulating network latency (280ms)</span>
                  </div>
                )}

                {testError && (
                  <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-lg text-rose-200 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-rose-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Live Government Gateway Notice</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-normal">
                      {testError.message}
                    </p>
                  </div>
                )}

                {testResult && !isLoading && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>200 OK — VERIFICATION SUCCESSFUL</span>
                      </div>
                      <button
                        onClick={handleCopyJson}
                        className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                      </button>
                    </div>

                    <pre className="text-emerald-300 text-[11px] leading-relaxed overflow-x-auto">
                      {JSON.stringify(testResult, null, 2)}
                    </pre>
                  </div>
                )}

                {!isLoading && !testResult && !testError && (
                  <div className="py-12 text-center text-gray-500 space-y-2">
                    <Terminal className="w-8 h-8 text-slate-700 mx-auto" />
                    <div className="text-xs text-gray-400">Ready to test {activePortal.name}</div>
                    <div className="text-[10px] text-gray-500">Click <strong>Execute Query</strong> to inspect the simulated response</div>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-[#07131c] border-t border-slate-800 flex items-center justify-between text-[11px] text-gray-400">
              <span className="font-mono">Adapter: {gatewayMode === 'MOCK' ? 'MockGovtAdapter (Sandbox)' : 'LiveGovtAdapter (Prod)'}</span>
              <button
                onClick={handleCloseModal}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-gray-200 rounded text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
