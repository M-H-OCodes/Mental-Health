import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import {
  registerUser,
  verifyEmailCode,
  resendVerificationCode,
  loginUser,
  getLatestDispatchedEmail,
  DispatchedVerificationEvent,
} from '../utils/authUtils.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { email: string; name: string; uid: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'verify' | 'verified_success'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [latestDispatch, setLatestDispatch] = useState<DispatchedVerificationEvent | null>(null);
  const [isResending, setIsResending] = useState(false);

  // Sync latest dispatched email when entering verify mode
  useEffect(() => {
    if (mode === 'verify' && email) {
      const dispatch = getLatestDispatchedEmail(email);
      setLatestDispatch(dispatch);
    }
  }, [mode, email]);

  if (!isOpen) return null;

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatusMessage(null);

    const res = registerUser(name, email, password);
    if (!res.success) {
      setError(res.error || 'Failed to register account.');
      return;
    }

    // Advance to verification step - user is NOT logged in yet
    setMode('verify');
    setVerificationCode('');
    const dispatch = getLatestDispatchedEmail(email);
    setLatestDispatch(dispatch);
    setStatusMessage(`Verification code sent to ${email.trim()}. Please verify your email.`);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = verifyEmailCode(email, verificationCode);
    if (!res.success) {
      setError(res.error || 'Verification failed.');
      return;
    }

    // Verified! Now move to verified_success, requiring the user to log in again
    setMode('verified_success');
    setStatusMessage(null);
  };

  const handleQuickVerifyLink = () => {
    if (!latestDispatch?.code) return;
    setVerificationCode(latestDispatch.code);
    const res = verifyEmailCode(email, latestDispatch.code);
    if (res.success) {
      setMode('verified_success');
    }
  };

  const handleResendCode = () => {
    setIsResending(true);
    setError(null);
    setTimeout(() => {
      const res = resendVerificationCode(email);
      setIsResending(false);
      if (res.success) {
        const dispatch = getLatestDispatchedEmail(email);
        setLatestDispatch(dispatch);
        setStatusMessage('A fresh 6-digit verification code was sent to your email.');
      } else {
        setError(res.error || 'Could not resend code.');
      }
    }, 400);
  };

  const handleProceedToLogin = () => {
    setMode('login');
    setPassword('');
    setError(null);
    setStatusMessage('Email verified successfully! Please enter your password to log in.');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatusMessage(null);

    const res = loginUser(email, password);
    if (!res.success) {
      if (res.errorCode === 'UNVERIFIED') {
        setError(res.error || 'Email not verified.');
        // Provide convenient option to jump to verify
      } else {
        setError(res.error || 'Login failed. Please check your credentials.');
      }
      return;
    }

    if (res.user) {
      onLoginSuccess(res.user);
      onClose();
    }
  };

  const handleDemoLogin = () => {
    const demoUid = 'demo_user_123';
    const demoName = 'Youth Advocate';
    const demoEmail = 'youth.advocate@ecomind.org';

    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('userId', demoUid);
    sessionStorage.setItem('userEmail', demoEmail);
    sessionStorage.setItem('userName', demoName);

    onLoginSuccess({
      email: demoEmail,
      name: demoName,
      uid: demoUid,
    });
    onClose();
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#F3F9F7] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#A4D7C9] relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-full cursor-pointer transition-colors"
          aria-label="Close auth modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Branding Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-2 bg-[#A4D7C9] rounded-2xl flex items-center justify-center shadow-xs">
            <img src="ECOMIND-removebg-preview.png" alt="Logo" className="w-11 h-11 object-contain" />
          </div>

          {mode === 'login' && (
            <>
              <h2 className="text-2xl font-extrabold text-[#1e4d4a]">Welcome Back</h2>
              <p className="text-xs text-[#555555] mt-1">
                Log in to publish and manage your mental health stories
              </p>
            </>
          )}

          {mode === 'signup' && (
            <>
              <h2 className="text-2xl font-extrabold text-[#1e4d4a]">Create an Account</h2>
              <p className="text-xs text-[#555555] mt-1">
                Join our youth community. We'll send an email verification step to activate your account.
              </p>
            </>
          )}

          {mode === 'verify' && (
            <>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 rounded-full text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Verification Step Required</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#1e4d4a]">Verify Your Email</h2>
              <p className="text-xs text-[#555555] mt-1">
                We sent a 6-digit confirmation code to{' '}
                <span className="font-bold text-[#1e4d4a]">{email || 'your email'}</span>
              </p>
            </>
          )}

          {mode === 'verified_success' && (
            <>
              <div className="w-12 h-12 mx-auto mb-2 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold text-emerald-800">Email Verified!</h2>
              <p className="text-xs text-[#555555] mt-1">
                Your email is confirmed. Now please log in with your credentials to continue.
              </p>
            </>
          )}
        </div>

        {/* Global Notices & Errors */}
        {statusMessage && (
          <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs p-3 rounded-xl mb-4 flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 rounded-xl mb-4">
            <p className="font-semibold">{error}</p>
            {error.includes('not been verified') && mode === 'login' && (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMode('verify');
                }}
                className="mt-2 text-xs font-bold text-[#1e4d4a] underline cursor-pointer hover:text-[#5AA59E] block"
              >
                Go to Email Verification Step →
              </button>
            )}
          </div>
        )}

        {/* 1. LOGIN MODE */}
        {mode === 'login' && (
          <>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#1e4d4a] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5AA59E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white border border-[#A4D7C9] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#1e4d4a] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5AA59E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white border border-[#A4D7C9] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5AA59E] hover:bg-[#488b85] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </button>
            </form>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-[#A4D7C9]"></div>
              <span className="flex-shrink mx-3 text-[11px] text-[#666666] uppercase font-bold">
                Or Quick Access
              </span>
              <div className="flex-grow border-t border-[#A4D7C9]"></div>
            </div>

            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full bg-[#d2f8eb] hover:bg-[#b8ebd9] border border-[#5AA59E] text-[#1e4d4a] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-[#5AA59E]" />
              <span>1-Click Demo Guest Sign-In</span>
            </button>

            <div className="mt-5 text-center text-xs text-[#555555]">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStatusMessage(null);
                  setMode('signup');
                }}
                className="text-[#1e4d4a] font-bold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </>
        )}

        {/* 2. SIGNUP MODE */}
        {mode === 'signup' && (
          <>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#1e4d4a] mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#5AA59E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Maya Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white border border-[#A4D7C9] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#1e4d4a] mb-1">
                  Email Address (Gmail / Email)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5AA59E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="e.g. user@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white border border-[#A4D7C9] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
                  />
                </div>
                <p className="text-[11px] text-[#666666] mt-1">
                  A verification step will be sent to this email address.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#1e4d4a] mb-1">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5AA59E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-white border border-[#A4D7C9] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5AA59E] hover:bg-[#488b85] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up & Send Verification Code</span>
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-[#555555]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStatusMessage(null);
                  setMode('login');
                }}
                className="text-[#1e4d4a] font-bold hover:underline cursor-pointer"
              >
                Log In
              </button>
            </div>
          </>
        )}

        {/* 3. VERIFY STEP MODE */}
        {mode === 'verify' && (
          <div className="space-y-4">
            {/* Simulated Email / Mailbox Dispatch Card */}
            <div className="bg-white rounded-2xl p-4 border border-[#A4D7C9] shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] font-bold text-[#1e4d4a] uppercase tracking-wide">
                    Inbox Dispatch Notification
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">Just now</span>
              </div>

              <div className="text-xs text-[#444444] space-y-1">
                <p>
                  <span className="font-semibold text-gray-500">To:</span> {email}
                </p>
                <p>
                  <span className="font-semibold text-gray-500">Subject:</span> EcoMind Community:
                  Email Verification Code
                </p>
              </div>

              {latestDispatch?.code && (
                <div className="mt-3 p-3 bg-[#f0f9f6] rounded-xl border border-[#A4D7C9] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#5AA59E] block">
                      Verification Code
                    </span>
                    <span className="font-mono text-xl font-extrabold tracking-widest text-[#1e4d4a]">
                      {latestDispatch.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopyCode(latestDispatch.code)}
                      className="px-2.5 py-1.5 bg-white border border-[#A4D7C9] rounded-lg text-xs font-semibold text-[#1e4d4a] hover:bg-gray-50 flex items-center gap-1 cursor-pointer shadow-2xs"
                      title="Copy verification code"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleQuickVerifyLink}
                      className="px-2.5 py-1.5 bg-[#5AA59E] text-white rounded-lg text-xs font-semibold hover:bg-[#488b85] flex items-center gap-1 cursor-pointer shadow-2xs"
                      title="Simulate clicking the verification link in your email"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>1-Click Verify</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Code Input Form */}
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#1e4d4a] mb-1">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  required
                  autoFocus
                  className="w-full bg-white border border-[#A4D7C9] rounded-xl py-3 text-center text-2xl font-mono tracking-widest font-bold text-[#1e4d4a] focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#5AA59E] hover:bg-[#488b85] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Email</span>
              </button>
            </form>

            <div className="flex items-center justify-between pt-2 text-xs text-[#555555]">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="text-[#1e4d4a] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                <span>Resend Code</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError(null);
                }}
                className="text-[#666666] hover:underline cursor-pointer"
              >
                Change Email
              </button>
            </div>
          </div>
        )}

        {/* 4. VERIFIED SUCCESS MODE -> Forces user to log in again */}
        {mode === 'verified_success' && (
          <div className="text-center space-y-5 py-2">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 leading-relaxed text-left">
              <p className="font-bold text-sm text-emerald-800 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Email Address Confirmed</span>
              </p>
              <p>
                Your email <strong className="text-emerald-950 font-semibold">{email}</strong> has
                been successfully verified.
              </p>
              <p className="mt-1 text-emerald-700">
                To complete security verification, please log in with your credentials.
              </p>
            </div>

            <button
              onClick={handleProceedToLogin}
              type="button"
              className="w-full bg-[#5AA59E] hover:bg-[#488b85] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Log In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
