import { Button } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';

/**
 * Navigation screen options for header with Save and Cancel buttons.
 *
 * @type {Types.Navigation.NativeStackNavigationOptions}
 */
export const OPTIONS_HEADER_SAVE_CANCEL = {
  headerBackTitle: 'Cancel',
  headerRight: () => (
    <Button
      disabled
      title="Save"
      titleStyle={generalStyles.white}
      type="clear"
    />
  ),
};
