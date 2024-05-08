/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `SignInModal` component.
 *
 * @param props The component style props.
 * @returns The styles for the `SignInModal` component.
 */
export function useStyles({ promptStyle, style }: StyleProps) {
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
