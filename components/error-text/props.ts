import { TextProps } from '@rneui/themed';

/**
 * The `ErrorText` component properties.
 */
export interface Props extends TextProps {

  /**
   * The {@link Error} or error message to display.
   */
  error?: Error | string;

}

/**
 * The `ErrorText` component style properties.
 */
export type StyleProps = Pick<Props, 'center' | 'h1Style' | 'h2Style' | 'h3Style' | 'h4Style' | 'style'>;
