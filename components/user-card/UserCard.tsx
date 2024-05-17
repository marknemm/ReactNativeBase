import TeaserCard from '@components/teaser-card/TeaserCard';
import { Props } from './props';

/**
 * A user card with an image, username, and email.
 *
 * If not given a {@link user} or the {@link user} is anonymous, the card will not be rendered.
 *
 * @param props The component {@link Props}.
 * @returns The {@link UserCard} component.
 */
const UserCard: React.FC<Props> = ({ user, ...restProps }) => ((user && !user.isAnonymous)
  ? (
    <TeaserCard
      photoPlaceholder={user.initials}
      photoPlaceholderBg={user.backgroundColor}
      photoURL={user.photoURL}
      subtitle={user.email}
      title={user.username}
      {...restProps}
    />
  )
  : null);

export default UserCard;
