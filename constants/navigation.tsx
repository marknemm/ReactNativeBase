import HeaderActionButton from '@components/header-action-button/HeaderActionButton';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

/**
 * Navigation screen options for header with Create and Cancel buttons.
 */
export const OPTIONS_HEADER_CREATE_CANCEL: NativeStackNavigationOptions = {
  headerBackTitle: 'Cancel',
  headerRight: () => <HeaderActionButton disabled title="Create" />,
};

/**
 * Navigation screen options for header with Save and Cancel buttons.
 */
export const OPTIONS_HEADER_SAVE_CANCEL: NativeStackNavigationOptions = {
  headerBackTitle: 'Cancel',
  headerRight: () => <HeaderActionButton disabled title="Save" />,
};
