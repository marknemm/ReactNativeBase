import type { TeaserCardStyleProps } from '@components/teaser-card/TeaserCard.interfaces';
import type User from '@util/user';
import type { GestureResponderEvent } from 'react-native';
import type UserCard from './UserCard';

/**
 * The {@link UserCard} component properties.
 *
 * @extends TeaserCardStyleProps The {@link TeaserCardStyleProps} from the `@components/teaser-card` module.
 */
export interface UserCardProps extends TeaserCardStyleProps {

  /**
   * The function to call when the card is pressed.
   *
   * @param event The {@link GestureResponderEvent event} that triggered the press.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * The {@link User} profile instance.
   */
  user: User;

}
