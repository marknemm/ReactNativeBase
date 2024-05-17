import { Text } from '@rneui/themed';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * The {@link ErrorText} component.
 *
 * @param props The component {@link Props}.
 * @returns The {@link ErrorText} component.
 */
const ErrorText: React.FC<Props> = ({ children, error, style, ...textProps }) => {
  const styles = useStyles({ style });

  return (children || error) && (
    <Text
      style={styles.style}
      {...textProps}
    >
      {
        children || ((error instanceof Error)
          ? error.message
          : error)
      }
    </Text>
  );
};

export default ErrorText;
