import type { StyleProps as TeaserCardStyleProps } from '@components/teaser-card/props';
import type Group from '@util/group';
import type { GestureResponderEvent } from 'react-native';
import type GroupCard from './GroupCard';

/**
 * The {@link GroupCard} component props.
 */
export interface GroupCardProps extends TeaserCardStyleProps {

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
