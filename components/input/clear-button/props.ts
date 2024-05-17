import { ButtonProps } from '@rneui/themed';
import { TextInput } from 'react-native';

/**
 * The `ClearButton` component properties.
 */
export interface Props extends ButtonProps {

  /**
   * The reference to the `Input` component.
   */
  inputRef: React.RefObject<TextInput>;

  /**
   * Whether the `ClearButton` is visible.
   */
  isVisible?: boolean;

}
