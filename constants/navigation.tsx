import HeaderSaveButton from '@components/header-save-button/HeaderSaveButton';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

/**
 * Navigation screen options for header with Save and Cancel buttons.
 */
export const OPTIONS_HEADER_SAVE_CANCEL: NativeStackNavigationOptions = {
  headerBackTitle: 'Cancel',
  headerRight: () => <HeaderSaveButton disabled />,
};
