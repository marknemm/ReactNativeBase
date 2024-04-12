import PropTypes from 'prop-types';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormContext } from './FormContext';

/**
 * A provider for the form context.
 *
 * @param {Object} param0 The component properties.
 * @param {React.ReactNode} [param0.children] The children components.
 * @param {import('react-hook-form').UseFormReturn<any>} param0.form The form instance.
 * @param {boolean} [param0.safeArea=false] Whether to apply safe area styling.
 * @param {import('react-native').ViewStyle | import('react-native').ViewStyle[]} [param0.style={}] The style to apply.
 * @returns {React.JSX.Element} The form provider component.
 */
export default function FormProvider({ children, form, safeArea = false, style = {} }) {
  const formProvider = (
    <FormContext.Provider value={form}>
      {children}
    </FormContext.Provider>
  );

  return safeArea
    ? (
      <SafeAreaView style={style}>
        { formProvider }
      </SafeAreaView>
    ) : (
      <View style={style}>
        { formProvider }
      </View>
    );
}

FormProvider.propTypes = {
  form: PropTypes.any.isRequired,
  safeArea: PropTypes.bool,
};
