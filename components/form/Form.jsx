import PropTypes from 'prop-types';
import { FormProvider } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * The {@link Form} component.
 *
 * @param {Object} param0 The component properties.
 * @param {React.ReactNode} [param0.children] The children components.
 * @param {Types.Form.UseFormReturn<any>} param0.form The {@link Types.Form.UseFormReturn Form} instance.
 * @param {boolean} [param0.safeArea=false] Whether to apply safe area styling.
 * @param {boolean} [param0.scrollable=false] Whether the form is scrollable.
 * @param {import('react-native').ViewStyle | import('react-native').ViewStyle[]} [param0.style={}] The style to apply.
 * @returns {React.JSX.Element} The {@link Form} component.
 */
export default function Form({ children, form, safeArea = false, scrollable = false, style = {} }) {
  const formProvider = (
    <FormProvider {...form}>
      {children}
    </FormProvider>
  );

  if (scrollable) {
    return safeArea
      ? (
        <ScrollView>
          <SafeAreaView style={style}>
            { formProvider }
          </SafeAreaView>
        </ScrollView>
      )
      : (
        <ScrollView style={style}>
          { formProvider }
        </ScrollView>
      );
  }

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

Form.propTypes = {
  form: PropTypes.any.isRequired,
  safeArea: PropTypes.bool,
  scrollable: PropTypes.bool,
};
