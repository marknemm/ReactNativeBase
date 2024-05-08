import TeaserCard from '@components/teaser-card/TeaserCard';
import { Props } from './props';

/**
 * A user card with an optional surrounding link, avatar image, username, and email.
 *
 * If given an {@link onPress} function, the card will be a link.
 *
 * If not given a {@link user} or the user is anonymous, the card will not be rendered.
 *
 * @param props The component {@link Props}.
 * @returns The {@link UserCard} component.
 */
const UserCard: React.FC<Props> = ({ onPress, user, ...styleProps }) => ((user && !user.isAnonymous)
  ? (
    <TeaserCard
      avatarBackgroundColor={user.backgroundColor}
      avatarRounded
      avatarTitle={user.initials}
      avatarURL={user.photoURL}
      onPress={onPress}
      subtitle={user.email}
      title={user.username}
      {...styleProps}
    />
  )
  : null);

export default UserCard;
