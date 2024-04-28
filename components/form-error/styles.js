import { makeStyles } from '@rneui/themed';
import { horizontalGutter } from '@styles/general-styles';

/**
 * Gets the styles for the `FormError` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  formError: {
    color: theme.colors.error,
    paddingHorizontal: horizontalGutter,
    ...props.style,
  },
}));
