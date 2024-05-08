import { DialogProps } from '@rneui/base';

/**
 * The `InfoDialog` component properties.
 *
 * @extends DialogProps The {@link DialogProps} from the `@rneui/base` package.
 */
export interface Props extends DialogProps {

  /**
   * The children components to display in the `InfoDialog`.
   */
  children?: React.ReactNode;

  /**
   * The visibility of the `InfoDialog`.
   */
  isVisible?: boolean;

  /**
   * The function to call when the `InfoDialog` is closed.
   */
  onClose?: () => void;

  /**
   * The title of the `InfoDialog`.
   */
  title?: React.ReactNode | string;

}
