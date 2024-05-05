import ScreenView from '@components/screen-view/ScreenView';
import PropTypes from 'prop-types';
import { FormProvider } from 'react-hook-form';

/**
 * The {@link Form} component.
 *
 * @param {Object} props The component properties.
 * @param {React.ReactNode} [props.children] The children components.
 * @param {Types.Form.UseFormReturn<any>} props.form The {@link Types.Form.UseFormReturn Form} instance.
 * @param {boolean} [props.safeArea=false] Whether to apply safe area styling.
 * @param {boolean} [props.scrollable=false] Whether the form is scrollable.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The {@link Types.ViewStyle style} to apply.
 * @returns {React.JSX.Element} The {@link Form} component.
 */
export default function Form({ children, form, safeArea, scrollable, style }) {
  return (
    <FormProvider {...form}>
      <ScreenView
        safeArea={safeArea}
        scrollable={scrollable}
        style={style}
      >
        {children}
      </ScreenView>
    </FormProvider>
  );
}

Form.propTypes = {
  form: PropTypes.object.isRequired,
  safeArea: PropTypes.bool,
  scrollable: PropTypes.bool,
};
