import { Text } from '@rneui/themed';
import type { ErrorTextProps } from './ErrorText.interfaces';
import { useStyles } from './ErrorText.styles';

/**
 * The {@link ErrorText} component.
 *
 * @param props The component {@link ErrorTextProps}.
 * @returns The {@link ErrorText} component.
 */
const ErrorText: React.FC<ErrorTextProps> = ({
  children,
  error,
  style,
  ...textProps
}) => {
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

export type * from './ErrorText.interfaces';
export default ErrorText;
