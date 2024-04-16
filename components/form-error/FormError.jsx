/* eslint-disable react/destructuring-assignment */
import { useFormErrorMessage } from '@hooks/form-field-hooks';
import { Text } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { useStyles } from './styles';

/**
 * The form field error component.
 *
 * @param {Types.FormField.FormFieldErrorProps} props The component {@link Types.FormField.FormFieldErrorProps properties}.
 * @returns {React.JSX.Element} The form field error component.
 */
export default function FormError(props) {
  const styles = useStyles();
  const errorMessage = useFormErrorMessage(props);

  return errorMessage
    ? (
      <Text style={[styles.formError, generalStyles.horizontalGutter, props.style]}>
        {`${errorMessage}`}
      </Text>
    )
    : null; // Do not render anything if there is no error message.
}
