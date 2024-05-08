import { FixedIconButtonProps } from '@interfaces/button';

/**
 * The `InfoButton` component props.
 *
 * @extends FixedIconButtonProps The {@link FixedIconButtonProps} from the `@interfaces/button` package.
 */
export interface Props extends FixedIconButtonProps {

  /**
   * The children components to display in the `InfoDialog`.
   *
   * The button will only display the `InfoDialog` if this prop is provided.
   */
  children?: React.ReactNode;

  /**
   * The title of the `InfoDialog`.
   *
   * Ignored if {@link children} is not provided.
   */
  dialogTitle?: React.ReactNode | string;

}
