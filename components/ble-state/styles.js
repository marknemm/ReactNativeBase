import { makeStyles } from '@rneui/themed';

/**
 * Gets the styles for the `BleState` component.
 */
export const useStyles = makeStyles(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    flexGrow: 1,
  },
  tooltipText: {
    color: 'white',
  },
}));
