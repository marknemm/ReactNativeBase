import TeaserCard from '@components/teaser-card/TeaserCard';
import type { GroupCardProps } from './GroupCard.interfaces';

/**
 * A card that teases a {@link Group}.
 *
 * If not given a {@link group}, the card will not be rendered.
 *
 * @returns The {@link GroupCard} component.
 */
const GroupCard: React.FC<GroupCardProps> = ({ group, ...restProps }) =>
  group && (
    <TeaserCard
      photoPlaceholder={group.initials}
      photoPlaceholderBg={group.backgroundColor}
      photoURL={group.photoURL}
      title={group.name}
      subtitle={group.description}
      {...restProps}
    />
  );

export type * from './GroupCard.interfaces';
export default GroupCard;
