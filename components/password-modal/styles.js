import { makeStyles } from '@rneui/themed';
import { horizontalGutter, verticalGutter } from '@styles/general-styles';

/**
 * Gets the styles for the `PasswordModal` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  modal: {
    maxHeight: 400,
    ...props.style,
  },
  prompt: {
    color: theme.colors.grey1,
    fontSize: 18,
    paddingVertical: verticalGutter,
    textAlign: 'center',
    ...props.promptStyle,
  },
  promptContainer: {
    borderBottomColor: theme.colors.grey5,
    borderBottomWidth: 1,
    marginBottom: verticalGutter,
  },
  submitButton: {
    marginHorizontal: horizontalGutter,
  },
}));
