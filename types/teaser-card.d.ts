import { avatarSizes } from '@rneui/base/dist/Avatar/Avatar';
import { GestureResponderEvent, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * The `TeaserCard` component properties.
 */
export interface TeaserCardProps extends TeaserCardStyleProps {

  /**
   * The {@link IconObject icon} for the avatar.
   */
  avatarIcon?: IconObject;

  /**
   * The title (placeholder) text for the avatar.
   */
  avatarTitle?: string;

  /**
   * The URL for the avatar.
   */
  avatarURL?: string;

  /**
   * The children elements.
   */
  children?: React.ReactNode;

  /**
   * The function to call when the card is pressed.
   *
   * @param event The {@link GestureResponderEvent event} that triggered the press.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * The subtitle text.
   */
  subtitle?: string;

  /**
   * The title text or element.
   */
  title: string | React.ReactNode;

}

/**
 * The `TeaserCard` component style properties.
 */
export interface TeaserCardStyleProps {

  /**
   * The background color for the avatar.
   */
  avatarBackgroundColor?: string;

  /**
   * Whether the avatar is rounded. Defaults to `true`.
   *
   * @default true
   */
  avatarRounded?: boolean;

  /**
   * The size for the avatar. Defaults to `'medium'`
   *
   * @default 'medium'
   */
  avatarSize?: number | 'medium' | 'small' | 'large' | 'xlarge'

  /**
   * The {@link ImageStyle style} for the avatar container.
   */
  avatarStyle?: StyleProp<ImageStyle>;

  /**
   * The {@link TextStyle style} for the avatar title.
   */
  avatarTitleStyle?: StyleProp<TextStyle>;

  /**
   * The {@link ViewStyle style} for the card container.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * The layout of the card content.
   */
  layout?: 'row' | 'column';

  /**
   * The {@link TextStyle style} for the subtitle.
   */
  subtitleStyle?: StyleProp<TextStyle>;

  /**
   * The {@link TextStyle style} for the title.
   */
  titleStyle?: StyleProp<TextStyle>;

}
