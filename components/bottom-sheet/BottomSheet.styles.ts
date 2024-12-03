import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import type BottomSheet from './BottomSheet';
import type { BottomSheetStyleProps } from './BottomSheet.interfaces';

/**
 * Gets the styles for the {@link BottomSheet} component.
 *
 * @param props The {@link BottomSheetStyleProps}.
 * @returns The styles for the {@link BottomSheet} component.
 */
export function useStyles({ innerStyle }: BottomSheetStyleProps) {
  return useThemedStyles((theme) => ({
    backdrop: {
      backgroundColor: 'transparent', // Use custom backdrop and hide the one in the RNE BottomSheet to prevent awkward slide animation.
    },
    closeButtonContainer: {
      position: 'absolute',
      right: theme.spacing.xs,
      top: -theme.spacing.xs,
    },
    container: {
      backgroundColor: 'transparent',
    },
    header: {
      flex: 1,
      paddingHorizontal: theme.spacing.sm,
      position: 'relative',
      width: '100%',
      height: 40,
    },
    inner: {
      backgroundColor: theme.colors.background,
      opacity: 1,
      paddingBottom: theme.spacing.lg * 3,
      paddingTop: theme.spacing.lg,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      ...StyleSheet.flatten(innerStyle),
    },
    title: {
      flexGrow: 1,
      fontSize: theme.font.size.large,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }), [innerStyle]);
}
