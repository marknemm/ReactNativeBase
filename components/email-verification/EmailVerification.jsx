import FormError from '@components/form-error/FormError';
import { useSubmitState } from '@hooks/form-hooks';
import { Button, Icon, Text } from '@rneui/themed';
import { User } from '@util/user';
import propTypes from 'prop-types';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The email verification component.
 *
 * @param {object} props The component properties.
 * @param {import('react-native').ViewStyle} [props.containerStyle] The container style.
 * @param {User} props.user The {@link User} object.
 * @param {boolean} [props.visibleVerified=false] Determines if the verified status is visible.
 * @returns {React.JSX.Element} The email verification component.
 */
export default function EmailVerification(props) {
  const { user, visibleVerified = false } = props;
  const styles = useStyles(props);
  const { handleSubmitState, submitError, submitSuccessful, submitting } = useSubmitState();

  const verifiedText = user?.emailVerified
    ? 'Email Verified'
    : 'Email Not Verified   -';
  const verifiedIcon = user?.emailVerified
    ? 'check-circle-outline'
    : 'error-outline';

  return user && (visibleVerified || !user.emailVerified) && (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Icon name={verifiedIcon} iconStyle={styles.icon} />
        <Text>{verifiedText}</Text>

        {!user?.emailVerified && (
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

      <FormError errorMessage={submitError} />
    </View>
  );
}

EmailVerification.propTypes = {
  user: propTypes.instanceOf(User),
  visibleVerified: propTypes.bool,
};
