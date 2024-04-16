import UserAvatar from '@components/user-avatar/UserAvatar';
import { Button, Card, Text } from '@rneui/themed';
import { User } from '@util/user';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The UserCard component.
 *
 * @param {Object} props The component props.
 * @param {import('react-native').ViewStyle} [props.style] The style for the card container.
 * @param {(event: import('react-native').GestureResponderEvent) => void} [props.onPress] The function to call when the card is pressed.
 * @param {User} props.user The user profile instance.
 * @returns {React.JSX.Element} The UserCard component.
 */
export default function UserCard({ onPress, style, user }) {
  const styles = useStyles();
  if (!user || user.isAnonymous) return null;

  return (
    <Button
      disabled={!onPress}
      onPress={onPress}
      size="lg"
      type="clear"
    >
      <Card
        containerStyle={[styles.cardContainer, style]}
        wrapperStyle={styles.cardInner}
      >
        <UserAvatar
          size="medium"
          user={user}
        />

        <View style={styles.content}>
          <Card.Title style={styles.title}>
            {user.username}
          </Card.Title>
          <Text style={styles.subtitle}>
            {user.email}
          </Text>
        </View>
      </Card>
    </Button>
  );
}

UserCard.propTypes = {
  onPress: PropTypes.func,
  user: PropTypes.instanceOf(User),
};
