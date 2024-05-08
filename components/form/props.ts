import { UseFormReturn } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * The {@link Form} component properties.
 */
export interface Props {

  /**
   * The children components.
   */
  children?: React.ReactNode;

  /**
   * The {@link UseFormReturn Form} instance.
   */
  form: UseFormReturn<any>;

  /**
   * The {@link ViewStyle style} to apply to the {@link View}.
   */
  style?: StyleProp<ViewStyle>;

}
