import { ListItemAccordionProps } from '@rneui/themed';
import { GestureResponderEvent } from 'react-native';

/**
 * The `ExpansionPanel` component properties.
 *
 * @extends ListItemAccordionProps The {@link ListItemAccordionProps} from the '@rneui/themed' package.
 */
export interface Props extends ListItemAccordionProps {

  /**
   * The initial expanded state. Default is `false`.
   */
  initExpanded?: boolean;

  /**
   * The expanded state.
   *
   * If not given, state will be automatically managed internally.
   *
   * If given, the state will be controlled externally, and should be used in conjunction with {@link onPress}.
   */
  isExpanded?: boolean;

  /**
   * The function to call when the expansion panel toggle button is pressed.
   *
   * Can be used to control the expanded state externally.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * The title of the expansion panel toggle button.
   *
   * Ignored if {@link content} is provided.
   */
  title: React.ReactNode | string;

}
