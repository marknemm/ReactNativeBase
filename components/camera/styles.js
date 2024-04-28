import { makeStyles } from '@rneui/themed';

/**
 * Gets the styles for the `Camera` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  camera: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    ...props.style,
  },
}));
