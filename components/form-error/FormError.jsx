/* eslint-disable react/destructuring-assignment */
import { useFormErrorMessage } from '@hooks/form-hooks';
import { Text } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { useStyles } from './styles';

/**
 * The {@link FormError} component.
 *
 * @param {Types.Form.FormErrorProps} props The component {@link Types.Form.FormErrorProps properties}.
 * @returns {React.JSX.Element} The {@link FormError} component.
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
