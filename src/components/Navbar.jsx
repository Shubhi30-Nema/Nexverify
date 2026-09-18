import React, { useState } from 'react';
import { 
  CheckSquare, 
  FileText, 
  Globe, 
  History, 
  User, 
  UploadCloud, 
  LayoutDashboard, 
  LogOut,
  Search,
  ChevronDown,
  Bell,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  X,
  Check,
  Image as ImageIcon,
  Edit3,
  Trash2,
  Zap,
  Info
} from 'lucide-react';
import { t } from '../data/translations';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  onLogout,
  notifications = [],
  onMarkAllRead,
  onClearNotifications,
  darkMode = false,
  onToggleDarkMode,
  language = 'English',
  onLanguageChange,
  onSelectVerifyBidder
}) {
  const [fontSize, setFontSize] = useState('A');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  // Search Bar State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchPopover, setShowSearchPopover] = useState(false);

  // Custom Logo State & URL Modal
  const [customLogoUrl, setCustomLogoUrl] = useState('');
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [tempLogoInput, setTempLogoInput] = useState('');

  // Notification Dropdown Popover State
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  // Search Items Index for Live Dropdown Navigation
  const SEARCH_ITEMS = [
    { id: 's1', title: 'GEM/2026/B/582910 — Laptops & Workstations', category: 'GeM Tender', desc: '500 Units Laptops & Desktop Workstations', tab: 'verify', tenderId: 'GEM/2026/B/582910' },
    { id: 's2', title: 'GEM/2026/B/948211 — Solar Rooftop Power Plant', category: 'GeM Tender', desc: 'Supply & Commissioning 500kW Solar Plant', tab: 'verify', tenderId: 'GEM/2026/B/948211' },
    { id: 's3', title: 'GEM/2026/B/441029 — ICU Monitors & Ventilators', category: 'GeM Tender', desc: 'Medical Grade Multi-Para Monitors', tab: 'verify', tenderId: 'GEM/2026/B/441029' },
    { id: 's4', title: 'GEM/2026/B/771204 — EV Fast Charging Station', category: 'GeM Tender', desc: 'Public EV Charging Infrastructure', tab: 'verify', tenderId: 'GEM/2026/B/771204' },
    { id: 's5', title: 'TechCorp India Pvt Ltd', category: 'Bidder', desc: 'GSTIN: 07AAACT1020N1Z5 • 96% Score (Low Risk)', tab: 'verify', bidderId: 'BID-101', tenderId: 'GEM/2026/B/582910' },
    { id: 's6', title: 'Surya Green Energy Ltd', category: 'Bidder', desc: 'GSTIN: 27AABCS9912B1Z8 • 84% Score (Medium Risk)', tab: 'verify', bidderId: 'BID-102', tenderId: 'GEM/2026/B/582910' },
    { id: 's7', title: 'Apex Global Hardware Ltd', category: 'Bidder', desc: 'CPPP Debarred • Disqualified (32%)', tab: 'verify', bidderId: 'BID-103', tenderId: 'GEM/2026/B/582910' },
    { id: 's8', title: 'Upload & Scan Tender Documents', category: 'Feature', desc: 'PaddleOCR PDF & JPG Auto-Analysis Tool', tab: 'upload' },
    { id: 's9', title: 'Government API Portals Live Status', category: 'Monitoring', desc: 'Udyam, GSTN, MCA21, EPFO, CPPP, DigiLocker', tab: 'portals' },
    { id: 's10', title: 'Real-Time Compliance Audit Ledger Log', category: 'Audit', desc: 'Immutable Time-Stamped Officer Decision Logs', tab: 'audit' }
  ];

  const matchingSearchResults = searchQuery.trim() === '' 
    ? [] 
    : SEARCH_ITEMS.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchResultClick = (item) => {
    if (item.bidderId || item.tenderId) {
      if (onSelectVerifyBidder) {
        onSelectVerifyBidder(item.bidderId, item.tenderId);
      } else {
        setActiveTab(item.tab);
      }
    } else {
      setActiveTab(item.tab);
    }
    setSearchQuery('');
    setShowSearchPopover(false);
  };

  const tabs = [
    { id: 'dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
    { id: 'verify', labelKey: 'verify', icon: CheckSquare },
    { id: 'upload', labelKey: 'upload', icon: UploadCloud },
    { id: 'tenders', labelKey: 'tenders', icon: FileText },
    { id: 'portals', labelKey: 'portals', icon: Globe },
    { id: 'audit', labelKey: 'audit', icon: History }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Dynamic Root Font Size Scaling (A-, A, A+)
  const handleFontSizeChange = (size) => {
    setFontSize(size);
    if (size === 'A-') {
      document.documentElement.style.fontSize = '14px';
    } else if (size === 'A+') {
      document.documentElement.style.fontSize = '18px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
  };

  const handleSaveLogoUrl = (e) => {
    e.preventDefault();
    setCustomLogoUrl(tempLogoInput.trim());
    setShowLogoModal(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCustomLogoUrl(uploadEvent.target.result);
        setShowLogoModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />;
      case 'warning':
        return <Info className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'tender':
        return <FileText className="w-4 h-4 text-blue-400 shrink-0" />;
      case 'audit':
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
    }
  };

  return (
    <header className="w-full font-sans shadow-lg select-none relative z-40">
      {/* ------------------------------------------------------------- */}
      {/* TOP UTILITY HEADER BAR (Official GeM Style: Dark Navy #061923) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#061923] text-gray-300 px-4 py-1 text-[11px] border-b border-[#0d2a3a] flex flex-wrap justify-between items-center font-medium">
        {/* Left Side: Accessibility & Language Options */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-gray-300">
          
          {/* INTERACTIVE ENGLISH / HINDI LANGUAGE SELECTOR DROPDOWN (CLEAN STYLING) */}
          <div className="relative">
            <button 
              onClick={() => setShowLangDropdown(prev => !prev)}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded border border-slate-600 text-xs font-bold text-slate-100"
              title="Change System Language (English / हिंदी)"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'Hindi' ? 'हिंदी (Hindi)' : 'English'}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {showLangDropdown && (
              <div className="absolute left-0 top-7 w-36 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 overflow-hidden text-xs py-1 animate-fadeIn">
                <button
                  onClick={() => {
                    if (onLanguageChange) onLanguageChange('English');
                    setShowLangDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    language === 'English' ? 'text-cyan-300 font-bold bg-slate-800/90' : 'text-gray-200'
                  }`}
                >
                  <span>English</span>
                  {language === 'English' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>

                <button
                  onClick={() => {
                    if (onLanguageChange) onLanguageChange('Hindi');
                    setShowLangDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    language === 'Hindi' ? 'text-cyan-300 font-bold bg-slate-800/90' : 'text-gray-200'
                  }`}
                >
                  <span>हिंदी (Hindi)</span>
                  {language === 'Hindi' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              </div>
            )}
          </div>

          <span className="text-gray-600">|</span>

          {/* DYNAMIC GLOBAL DARK MODE TOGGLE BUTTON */}
          <button 
            onClick={onToggleDarkMode} 
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all ${
              darkMode 
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold' 
                : 'hover:text-white text-gray-300'
            }`}
            title="Toggle Dark Mode (Black Theme)"
          >
            <span className={`w-2.5 h-2.5 rounded-full inline-block ${darkMode ? 'bg-amber-400 animate-pulse' : 'bg-slate-400'}`}></span>
            <span>{t('darkMode', language)}</span>
            <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-extrabold ${darkMode ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>
              {darkMode ? 'ON' : 'OFF'}
            </span>
          </button>

          <span className="text-gray-600">|</span>

          {/* INTERACTIVE FONT SIZE SCALING BUTTONS (A-, A, A+) */}
          <div className="flex items-center space-x-1 text-[10px] font-bold">
            <span>{t('fontSize', language)}</span>
            <button 
              onClick={() => handleFontSizeChange('A-')} 
              className={`px-1.5 py-0.5 rounded hover:bg-slate-800 hover:text-white transition-colors ${fontSize === 'A-' ? 'text-cyan-300 bg-slate-800 font-extrabold border border-cyan-500/40' : 'text-gray-300'}`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button 
              onClick={() => handleFontSizeChange('A')} 
              className={`px-1.5 py-0.5 rounded hover:bg-slate-800 hover:text-white transition-colors ${fontSize === 'A' ? 'text-cyan-300 bg-slate-800 font-extrabold border border-cyan-500/40' : 'text-gray-300'}`}
              title="Default Font Size"
            >
              A
            </button>
            <button 
              onClick={() => handleFontSizeChange('A+')} 
              className={`px-1.5 py-0.5 rounded hover:bg-slate-800 hover:text-white transition-colors ${fontSize === 'A+' ? 'text-cyan-300 bg-slate-800 font-extrabold border border-cyan-500/40' : 'text-gray-300'}`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          <span className="text-gray-600 hidden md:inline">|</span>

          {/* WORKING SKIP TO MAIN CONTENT BUTTON */}
          <button 
            onClick={() => {
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden md:inline hover:text-white text-gray-300 hover:underline transition-colors cursor-pointer"
            title="Navigate directly to Dashboard main content"
          >
            {t('skipContent', language)}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN HEADER BRANDING BAR (GeM Deep Navy #082232)             */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#082232] text-white px-4 py-3 border-b border-[#0d3148]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* LEFT: LOGO PLACEHOLDER + Separation Line + NextVerifier Logo */}
          <div className="flex items-center">
            
            {/* USER CUSTOM LOGO PLACEHOLDER CONTAINER */}
            <div className="relative group">
              <div 
                className="flex items-center cursor-pointer min-h-[44px]" 
                onClick={() => setShowLogoModal(true)}
                title="Click to insert or change logo image"
              >
                {customLogoUrl ? (
                  <img 
                    src={customLogoUrl} 
                    alt="Custom Organization Logo Placeholder" 
                    className="h-11 max-w-[200px] object-contain shrink-0" 
                  />
                ) : (
                  <div className="flex items-center gap-2 border-2 border-dashed border-cyan-400/60 bg-blue-950/70 hover:bg-blue-900/90 px-3 py-1.5 rounded-xl transition-all shadow-inner">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-extrabold text-cyan-300 tracking-wide uppercase flex items-center gap-1">
                        <span>{t('yourLogoHere', language)}</span>
                        <Edit3 className="w-3 h-3 text-cyan-400 opacity-70 group-hover:opacity-100" />
                      </div>
                      <div className="text-[9px] text-blue-200">{t('clickInsertLogo', language)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* STRAIGHT VERTICAL SEPARATION LINE */}
            <div className="h-10 w-[2px] bg-slate-400/50 mx-4 sm:mx-5 shrink-0" />

            {/* NextVerifier Branding Logo */}
            <div 
              className="flex items-center space-x-2.5 cursor-pointer group" 
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center font-bold shadow-md border border-cyan-400/30 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    NextVerifier
                  </span>
                  <span className="text-[9px] bg-blue-700/80 text-cyan-200 border border-blue-500/40 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    ENGINE
                  </span>
                </div>
                <p className="text-[10px] text-blue-200 font-medium">
                  {t('subHeaderDesc', language)}
                </p>
              </div>
            </div>

          </div>

          {/* CENTER: INTERACTIVE GeM SEARCH BAR WITH AUTOCOMPLETION & DIRECT NAVIGATION */}
          <div className="w-full md:w-auto flex-1 max-w-md mx-2 relative z-50">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchPopover(true);
                }}
                onFocus={() => setShowSearchPopover(true)}
                placeholder={t('searchPlaceholder', language)}
                className="w-full pl-4 pr-10 py-1.5 bg-white text-gray-800 rounded-full text-xs font-medium shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* SEARCH AUTOCOMPLETE POPOVER DROPDOWN */}
            {showSearchPopover && searchQuery.trim() !== '' && (
              <div className="absolute left-0 right-0 top-9 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-2.5 space-y-1.5 z-50 max-h-80 overflow-y-auto animate-fadeIn scrollbar-none">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex justify-between items-center">
                  <span>Search Results ({matchingSearchResults.length})</span>
                  <button onClick={() => setShowSearchPopover(false)} className="hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {matchingSearchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No matching tenders, bidders, or portal features found.
                  </div>
                ) : (
                  matchingSearchResults.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleSearchResultClick(item)}
                      className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-blue-900/90 border border-slate-700/60 hover:border-cyan-500/50 cursor-pointer transition-all space-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-cyan-300">{item.title}</span>
                        <span className="text-[9px] bg-slate-950 text-cyan-400 border border-slate-700 px-1.5 py-0.2 rounded font-mono font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-300">{item.desc}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Officer Access Status */}

          <div className="flex items-center space-x-3 text-xs font-semibold">
            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-[#05151e] px-3 py-1.5 rounded-lg border border-blue-800 text-xs">
                <User className="w-4 h-4 text-cyan-400" />
                <div className="text-left">
                  <div className="text-white font-bold text-[11px] leading-none">{currentUser.name}</div>
                  <div className="text-[9px] text-blue-300 font-medium">{currentUser.department}</div>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="ml-1 p-1 rounded hover:bg-blue-800 text-blue-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs transition-colors shadow flex items-center gap-1"
              >
                <span>{t('officerLogin', language)}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* NAVIGATION TABS BAR & REAL-TIME NOTIFICATIONS                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#05141d] border-t border-[#133649] text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-0">
          
          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none py-0">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                    isActive
                      ? 'border-orange-500 text-white bg-[#092535] shadow-sm'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-blue-950/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span>{t(tab.labelKey, language)}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side Announcements & Dynamic Notification Bell */}
          <div className="flex items-center space-x-3 text-xs font-semibold py-1 pl-2 relative">
            <span className="hidden sm:flex items-center gap-1 bg-red-600/90 text-white px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
              <Sparkles className="w-3 h-3" /> {t('newOnGem', language)}
            </span>

            {/* DYNAMIC REAL-TIME NOTIFICATION BUTTON */}
            <div className="relative">
              <button
                onClick={() => setShowNotifPopover(!showNotifPopover)}
                className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                  showNotifPopover ? 'bg-blue-800 text-white' : 'text-gray-300 hover:text-white hover:bg-blue-900/60'
                }`}
                title="Real-Time System Notifications & Audit Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full min-w-[18px] h-4 flex items-center justify-center animate-pulse border border-slate-900">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* REAL-TIME NOTIFICATIONS DROPDOWN POPOVER */}
              {showNotifPopover && (
                <div className="absolute right-0 top-10 w-80 sm:w-96 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-4 space-y-3 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-cyan-400" />
                      <h4 className="font-bold text-xs text-white">{t('liveNotifs', language)}</h4>
                      {unreadCount > 0 && (
                        <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full border border-cyan-500/40 font-bold">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button 
                          onClick={onMarkAllRead} 
                          className="text-[10px] text-cyan-400 hover:underline"
                        >
                          {t('markAllRead', language)}
                        </button>
                      )}
                      <button 
                        onClick={() => setShowNotifPopover(false)} 
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1 scrollbar-none">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400 space-y-1">
                        <CheckCircle2 className="w-6 h-6 text-slate-600 mx-auto" />
                        <div>{t('noNotifs', language)}</div>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-xl border transition-all text-xs space-y-1 ${
                            !notif.read
                              ? 'bg-slate-800/90 border-cyan-500/40 shadow-sm'
                              : 'bg-slate-950/50 border-slate-850 opacity-80'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 font-bold text-white text-[11px]">
                              {getNotifIcon(notif.type)}
                              <span>{notif.title}</span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-snug">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer Options */}
                  {notifications.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-400">
                      <span>Auto-updates when audits occur</span>
                      <button 
                        onClick={onClearNotifications} 
                        className="text-rose-400 hover:underline"
                      >
                        {t('clearNotifs', language)}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>


      {/* ------------------------------------------------------------- */}
      {/* CUSTOM LOGO URL / FILE INPUT MODAL                             */}
      {/* ------------------------------------------------------------- */}
      {showLogoModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn text-gray-900">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-gray-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-sm text-gray-900">Set Custom Organization Logo</h3>
              </div>
              <button onClick={() => setShowLogoModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Upload your official logo file (PNG/SVG/JPG) or paste an image URL to replace the header logo placeholder.
            </p>

            <form onSubmit={handleSaveLogoUrl} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Option 1: Upload Image File</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload}
                  className="w-full text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-2 text-gray-400 text-[10px] font-bold uppercase">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Option 2: Image URL</label>
                <input 
                  type="url" 
                  value={tempLogoInput} 
                  onChange={(e) => setTempLogoInput(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-600 font-mono text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                {customLogoUrl && (
                  <button 
                    type="button" 
                    onClick={() => { setCustomLogoUrl(''); setShowLogoModal(false); }}
                    className="px-3 py-2 bg-rose-50 text-rose-700 font-bold rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Reset
                  </button>
                )}
                <button 
                  type="button" 
                  onClick={() => setShowLogoModal(false)}
                  className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg shadow"
                >
                  Apply Custom Logo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
