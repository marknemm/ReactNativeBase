import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import type SignInModal from './SignInModal';
import type { SignInModalStyleProps } from './SignInModal.interfaces';

/**
 * Gets the styles for the {@link SignInModal} component.
 *
 * @param props The component {@link SignInModalStyleProps}.
 * @returns The styles for the {@link SignInModal} component.
 */
export function useStyles({ promptStyle, style }: SignInModalStyleProps) {
  return useThemedStyles((theme) => ({
    modal: {
      height: 'auto',
      maxHeight: '90%',
      paddingBottom: theme.spacing.lg,
      ...StyleSheet.flatten(style),
    },
    prompt: {
      color: theme.colors.grey1,
      fontSize: theme.font.size.large,
      paddingVertical: theme.spacing.lg,
      textAlign: 'center',
      ...StyleSheet.flatten(promptStyle),
    },
    promptContainer: {
      borderBottomColor: theme.colors.grey5,
      borderBottomWidth: 1,
    },
  }), [promptStyle, style]);
}
