/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `TeaserCard` component.
 *
 * @param {object} props The component props.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.avatarStyle] The style to apply to the avatar.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.avatarIconStyle] The style to apply to the avatar icon.
 * @param {Types.StyleProp<Types.TextStyle>} [props.avatarTitleStyle] The style to apply to the avatar title.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.containerStyle] The style to apply to the container.
 * @param {'row' | 'column'} [props.layout] The layout of the card.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.innerStyle] The style to apply to the inner container.
 * @param {Types.StyleProp<Types.TextStyle>} [props.subtitleStyle] The style to apply to the subtitle.
 * @param {Types.StyleProp<Types.TextStyle>} [props.titleStyle] The style to apply to the title.
 * @returns The styles for the `TeaserCard` component.
 */
export function useStyles({
  avatarStyle,
  avatarIconStyle,
  avatarTitleStyle,
  containerStyle,
  layout,
  innerStyle,
  subtitleStyle,
  titleStyle,
}) {
  return useThemedStyles(() => ({
    avatar: StyleSheet.flatten(avatarStyle),
    avatarIcon: StyleSheet.flatten(avatarIconStyle),
    avatarTitle: {
      color: 'white',
      ...StyleSheet.flatten(avatarTitleStyle),
    },
    cardContainer: {
      width: '100%',
      ...StyleSheet.flatten(containerStyle),
    },
    cardInner: {
      alignItems: 'center',
      flexDirection: layout || 'row',
      margin: 0,
      padding: 0,
      ...StyleSheet.flatten(innerStyle),
    },
    subtitle: {
      color: 'gray',
      ...StyleSheet.flatten(subtitleStyle),
    },
    textContent: {
      alignContent: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    title: {
      fontSize: 22,
      marginBottom: 5,
      textAlign: 'left',
      ...StyleSheet.flatten(titleStyle),
    },
  }), [avatarStyle, avatarIconStyle, avatarTitleStyle, containerStyle, layout, innerStyle, subtitleStyle, titleStyle]);
}
