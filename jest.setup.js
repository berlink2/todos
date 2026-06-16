/* eslint-env jest */

jest.mock('expo-local-authentication', () => ({
  SecurityLevel: {
    NONE: 0,
    SECRET: 1,
    BIOMETRIC_WEAK: 2,
    BIOMETRIC_STRONG: 3,
  },
  getEnrolledLevelAsync: jest.fn(() => Promise.resolve(1)),
  authenticateAsync: jest.fn(() =>
    Promise.resolve({success: false, error: 'authentication_failed'}),
  ),
}));

jest.mock('expo-intent-launcher', () => ({
  ActivityAction: {
    SETUP_LOCK_SCREEN: 'com.android.settings.SETUP_LOCK_SCREEN',
    LOCK_SCREEN_SETTINGS: 'android.settings.LOCK_SCREEN_SETTINGS',
    SECURITY_SETTINGS: 'android.settings.SECURITY_SETTINGS',
  },
  startActivityAsync: jest.fn(() => Promise.resolve()),
}));
