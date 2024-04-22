import HeaderSaveButton from '@components/header-save-button/HeaderSaveButton';

/**
 * Navigation screen options for header with Save and Cancel buttons.
 *
 * @type {Types.Navigation.NativeStackNavigationOptions}
 */
export const OPTIONS_HEADER_SAVE_CANCEL = {
  headerBackTitle: 'Cancel',
  headerRight: () => <HeaderSaveButton disabled />,
};
