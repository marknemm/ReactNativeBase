import { Text } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

/**
 * The {@link FormError} component.
 *
 * @param {object} props The component properties.
 * @param {string} props.errorMessage The error message to display.
 * @param {Types.StyleProp<Types.TextStyle>} props.style The custom {@link Types.TextStyle style}.
 * @returns {React.JSX.Element} The {@link FormError} component.
 */
export default function FormError({ errorMessage, ...props }) {
  const styles = useStyles(props);

  return errorMessage
    ? (
      <Text style={styles.formError}>
        {`${errorMessage}`}
      </Text>
    )
    : null; // Do not render anything if there is no error message.
}

FormError.propTypes = {
  errorMessage: PropTypes.string,
};
