import { makeStyles } from '@rneui/themed';

/**
 * Gets the styles for the `UserAvatar` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  container: {
    backgroundColor: props.backgroundColor,
    ...props.containerStyle,
  },
}));
