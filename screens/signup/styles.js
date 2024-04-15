import { horizontalGutter } from '@styles/general-styles';
import { StyleSheet } from 'react-native';

/**
 * The signup screen styles.
 */
export const styles = StyleSheet.create({
  formError: {
    marginTop: 10,
    textAlign: 'center',
  },
  formField: {
    marginBottom: 5,
  },
  submitButton: {
    marginBottom: 10,
    marginHorizontal: horizontalGutter,
  },
});
