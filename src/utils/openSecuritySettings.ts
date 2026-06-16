import {Linking, Platform} from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

/**
 * Opens the OS screen where the user can set up device security.
 * Android deep-links straight to screen-lock setup; iOS can only open the
 * Settings app (Apple does not allow deep-linking to the passcode screen).
 */
export async function openSecuritySettings(): Promise<void> {
  if (Platform.OS === 'android') {
    try {
      await IntentLauncher.startActivityAsync(
        'android.app.action.SET_NEW_PASSWORD',
      );
      return;
    } catch {
      // Fall through to the generic settings app below.
    }
  }

  await Linking.openSettings();
}
