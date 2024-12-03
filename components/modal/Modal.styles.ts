import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import type Modal from './Modal';
import type { ModalStyleProps } from './Modal.interfaces';

/**
 * Gets the styles for the {@link Modal} component.
 *
 * @param props The component props.
 * @returns The styles for the {@link Modal} component.
 */
export function useStyles({ style }: ModalStyleProps) {
  const dimensions = useWindowDimensions();

  return useThemedStyles((theme) => {
    const modalHorizontalGutter = scale(16);
    const modalVerticalGutter = verticalScale(80);

    return {
      modal: {
        backgroundColor: theme.colors.white,
        borderRadius: 7,
        height: dimensions.height - modalVerticalGutter * 2,
        marginHorizontal: modalHorizontalGutter,
        marginVertical: modalVerticalGutter,
        position: 'absolute',
        width: dimensions.width - modalHorizontalGutter * 2,
        ...StyleSheet.flatten(style),
      },
      modalContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject,
      },
    };
  }, [dimensions, style]);
}
