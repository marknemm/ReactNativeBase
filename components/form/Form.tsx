import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { FormProps } from './Form.interface';

/**
 * A component that wraps a form and provides form context to its children.
 *
 * @param props The component {@link FormProps}.
 * @returns The {@link Form} component.
 */
const Form: React.FC<FormProps> = ({ children, form, style }) => (
  <FormProvider {...form}>
    <View style={style}>
      {children}
    </View>
  </FormProvider>
);

export default Form;
