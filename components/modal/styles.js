import { makeStyles } from '@rneui/themed';
import { Dimensions, StyleSheet } from 'react-native';

const modalHorizontalGutter = 16;
const modalVerticalGutter = 80;

/**
 * Gets the styles for the `Modal` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  modal: {
    backgroundColor: theme.colors.white,
    borderRadius: 7,
    height: Dimensions.get('window').height - modalVerticalGutter * 2,
    marginHorizontal: modalHorizontalGutter,
    marginVertical: modalVerticalGutter,
    position: 'absolute',
    width: Dimensions.get('window').width - modalHorizontalGutter * 2,
    ...props.style,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
}));
