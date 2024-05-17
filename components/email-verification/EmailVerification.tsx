import ErrorText from '@components/error-text/ErrorText';
import { useSubmitState } from '@hooks/form-hooks';
import { Button, Icon, Text } from '@rneui/themed';
import { View } from 'react-native';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * A component for displaying email verification status and resending verification emails.
 *
 * @param props The component {@link Props}.
 * @returns The {@link EmailVerification} component.
 */
const EmailVerification: React.FC<Props> = ({ containerStyle, user, isVerifiedVisible = false }) => {
  const styles = useStyles({ containerStyle, user });
  const { handleSubmitState, submitError, submitSuccessful, submitting } = useSubmitState();

  const verifiedText = user?.emailVerified
    ? 'Email Verified'
    : 'Email Not Verified   -';
  const verifiedIcon = user?.emailVerified
    ? 'check-circle-outline'
    : 'error-outline';

  return user && (isVerifiedVisible || !user.emailVerified) && (
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

export default EmailVerification;
