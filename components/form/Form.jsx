import PropTypes from 'prop-types';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';

/**
 * The {@link Form} component.
 *
 * @param {Object} props The component properties.
 * @param {React.ReactNode} [props.children] The children components.
 * @param {Types.Form.UseFormReturn<any>} props.form The {@link Types.Form.UseFormReturn Form} instance.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The {@link Types.ViewStyle style} to apply to the {@link View}.
 * @returns {React.JSX.Element} The {@link Form} component.
 */
export default function Form({ children, form, style }) {
  return (
    <FormProvider {...form}>
      <View style={style}>
        {children}
      </View>
    </FormProvider>
  );
}

Form.propTypes = {
  form: PropTypes.object.isRequired,
  safeArea: PropTypes.bool,
  scrollable: PropTypes.bool,
};
