import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import VerifyBidView from './components/VerifyBidView';
import DocumentUpload from './components/DocumentUpload';
import TendersView from './components/TendersView';
import PortalStatusView from './components/PortalStatusView';
import AuditTrailView from './components/AuditTrailView';
import LoginView from './components/LoginView';
import { AUDIT_LOGS } from './data/mockData';
import { t } from './data/translations';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Audit Decision Logged',
    message: 'TechCorp India Pvt Ltd qualified for Tender GEM/2026/B/582910 by Officer Rajesh Kumar.',
    type: 'audit',
    time: '5m ago',
    read: false
  },
  {
    id: 'n2',
    title: 'Clarification Letter Issued',
    message: 'Surya Green Energy Ltd requested for Make in India (MII) local content clarification.',
    type: 'warning',
    time: '25m ago',
    read: false
  },
  {
    id: 'n3',
    title: 'New Tender Published',
    message: 'GEM/2026/B/948211 — Supply & Commissioning of 500kW Solar Rooftop Power Plant.',
    type: 'tender',
    time: '1h ago',
    read: false
  },
  {
    id: 'n4',
    title: 'CPPP Blacklist Flagged',
    message: 'Apex Global Hardware Ltd debarred on CPPP registry — Disqualified (32%).',
    type: 'alert',
    time: '2h ago',
    read: true
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [currentUser, setCurrentUser] = useState({
    name: 'Rajesh Kumar',
    role: 'Senior Procurement Officer',
    department: 'Ministry of Electronics & IT',
    email: 'r.kumar.meity@gov.in',
    id: 'OFFICER-DL-99482'
  });

  const [auditLogs, setAuditLogs] = useState(AUDIT_LOGS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [selectedTenderId, setSelectedTenderId] = useState('GEM/2026/B/582910');
  const [selectedBidderId, setSelectedBidderId] = useState('BID-101');

  // Sync .dark class on <html> and <body> when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('login');
  };

  const addAuditLog = (logItem) => {
    setAuditLogs(prev => [logItem, ...prev]);
    // Trigger real-time notification alert on the bell!
    const isDisqualified = (logItem.action || '').toLowerCase().includes('disqualif');
    const isWarning = (logItem.action || '').toLowerCase().includes('clarif');
    const newNotif = {
      id: `n-${Date.now()}`,
      title: isDisqualified ? 'Audit Disqualification Alert' : isWarning ? 'Clarification Issued' : 'Audit Ledger Activity Logged',
      message: `${logItem.bidder || 'Bidder'} on ${logItem.tender || 'Tender'} — ${logItem.action || 'Officer Action'} (${logItem.result || ''})`,
      type: isDisqualified ? 'alert' : isWarning ? 'warning' : 'audit',
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleSelectVerifyBidder = (bidderId, tenderId) => {
    if (bidderId) setSelectedBidderId(bidderId);
    if (tenderId) setSelectedTenderId(tenderId);
    setActiveTab('verify');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      {/* Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        notifications={notifications}
        onMarkAllRead={markAllNotificationsRead}
        onClearNotifications={clearAllNotifications}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        language={language}
        onLanguageChange={setLanguage}
        onSelectVerifyBidder={handleSelectVerifyBidder}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {activeTab === 'login' && (
          <LoginView onLogin={handleLogin} language={language} />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            language={language}
            onNavigateVerify={() => setActiveTab('verify')}
            onNavigateUpload={() => setActiveTab('upload')}
          />
        )}

        {activeTab === 'verify' && (
          <VerifyBidView
            language={language}
            selectedTenderId={selectedTenderId}
            setSelectedTenderId={setSelectedTenderId}
            selectedBidderId={selectedBidderId}
            setSelectedBidderId={setSelectedBidderId}
            onLogAction={(log) => addAuditLog(log)}
          />
        )}

        {activeTab === 'upload' && (
          <DocumentUpload
            language={language}
            onAIAnalyzeComplete={(res) => {
              addAuditLog({
                date: new Date().toLocaleString(),
                bidder: 'TechCorp India Pvt Ltd',
                tender: selectedTenderId,
                result: `${res.overallScore}% (AI Scanned)`,
                action: 'AI Document Verification Performed'
              });
            }}
          />
        )}

        {activeTab === 'tenders' && (
          <TendersView language={language} onSelectVerifyBidder={handleSelectVerifyBidder} />
        )}

        {activeTab === 'portals' && (
          <PortalStatusView language={language} />
        )}

        {activeTab === 'audit' && (
          <AuditTrailView language={language} logs={auditLogs} />
        )}
      </main>

      {/* Clean Footer - Bharat Sarkar & NextVerifier Engine */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-semibold text-gray-700">{t('footerTitle', language)}</span>
          <span>{t('footerDesc', language)}</span>
        </div>
      </footer>
    </div>
  );
}

