import type { UseFormReturn } from 'react-hook-form';
import type { StyleProp, ViewStyle } from 'react-native';
import type Form from './Form';

/**
 * The {@link Form} component properties.
 */
export interface FormProps {

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
