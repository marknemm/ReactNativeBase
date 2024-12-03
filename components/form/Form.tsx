import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import type { FormProps } from './Form.interface';

/**
 * A component that wraps a form and provides form context to its children.
 *
 * @param props The component {@link FormProps}.
 * @returns The {@link Form} component.
 */
const Form: React.FC<FormProps> = ({ children, form, style, ...restViewProps }) => (
  <FormProvider {...form}>
    <View
      style={style}
      testID="rnb-form-view"
      {...restViewProps}
    >
      {children}
    </View>
  </FormProvider>
);

export type * from './Form.interface';
export default Form;
