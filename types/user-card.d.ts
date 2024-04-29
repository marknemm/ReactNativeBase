import { GestureResponderEvent } from 'react-native';
import { User } from '@util/user';
import { TeaserCardStyleProps } from './teaser-card';

/**
 * The `UserCard` component properties.
 *
 * @extends TeaserCardStyleProps The {@link TeaserCardStyleProps style properties} for the `TeaserCard` component.
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
