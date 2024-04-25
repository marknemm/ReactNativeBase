import { makeStyles } from '@rneui/themed';
import { verticalGutter } from '@styles/general-styles';

const modalVerticalGutter = 150;

/**
 * Gets the styles for the `SignInModal` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  modal: {
    bottom: modalVerticalGutter,
    top: modalVerticalGutter,
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
