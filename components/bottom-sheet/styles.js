import { makeStyles } from '@rneui/themed';
import { horizontalGutter, verticalGutter } from '@styles/general-styles';

/**
 * Gets the styles for the `BottomSheet` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  backdrop: {
    backgroundColor: theme.colors.grey0,
    opacity: 0.33,
    ...props.backdropStyle,
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 5,
    top: -5,
  },
  header: {
    flex: 1,
    paddingHorizontal: horizontalGutter,
    position: 'relative',
    width: '100%',
    height: 40,
  },
  inner: {
    backgroundColor: theme.colors.background,
    opacity: 1,
    paddingBottom: verticalGutter * 2,
    paddingTop: verticalGutter,
    ...props.innerStyle,
  },
  title: {
    flexGrow: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));
