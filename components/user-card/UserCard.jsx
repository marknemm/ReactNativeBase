import TeaserCard from '@components/teaser-card/TeaserCard';
import { User } from '@util/user';
import PropTypes from 'prop-types';

/**
 * The {@link UserCard} component.
 *
 * @param {Types.UserCard.UserCardProps} props The component {@link Types.UserCard.UserCardProps properties}.
 * @returns {React.JSX.Element} The {@link UserCard} component.
 */
export default function UserCard({ onPress, user, ...styleProps }) {
  return (user && !user.isAnonymous)
    ? (
      <TeaserCard
        avatarBackgroundColor={user.backgroundColor}
        avatarTitle={user.initials}
        avatarURL={user.photoURL}
        onPress={onPress}
        subtitle={user.email}
        title={user.username}
        {...styleProps}
      />
    )
    : null;
}

UserCard.propTypes = {
  onPress: PropTypes.func,
  user: PropTypes.instanceOf(User),
};
