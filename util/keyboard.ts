import { Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

/**
 * Initializes app-wide keyboard features and functionality.
 */
export function initKeyboardConfig() {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true); // Prevent common keyboard issues on iOS.
    KeyboardManager.setEnableAutoToolbar(true);
    KeyboardManager.setEnableDebugging(false);
    KeyboardManager.setLayoutIfNeededOnUpdate(true);
    KeyboardManager.setShouldResignOnTouchOutside(true);
    KeyboardManager.setShouldShowToolbarPlaceholder(true);
    KeyboardManager.setToolbarDoneBarButtonItemText('Done');
    KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  }
}
