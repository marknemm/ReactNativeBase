import { makeStyles } from '@rneui/themed';

/**
 * Gets the styles for the `Dropdown` component.
 */
export const useStyles = makeStyles(() => ({
  dropdown: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 41,
  },
  placeholder: {
    color: 'gray',
    fontSize: 18,
  }
}));
