/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `SignInModal` component.
 *
 * @param {object} props The component props.
 * @param {Types.StyleProp<Types.TextStyle>} [props.promptStyle] The style to apply to the prompt.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The style to apply to the modal.
 * @returns The styles for the `SignInModal` component.
 */
export function useStyles({ promptStyle, style }) {
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
