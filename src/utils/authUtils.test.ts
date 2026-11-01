import test from 'node:test';
import assert from 'node:assert/strict';
import {
  registerUser,
  verifyEmailCode,
  loginUser,
  resendVerificationCode,
  getRegisteredAccounts,
  saveRegisteredAccounts,
} from './authUtils.ts';

// Mock storage for Node test environment
const mockStorage: Record<string, string> = {};
// @ts-expect-error mock global localStorage
globalThis.localStorage = {
  getItem: (k: string) => mockStorage[k] || null,
  setItem: (k: string, v: string) => {
    mockStorage[k] = v;
  },
  removeItem: (k: string) => {
    delete mockStorage[k];
  },
  clear: () => {
    for (const key of Object.keys(mockStorage)) delete mockStorage[key];
  },
};
// @ts-expect-error mock global sessionStorage
globalThis.sessionStorage = {
  getItem: (k: string) => mockStorage['session_' + k] || null,
  setItem: (k: string, v: string) => {
    mockStorage['session_' + k] = v;
  },
  removeItem: (k: string) => {
    delete mockStorage['session_' + k];
  },
  clear: () => {
    for (const key of Object.keys(mockStorage)) {
      if (key.startsWith('session_')) delete mockStorage[key];
    }
  },
};

test('registerUser creates unverified account with 6-digit code', () => {
  saveRegisteredAccounts([]);
  const result = registerUser('Test User', 'test@gmail.com', 'securepass123');
  assert.equal(result.success, true);
  assert.ok(result.verificationCode);
  assert.equal(result.verificationCode?.length, 6);
  assert.equal(result.account?.isVerified, false);

  const accounts = getRegisteredAccounts();
  assert.equal(accounts.length, 1);
  assert.equal(accounts[0].isVerified, false);
});

test('loginUser fails when account is unverified', () => {
  const loginRes = loginUser('test@gmail.com', 'securepass123');
  assert.equal(loginRes.success, false);
  assert.equal(loginRes.errorCode, 'UNVERIFIED');
});

test('verifyEmailCode rejects wrong code', () => {
  const verifyRes = verifyEmailCode('test@gmail.com', '000000');
  assert.equal(verifyRes.success, false);
  assert.match(verifyRes.error || '', /Invalid verification code/);
});

test('verifyEmailCode accepts correct code and marks account verified', () => {
  const accounts = getRegisteredAccounts();
  const currentCode = accounts[0].verificationCode!;
  
  const verifyRes = verifyEmailCode('test@gmail.com', currentCode);
  assert.equal(verifyRes.success, true);

  const updatedAccounts = getRegisteredAccounts();
  assert.equal(updatedAccounts[0].isVerified, true);
});

test('loginUser succeeds after email is verified', () => {
  const loginRes = loginUser('test@gmail.com', 'securepass123');
  assert.equal(loginRes.success, true);
  assert.equal(loginRes.user?.email, 'test@gmail.com');
  assert.equal(loginRes.user?.name, 'Test User');
});

test('resendVerificationCode generates a new code for unverified user', () => {
  saveRegisteredAccounts([]);
  registerUser('Alice', 'alice@gmail.com', 'secret123');
  const accountsBefore = getRegisteredAccounts();
  const oldCode = accountsBefore[0].verificationCode;

  const resendResult = resendVerificationCode('alice@gmail.com');
  assert.equal(resendResult.success, true);
  assert.ok(resendResult.verificationCode);
  assert.notEqual(resendResult.verificationCode, oldCode);
});
