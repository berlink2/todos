import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';

import {openSecuritySettings} from '../utils/openSecuritySettings';

type LockScreenProps = {
  /** Current device-auth availability. */
  authStatus: 'checking' | 'ready' | 'no_enrollment';
  /** True while the native auth prompt is open. */
  isAuthenticating: boolean;
  /** Starts or retries local authentication. */
  onAuthenticate: () => void;
};

// Guidance differs per platform: Android sets a screen lock, iOS uses Face ID,
// Touch ID, or a passcode configured in the Settings app.
const NO_ENROLLMENT_MESSAGE = Platform.select({
  ios: 'Enable Face ID, Touch ID, or a passcode in Settings to use this app. Once set up, return and it unlocks automatically.',
  default:
    'Set up a screen lock (PIN, pattern, or password) to use this app. Once you set one up and return, the app unlocks automatically.',
});

const SETUP_BUTTON_LABEL = Platform.select({
  ios: 'Open Settings',
  default: 'Set up screen lock',
});

export function LockScreen({
  authStatus,
  isAuthenticating,
  onAuthenticate,
}: LockScreenProps) {
  if (authStatus === 'checking') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Checking device security...</Text>
      </View>
    );
  }

  if (authStatus === 'no_enrollment') {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Device security required</Text>
        <Text style={styles.message}>{NO_ENROLLMENT_MESSAGE}</Text>
        <Pressable style={styles.button} onPress={() => openSecuritySettings()}>
          <Text style={styles.buttonText}>{SETUP_BUTTON_LABEL}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todos locked</Text>
      <Text style={styles.message}>
        Authenticate with your device security to access your todos.
      </Text>
      <Pressable
        style={styles.button}
        disabled={isAuthenticating}
        onPress={onAuthenticate}>
        <Text style={styles.buttonText}>
          {isAuthenticating ? 'Authenticating...' : 'Unlock'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
