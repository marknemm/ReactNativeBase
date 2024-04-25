import { makeStyles } from '@rneui/themed';
import { StyleSheet } from 'react-native';

const modalHorizontalGutter = 16;
const modalVerticalGutter = 80;

/**
 * Gets the styles for the `Modal` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  modal: {
    backgroundColor: theme.colors.white,
    borderRadius: 7,
    height: '100%',
    position: 'absolute',
    width: '100%',
    ...props.style,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: modalHorizontalGutter,
    paddingVertical: modalVerticalGutter,
    ...StyleSheet.absoluteFillObject,
  },
}));
