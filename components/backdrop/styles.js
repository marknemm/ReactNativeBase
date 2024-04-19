import { makeStyles } from '@rneui/themed';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `Backdrop` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  backdrop: {
    backgroundColor: `${theme.colors.grey0}33`,
    ...StyleSheet.absoluteFillObject,
    ...props.style,
  },
}));
