import { User } from '@util/user';
import PropTypes from 'prop-types';
import { Card } from '@rneui/themed';
import UserAvatar from '@components/user-avatar/UserAvatar';

/**
 * The UserCard component.
 *
 * @param {Object} props The component props.
 * @param {User} props.user The user profile instance.
 * @returns {React.JSX.Element} The UserCard component.
 */
export default function UserCard({ user }) {
  if (!user) return null;

  return (
    <Card>
      <UserAvatar user={user} />
      <Card.Title>{user.displayName}</Card.Title>
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.instanceOf(User),
};
