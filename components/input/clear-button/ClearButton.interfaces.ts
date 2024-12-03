import type { ButtonProps } from '@rneui/themed';
import type { TextInput } from 'react-native';
import type ClearButton from './ClearButton';

/**
 * The {@link ClearButton} component properties.
 *
 * @extends ButtonProps The {@link ButtonProps} from the `@rneui/themed` module.
 */
export interface ClearButtonProps extends ButtonProps {

  /**
   * The reference to the `Input` component.
   */
  inputRef: React.RefObject<TextInput>;

  /**
   * Whether the {@link ClearButton} is visible.
   */
  isVisible?: boolean;

}
