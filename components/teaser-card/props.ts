import { IconObject } from '@rneui/base';
import { CardProps } from '@rneui/themed';
import { ColorValue, GestureResponderEvent, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * The `TeaserCard` component properties.
 */
export interface Props extends CardProps {

  /**
   * The children elements.
   */
  children?: React.ReactNode;

  /**
   * The {@link ViewStyle style} for the card container.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * The {@link IconObject icon}.
   *
   * Ignored if {@link photoURL} is set.
   */
  icon?: IconObject;

  /**
   * The {@link ImageStyle} for the icon.
   */
  iconStyle?: StyleProp<ImageStyle>;

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
   * The placeholder text for the photo.
   *
   * Ignored if {@link photoURL} or {@link icon} is set.
   */
  photoPlaceholder?: string;

  /**
   * The background color for the photo placeholder.
   *
   * Ignored if {@link photoURL} is set.
   */
  photoPlaceholderBg?: ColorValue;

  /**
   * The {@link TextStyle} for the photo placeholder.
   */
  photoPlaceholderStyle?: StyleProp<TextStyle>;

  /**
   * Whether the photo / icon is rounded. Defaults to `true`.
   *
   * @default true
   */
  photoRounded?: boolean;

  /**
   * The size for the photo / icon. Defaults to `'medium'`
   *
   * @default 'medium'
   */
  photoSize?: number | 'medium' | 'small' | 'large' | 'xlarge'

  /**
   * The {@link ImageStyle} for the photo container.
   */
  photoStyle?: StyleProp<ImageStyle>;

  /**
   * The URL for the photo.
   */
  photoURL?: string;

  /**
   * The subtitle text.
   */
  subtitle?: string;

  /**
   * The number of lines for the subtitle.
   *
   * @default 1
   */
  subtitleNumberOfLines?: number;

  /**
   * The {@link TextStyle} for the subtitle.
   */
  subtitleStyle?: StyleProp<TextStyle>;

  /**
   * The title text or element.
   */
  title?: string | React.ReactNode;

  /**
   * The number of lines for the title.
   *
   * @default 2
   */
  titleNumberOfLines?: number;

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
  'containerStyle' | 'iconStyle' | 'layout' | 'innerStyle'
  | 'photoPlaceholderStyle' | 'photoRounded' | 'photoStyle' | 'subtitleStyle' | 'titleStyle'
>;
