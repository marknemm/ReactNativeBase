import type { UseFormReturn } from 'react-hook-form';
import type { ViewProps } from 'react-native';
import type Form from './Form';

/**
 * The {@link Form} component properties.
 *
 * @extends ViewProps The {@link View} component properties from the `react-native` module.
 */
export interface FormProps extends ViewProps {

  /**
   * The {@link UseFormReturn Form} instance.
   */
  form: UseFormReturn<any>;

}
