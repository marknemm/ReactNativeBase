import { makeStyles } from '@rneui/themed';

/**
 * Gets the styles for the `UserCard` component.
 */
export const useStyles = makeStyles(() => ({
  cardContainer: {
    width: '100%',
  },
  cardInner: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
  },
  content: {
    paddingLeft: 10,
  },
  subtitle: {
    color: 'gray',
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
    textAlign: 'left',
  },
}));
