import { makeStyles } from '@rneui/themed';
import { verticalGutter } from '@styles/general-styles';

/**
 * Gets the styles for the `SignInModal` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  modal: {
    height: 'auto',
    maxHeight: '90%',
    paddingBottom: verticalGutter,
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
  },
}));
