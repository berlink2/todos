import * as LocalAuthentication from 'expo-local-authentication';
import {useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

type AuthStatus = 'checking' | 'ready' | 'no_enrollment';

/** True when the device has PIN, pattern, password, or biometrics enrolled. */
async function hasDeviceAuthEnrolled(): Promise<boolean> {
  const level = await LocalAuthentication.getEnrolledLevelAsync();
  return level !== LocalAuthentication.SecurityLevel.NONE;
}

/**
 * Wraps expo-local-authentication to gate the app behind device auth.
 * The app starts locked and re-locks when sent to the background.
 */
export function useAuth() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  /** Reads whether the device has a screen lock or biometrics enrolled. */
  const refreshAuthAvailability = async () => {
    const enrolled = await hasDeviceAuthEnrolled();
    setAuthStatus(enrolled ? 'ready' : 'no_enrollment');
  };

  /** Prompts the user with biometrics or device credentials (PIN/pattern/password). */
  const authenticate = async (): Promise<boolean> => {
    if (authStatus !== 'ready' || isAuthenticating) {
      return false;
    }

    setIsAuthenticating(true);

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your todos',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setIsUnlocked(true);
        return true;
      }

      setIsUnlocked(false);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    void refreshAuthAvailability();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === 'background' || nextState === 'inactive') {
        setIsUnlocked(false);
        return;
      }

      if (nextState === 'active') {
        void refreshAuthAvailability();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    isUnlocked,
    authStatus,
    isAuthenticating,
    authenticate,
    refreshAuthAvailability,
  };
}
