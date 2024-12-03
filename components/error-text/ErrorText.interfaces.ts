import type { TextProps } from '@rneui/themed';
import type ErrorText from './ErrorText';

/**
 * The {@link ErrorText} component properties.
 */
export interface ErrorTextProps extends TextProps {

  /**
   * The {@link Error} or error message to display.
   */
  error?: Error | string;

}

/**
 * The {@link ErrorText} component style properties.
 */
export type ErrorTextStyleProps = Pick<
  ErrorTextProps,
  'center' | 'h1Style' | 'h2Style' | 'h3Style' | 'h4Style' | 'style'
>;
