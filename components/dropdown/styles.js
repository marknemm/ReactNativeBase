import { makeStyles } from '@rneui/themed';

/**
 * Gets the styles for the `Dropdown` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  dropdown: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 41,
    ...props.style,
  },
  itemContainer: {
    backgroundColor: theme.colors.background,
    ...props.itemContainerStyle,
  },
  itemText: {
    color: theme.colors.black,
    ...props.itemTextStyle,
  },
  placeholder: {
    color: 'gray',
    fontSize: 18,
  },
  selectedText: {
    color: theme.colors.black,
    ...props.selectedTextStyle,
  },
}));
