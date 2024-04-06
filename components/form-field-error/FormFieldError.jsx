import { useFormErrorMessage } from '@hooks/form-field-hooks';
import { Text } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';

/**
 * The form field error component.
 *
 * @param {import('@typedefs/form-field').FormFieldProps} props The component properties.
 * @returns {React.JSX.Element} The form field error component.
 */
export default function FormFieldError(props) {
  const errorMessage = useFormErrorMessage(props);

  return errorMessage
    ? (
      <Text style={[generalStyles.errorText, generalStyles.horizontalGutter]}>
        {`${errorMessage}`}
      </Text>
    )
    : null; // Do not render anything if there is no error message.
}
