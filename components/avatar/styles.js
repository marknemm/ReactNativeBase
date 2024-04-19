import { makeStyles } from '@rneui/themed';

/**
 * Gets the styles for the `Avatar` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  container: {
    backgroundColor: props.backgroundColor,
    ...props.containerStyle,
  },
}));
