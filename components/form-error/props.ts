import { StyleProp, TextStyle } from 'react-native';

/**
 * The `FormError` component properties.
 */
export interface Props {

  /**
   * Whether the error message is centered.
   */
  center?: boolean;

  /**
   * The error message to display for the form field.
   *
   * `Note`: If controlled with `react-hook-form`, the error message is implicitly derived from {@link rules}.
   * If set explicitly in such a case, the explicit error message will be displayed instead.
   */
  errorMessage?: string;

  /**
   * The {@link TextStyle} for the error message.
   */
  style?: StyleProp<TextStyle>;

}

/**
 * The `FormError` component style properties.
 */
export type StyleProps = Pick<Props, 'center' | 'style'>;