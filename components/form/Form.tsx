import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { Props } from './props';

/**
 * A component that wraps a form and provides form context to its children.
 */
const Form: React.FC<Props> = ({ children, form, style }) => {
  return (
    <FormProvider {...form}>
      <View style={style}>
        {children}
      </View>
    </FormProvider>
  );
}

export default Form;
