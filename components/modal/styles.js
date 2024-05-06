/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

/**
 * Gets the styles for the `Modal` component.
 *
 * @param {object} props The component props.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The style to apply to the modal.
 * @returns The styles for the `Modal` component.
 */
export function useStyles({ style }) {
  return useThemedStyles((theme) => {
    const modalHorizontalGutter = scale(16);
    const modalVerticalGutter = verticalScale(80);

    return {
      modal: {
        backgroundColor: theme.colors.white,
        borderRadius: 7,
        height: Dimensions.get('window').height - modalVerticalGutter * 2,
        marginHorizontal: modalHorizontalGutter,
        marginVertical: modalVerticalGutter,
        position: 'absolute',
        width: Dimensions.get('window').width - modalHorizontalGutter * 2,
        ...StyleSheet.flatten(style),
      },
      modalContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject,
      },
    };
  }, [style]);
}
