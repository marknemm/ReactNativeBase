import { IconObject } from '@rneui/base';
import { CardProps } from '@rneui/themed';
import { ColorValue, GestureResponderEvent, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * The `TeaserCard` component properties.
 */
export interface Props extends CardProps {

  /**
   * The background color for the avatar.
   */
  avatarBackgroundColor?: ColorValue;

  /**
   * The {@link IconObject icon} for the avatar.
   */
  avatarIcon?: IconObject;

  /**
   * The {@link ImageStyle} for the avatar.
   */
  avatarIconStyle?: StyleProp<ImageStyle>;

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
   * The {@link ImageStyle} for the avatar container.
   */
  avatarStyle?: StyleProp<ImageStyle>;

  /**
   * The title (placeholder) text for the avatar.
   */
  avatarTitle?: string;

  /**
   * The {@link TextStyle} for the avatar title.
   */
  avatarTitleStyle?: StyleProp<TextStyle>;

  /**
   * The URL for the avatar.
   */
  avatarURL?: string;

  /**
   * The children elements.
   */
  children?: React.ReactNode;

  /**
   * The {@link ViewStyle style} for the card container.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * The {@link ViewStyle} for the inner container.
   */
  innerStyle?: StyleProp<ViewStyle>;

  /**
   * The layout of the card content.
   */
  layout?: 'row' | 'column';

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
   * The {@link TextStyle} for the subtitle.
   */
  subtitleStyle?: StyleProp<TextStyle>;

  /**
   * The title text or element.
   */
  title?: string | React.ReactNode;

  /**
   * The {@link TextStyle} for the title.
   */
  titleStyle?: StyleProp<TextStyle>;

}

/**
 * The `TeaserCard` component style properties.
 */
export type StyleProps = Pick<
  Props,
  'avatarStyle' | 'avatarIconStyle' | 'avatarTitleStyle' | 'containerStyle'
  | 'layout' | 'innerStyle' | 'subtitleStyle' | 'titleStyle'
>;
