import { Text } from '@rneui/themed';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * The {@link FormError} component.
 *
 * @param {object} props The component properties.
 * @param {string} props.errorMessage The error message to display.
 * @param {Types.StyleProp<Types.TextStyle>} [props.style] The custom {@link Types.TextStyle style}.
 * @returns {React.JSX.Element} The {@link FormError} component.
 */
const FormError: React.FC<Props> = ({ center, errorMessage, style }) => {
  const styles = useStyles({ center, style });

  return errorMessage
    ? (
      <Text style={styles.formError}>
        {`${errorMessage}`}
      </Text>
    )
    : null; // Do not render anything if there is no error message.
}

export default FormError;
