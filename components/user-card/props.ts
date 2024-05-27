import { GestureResponderEvent } from 'react-native';
import User from '@util/user';
import { StyleProps as  TeaserCardStyleProps } from '@components/teaser-card/props';

/**
 * The `UserCard` component properties.
 *
 * @extends TeaserCardStyleProps The {@link TeaserCardStyleProps} from the `@components/teaser-card` package.
 */
export interface Props extends TeaserCardStyleProps {

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
