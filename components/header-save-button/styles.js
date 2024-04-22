import { makeStyles } from '@rneui/themed';

/**
 * Gets the styles for the `HeaderSaveButton` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  title: {
    color: 'white',
    ...props.titleStyle,
  },
}));
