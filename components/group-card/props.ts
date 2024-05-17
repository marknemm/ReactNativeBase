import { StyleProps as TeaserCardStyleProps } from '@components/teaser-card/props';
import { Group } from '@util/group';
import { GestureResponderEvent } from 'react-native';

/**
 * The `GroupCard` component props.
 */
export interface Props extends TeaserCardStyleProps {

  /**
   * The function to call when the card is pressed.
   *
   * @param event The {@link GestureResponderEvent event} that triggered the press.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * The {@link Group} to display.
   */
  group: Group;

}
