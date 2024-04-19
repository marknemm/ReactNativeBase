import { makeStyles } from '@rneui/themed';
import { horizontalGutter, verticalGutter } from '@styles/general-styles';

/**
 * Gets the styles for the `BottomSheet` component.
 */
export const useStyles = makeStyles((theme, props) => ({
  backdrop: {
    backgroundColor: 'transparent', // Use custom backdrop and hide the one in the RNE BottomSheet to prevent awkward slide animation.
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 5,
    top: -5,
  },
  container: {
    backgroundColor: 'transparent',
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
    paddingBottom: verticalGutter * 3,
    paddingTop: verticalGutter,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...props.innerStyle,
  },
  title: {
    flexGrow: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));
