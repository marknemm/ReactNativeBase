import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { Props } from './props';

/**
 * A component that wraps a form and provides form context to its children.
 *
 * @param props The component {@link Props}.
 * @returns The {@link Form} component.
 */
const Form: React.FC<Props> = ({ children, form, style }) => (
  <FormProvider {...form}>
    <View style={style}>
      {children}
    </View>
  </FormProvider>
);

export default Form;
