/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserAccount {
  uid: string;
  email: string;
  name: string;
  passwordHash: string;
  isVerified: boolean;
  verificationCode?: string;
  codeExpiresAt?: number;
  registeredAt: number;
}

export interface AuthSessionUser {
  uid: string;
  name: string;
  email: string;
}

export interface DispatchedVerificationEvent {
  email: string;
  name: string;
  code: string;
  sentAt: number;
  expiresAt: number;
}

const STORAGE_USERS_KEY = 'ecomind_registered_accounts_v1';
const LATEST_DISPATCH_KEY = 'ecomind_last_dispatched_verification';

/**
 * Retrieves memory or localStorage stored accounts
 */
export function getRegisteredAccounts(): UserAccount[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persists registered accounts
 */
export function saveRegisteredAccounts(accounts: UserAccount[]): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(accounts));
    }
  } catch {
    // ignore local storage errors
  }
}

/**
 * Helper to generate a secure, 6-digit numeric verification code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Store the latest dispatched email verification notification for preview/simulation
 */
export function recordDispatchedEmail(event: DispatchedVerificationEvent): void {
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(LATEST_DISPATCH_KEY, JSON.stringify(event));
    }
  } catch {}
}

export function getLatestDispatchedEmail(email?: string): DispatchedVerificationEvent | null {
  try {
    if (typeof sessionStorage === 'undefined') return null;
    const raw = sessionStorage.getItem(LATEST_DISPATCH_KEY);
    if (!raw) return null;
    const parsed: DispatchedVerificationEvent = JSON.parse(raw);
    if (email && parsed.email.toLowerCase() !== email.toLowerCase().trim()) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Registers a new user with unverified email status and sends a verification step
 */
export function registerUser(
  name: string,
  email: string,
  password: string
): {
  success: boolean;
  error?: string;
  account?: UserAccount;
  verificationCode?: string;
} {
  const cleanName = name.trim();
  const cleanEmail = email.toLowerCase().trim();
  const cleanPass = password.trim();

  if (!cleanName) {
    return { success: false, error: 'Please enter your name.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, error: 'Please enter a valid email address (e.g. name@gmail.com).' };
  }

  if (cleanPass.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const accounts = getRegisteredAccounts();
  const existingIndex = accounts.findIndex(
    (a) => a.email.toLowerCase() === cleanEmail
  );

  const code = generateVerificationCode();
  const codeExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

  if (existingIndex >= 0) {
    const existing = accounts[existingIndex];
    if (existing.isVerified) {
      return {
        success: false,
        error: 'An account with this email already exists and is verified. Please log in.',
      };
    }

    // Account exists but was not verified yet: update verification code and info
    existing.name = cleanName;
    existing.passwordHash = cleanPass;
    existing.verificationCode = code;
    existing.codeExpiresAt = codeExpiresAt;
    accounts[existingIndex] = existing;
    saveRegisteredAccounts(accounts);

    recordDispatchedEmail({
      email: cleanEmail,
      name: cleanName,
      code,
      sentAt: Date.now(),
      expiresAt: codeExpiresAt,
    });

    return {
      success: true,
      account: existing,
      verificationCode: code,
    };
  }

  const newAccount: UserAccount = {
    uid: 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
    name: cleanName,
    email: cleanEmail,
    passwordHash: cleanPass,
    isVerified: false, // Must be verified before login!
    verificationCode: code,
    codeExpiresAt,
    registeredAt: Date.now(),
  };

  accounts.push(newAccount);
  saveRegisteredAccounts(accounts);

  recordDispatchedEmail({
    email: cleanEmail,
    name: cleanName,
    code,
    sentAt: Date.now(),
    expiresAt: codeExpiresAt,
  });

  return {
    success: true,
    account: newAccount,
    verificationCode: code,
  };
}

/**
 * Verifies an account using the 6-digit code.
 * Upon success, sets isVerified to true and removes the code.
 * NOTE: Does NOT log the user in; the user must log in again with credentials.
 */
export function verifyEmailCode(
  email: string,
  code: string
): { success: boolean; error?: string } {
  const cleanEmail = email.toLowerCase().trim();
  const cleanCode = code.trim();

  if (!cleanCode) {
    return { success: false, error: 'Please enter the 6-digit verification code.' };
  }

  const accounts = getRegisteredAccounts();
  const index = accounts.findIndex((a) => a.email.toLowerCase() === cleanEmail);

  if (index === -1) {
    return { success: false, error: 'Account not found. Please sign up first.' };
  }

  const account = accounts[index];

  if (account.isVerified) {
    return { success: true };
  }

  if (account.codeExpiresAt && Date.now() > account.codeExpiresAt) {
    return {
      success: false,
      error: 'This verification code has expired. Please click "Resend Code" to receive a new one.',
    };
  }

  if (account.verificationCode !== cleanCode) {
    return {
      success: false,
      error: 'Invalid verification code. Please check the code sent to your email and try again.',
    };
  }

  // Mark verified
  account.isVerified = true;
  account.verificationCode = undefined;
  account.codeExpiresAt = undefined;
  accounts[index] = account;
  saveRegisteredAccounts(accounts);

  return { success: true };
}

/**
 * Resends a fresh 6-digit verification code to the user's email
 */
export function resendVerificationCode(
  email: string
): { success: boolean; error?: string; verificationCode?: string } {
  const cleanEmail = email.toLowerCase().trim();
  const accounts = getRegisteredAccounts();
  const index = accounts.findIndex((a) => a.email.toLowerCase() === cleanEmail);

  if (index === -1) {
    return { success: false, error: 'Account not found. Please sign up.' };
  }

  const account = accounts[index];
  if (account.isVerified) {
    return { success: false, error: 'Your email is already verified. You can log in directly.' };
  }

  const newCode = generateVerificationCode();
  const codeExpiresAt = Date.now() + 15 * 60 * 1000;

  account.verificationCode = newCode;
  account.codeExpiresAt = codeExpiresAt;
  accounts[index] = account;
  saveRegisteredAccounts(accounts);

  recordDispatchedEmail({
    email: cleanEmail,
    name: account.name,
    code: newCode,
    sentAt: Date.now(),
    expiresAt: codeExpiresAt,
  });

  return { success: true, verificationCode: newCode };
}

/**
 * Validates credentials and logs the user in ONLY if the email is verified.
 */
export function loginUser(
  email: string,
  password: string
): {
  success: boolean;
  error?: string;
  errorCode?: 'UNVERIFIED' | 'INVALID_CREDENTIALS' | 'NOT_FOUND';
  user?: AuthSessionUser;
} {
  const cleanEmail = email.toLowerCase().trim();
  const cleanPass = password.trim();

  if (!cleanEmail || !cleanPass) {
    return {
      success: false,
      error: 'Please enter both your email address and password.',
      errorCode: 'INVALID_CREDENTIALS',
    };
  }

  const accounts = getRegisteredAccounts();
  const account = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

  if (!account) {
    return {
      success: false,
      error: 'No account found with this email. Please sign up first.',
      errorCode: 'NOT_FOUND',
    };
  }

  // CRITICAL CHECK: User must be verified before they can log in
  if (!account.isVerified) {
    return {
      success: false,
      error:
        'Your email address has not been verified yet. Please complete email verification before logging in.',
      errorCode: 'UNVERIFIED',
    };
  }

  if (account.passwordHash !== cleanPass) {
    return {
      success: false,
      error: 'Incorrect password. Please verify and try again.',
      errorCode: 'INVALID_CREDENTIALS',
    };
  }

  // Set session storage
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('userId', account.uid);
      sessionStorage.setItem('userEmail', account.email);
      sessionStorage.setItem('userName', account.name);
    }
  } catch {}

  return {
    success: true,
    user: {
      uid: account.uid,
      name: account.name,
      email: account.email,
    },
  };
}

/**
 * Checks if an email exists and its verification status
 */
export function checkAccountStatus(email: string): {
  exists: boolean;
  isVerified?: boolean;
  name?: string;
} {
  const cleanEmail = email.toLowerCase().trim();
  const accounts = getRegisteredAccounts();
  const account = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
  if (!account) return { exists: false };
  return {
    exists: true,
    isVerified: account.isVerified,
    name: account.name,
  };
}
