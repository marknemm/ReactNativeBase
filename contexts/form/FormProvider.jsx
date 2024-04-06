import PropTypes from 'prop-types';
import { View } from 'react-native';
import { FormContext } from './FormContext';

/**
 * A provider for the form context.
 *
 * @param {Object} param0 The component properties.
 * @param {React.ReactNode} [param0.children] The children components.
 * @param {import('react-hook-form').UseFormReturn<any>} param0.form The form instance.
 * @param {import('react-native').ViewStyle} [param0.style={}] The style to apply.
 * @returns {React.JSX.Element} The form provider component.
 */
export default function FormProvider({ children, form, style = {} }) {
  return (
    <View style={style}>
      <FormContext.Provider value={form}>
        {children}
      </FormContext.Provider>
    </View>
  );
}

FormProvider.propTypes = {
  form: PropTypes.any.isRequired,
};
