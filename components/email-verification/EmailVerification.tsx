import ErrorText from '@components/error-text/ErrorText';
import { useSubmitState } from '@hooks/form-hooks';
import { Button, Icon, Text } from '@rneui/themed';
import { View } from 'react-native';
import type { EmailVerificationProps } from './EmailVerification.interfaces';
import { useStyles } from './EmailVerification.styles';

/**
 * A component for displaying email verification status and resending verification emails.
 *
 * @param props The component {@link EmailVerificationProps}.
 * @returns The {@link EmailVerification} component.
 */
const EmailVerification: React.FC<EmailVerificationProps> = ({
  containerStyle,
  isVisibleWhenVerified = false,
  user,
}) => {
  const styles = useStyles({ containerStyle, user });
  const { handleSubmitState, submitError, submitSuccessful, submitting } = useSubmitState();

  const verifiedText = user?.emailVerified
    ? 'Email Verified'
    : 'Email Not Verified   -';
  const verifiedIcon = user?.emailVerified
    ? 'check-circle-outline'
    : 'error-outline';

  return user && (isVisibleWhenVerified || !user.emailVerified) && (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Icon name={verifiedIcon} iconStyle={styles.icon} />
        <Text>{verifiedText}</Text>

        {!user.emailVerified && (
          <Button
            loading={submitting}
            onPress={handleSubmitState(() => user.sendEmailVerification())}
            titleStyle={styles.resendButton}
            title="Resend Email"
            type="clear"
          />
        )}
      </View>

      {submitSuccessful && (
        <Text style={styles.submitSuccessful}>
          Success - please check your email
        </Text>
      )}

      <ErrorText error={submitError} />
    </View>
  );
};

export type * from './EmailVerification.interfaces';
export default EmailVerification;
