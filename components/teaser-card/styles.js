import { makeStyles } from '@rneui/themed';

/**
 * Gets the styles for the `TeaserCard` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  avatar: props.avatarStyle,
  avatarIcon: props.avatarIconStyle,
  avatarTitle: {
    color: 'white',
    ...props.avatarTitleStyle,
  },
  cardContainer: {
    width: '100%',
    ...props.containerStyle,
  },
  cardInner: {
    alignItems: 'center',
    flexDirection: props.layout || 'row',
    margin: 0,
    padding: 0,
    ...props.innerStyle,
  },
  subtitle: {
    color: 'gray',
    ...props.subtitleStyle,
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
    ...props.titleStyle,
  },
}));
