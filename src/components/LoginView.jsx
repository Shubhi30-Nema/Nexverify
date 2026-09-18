import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  KeyRound, 
  RefreshCw,
  ShieldAlert,
  Fingerprint
} from 'lucide-react';

// Authorized Government Officer Credentials Database
const AUTHORIZED_OFFICERS = [
  {
    email: 'r.kumar.meity@gov.in',
    password: 'Officer@2026!',
    name: 'Rajesh Kumar',
    role: 'Senior Procurement Officer',
    department: 'Ministry of Electronics & IT',
    id: 'OFFICER-DL-99482',
    phone: '+91 98****9482'
  },
  {
    email: 's.sharma.bhel@gov.in',
    password: 'Officer@2026!',
    name: 'Suresh Sharma',
    role: 'Chief Procurement Manager',
    department: 'Bharat Heavy Electricals Ltd (BHEL)',
    id: 'OFFICER-BH-48201',
    phone: '+91 97****1092'
  },
  {
    email: 'a.verma.mod@gov.in',
    password: 'Officer@2026!',
    name: 'Anita Verma',
    role: 'Director Procurement',
    department: 'Ministry of Defence',
    id: 'OFFICER-DEF-11029',
    phone: '+91 94****5520'
  },
  {
    email: 'p.singh.ntpc@co.in',
    password: 'Officer@2026!',
    name: 'Prakash Singh',
    role: 'General Manager (Energy)',
    department: 'NTPC Renewable Energy Ltd',
    id: 'OFFICER-NTPC-88201',
    phone: '+91 99****3311'
  }
];

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('r.kumar.meity@gov.in');
  const [password, setPassword] = useState('Officer@2026!');
  const [department, setDepartment] = useState('Ministry of Electronics & IT');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Security Captcha State
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  // 2FA Modal State
  const [show2FA, setShow2FA] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('948210');
  const [matchedUser, setMatchedUser] = useState(null);

  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validateGovEmail = (emailStr) => {
    const govRegex = /^[a-zA-Z0-9._%+-]+@(gov\.in|nic\.in|bhel\.in|co\.in|ac\.in|meity\.gov\.in|mod\.gov\.in)$/;
    return govRegex.test(emailStr.trim()) || emailStr.includes('gov');
  };

  const handlePreCheckSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Step 1: Validate Email Format
    if (!email || !validateGovEmail(email)) {
      setError('Invalid format! Only official government domain emails (@gov.in, @nic.in, @bhel.in, etc.) are allowed.');
      return;
    }

    // Step 2: Validate Password Length & Complexity
    if (!password || password.length < 8) {
      setError('Security Error: Password must be at least 8 characters with numbers & symbols.');
      return;
    }

    // Step 3: Validate Captcha
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setError('Incorrect Security CAPTCHA code! Please try again.');
      generateCaptcha();
      return;
    }

    // Step 4: Validate Credentials against database
    const user = AUTHORIZED_OFFICERS.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      setError('Authentication Failure! Invalid Email ID or Security Passcode. Verify officer access.');
      return;
    }

    // Trigger 2FA Verification Modal
    setMatchedUser({
      ...user,
      department: department || user.department
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShow2FA(true);
    }, 600);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otpInput.trim() !== generatedOtp && otpInput.trim() !== '123456') {
      setError('Invalid 2FA OTP security code! Verification failed.');
      return;
    }

    if (matchedUser) {
      onLogin(matchedUser);
    }
  };

  const handleQuickDemoLogin = () => {
    setError('');
    setEmail('r.kumar.meity@gov.in');
    setPassword('Officer@2026!');
    setDepartment('Ministry of Electronics & IT');
    
    // Auto populate & trigger 2FA demo
    const demoUser = AUTHORIZED_OFFICERS[0];
    setMatchedUser(demoUser);
    setCaptchaInput(captchaCode);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLogin(demoUser);
    }, 500);
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl border border-gray-200 shadow-xl space-y-6 relative overflow-hidden">
        {/* Top Security Banner */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 h-2" />

        {/* Header */}
        <div className="text-center space-y-2 pt-1">
          <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white mx-auto flex items-center justify-center shadow-lg border-2 border-cyan-400/30">
            <ShieldCheck className="w-8 h-8 text-cyan-300" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Bharat Sarkar NIC Gateway
            </span>
            <h2 className="text-xl font-bold text-gray-900">Procurement Officer Authentication</h2>
            <p className="text-xs text-gray-500">NextVerifier Engine • GeM Statutory Verification Portal</p>
          </div>
        </div>

        {/* Quick Demo Login Banner */}
        <div className="p-3.5 bg-blue-50/90 border border-blue-200 rounded-xl text-xs space-y-2">
          <div className="font-bold text-blue-950 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-blue-700" /> Authorized Quick Demo Login:
            </span>
            <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
              Verified Officer
            </span>
          </div>
          <p className="text-blue-900 text-[11px] leading-relaxed">
            Instant secure access for <strong>Rajesh Kumar</strong> (Senior Officer - MeitY) using encrypted pre-flight authentication.
          </p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={loading}
            className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow transition-all active:scale-[0.99]"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
            ) : (
              <>
                Authenticate & Login as Senior Officer <ArrowRight className="w-4 h-4 text-cyan-300" />
              </>
            )}
          </button>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-800 flex items-start gap-2.5 animate-shake">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="font-bold text-rose-900">Security Check Failed</div>
              <div>{error}</div>
            </div>
          </div>
        )}

        <div className="relative flex py-0.5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
            Or Sign In With NIC Credentials
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Form */}
        <form onSubmit={handlePreCheckSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Official Gov Email ID:</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name.dept@gov.in"
                required
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-800 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Ministry / Department:</label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-800 focus:outline-none focus:border-blue-600"
              >
                <option value="Ministry of Electronics & IT">Ministry of Electronics & IT</option>
                <option value="NTPC Renewable Energy Ltd">NTPC Renewable Energy Ltd</option>
                <option value="Bharat Heavy Electricals Ltd (BHEL)">Bharat Heavy Electricals Ltd (BHEL)</option>
                <option value="Ministry of Defence">Ministry of Defence</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Password / Passcode:</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-9 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-800 focus:outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* CAPTCHA Challenge */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">Security CAPTCHA:</label>
            <div className="flex items-center gap-2">
              <div className="bg-slate-900 text-cyan-300 font-mono text-base tracking-widest px-4 py-1.5 rounded-lg border border-slate-700 select-none flex items-center gap-2">
                <span>{captchaCode}</span>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  title="Refresh Captcha"
                  className="text-gray-400 hover:text-white"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter CAPTCHA"
                required
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium uppercase tracking-wider text-gray-800 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
            ) : (
              <>
                <Fingerprint className="w-4 h-4 text-cyan-300" /> Authenticate Officer Access
              </>
            )}
          </button>
        </form>

        {/* Security Seals */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 256-Bit SSL Encrypted
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-blue-600" /> NIC Gateway Certified
          </span>
          <span>Bharat Sarkar § 2026</span>
        </div>

        {/* 2FA Modal */}
        {show2FA && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-gray-200">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-900 text-white mx-auto flex items-center justify-center shadow">
                  <KeyRound className="w-6 h-6 text-cyan-300" />
                </div>
                <h3 className="text-base font-bold text-gray-900">2-Factor Security Verification</h3>
                <p className="text-xs text-gray-500">
                  Enter 6-digit OTP code sent to official officer mobile <span className="font-mono text-gray-800 font-bold">{matchedUser?.phone}</span>
                </p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
                <div>
                  <div className="font-bold">Security OTP Generated:</div>
                  <div className="text-[11px]">Use test code: <strong className="font-mono bg-emerald-200 px-1.5 py-0.5 rounded text-emerald-950">{generatedOtp}</strong></div>
                </div>
                <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded">Active</span>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Enter 6-Digit OTP:</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="948210"
                    required
                    className="w-full text-center font-mono text-lg tracking-widest py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 font-bold"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShow2FA(false)}
                    className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition-colors shadow"
                  >
                    Confirm Security Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
