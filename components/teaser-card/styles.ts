/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `TeaserCard` component.
 *
 * @param props The component style props.
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
}: StyleProps) {
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
