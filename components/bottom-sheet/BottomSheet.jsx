import { CLOSE_ICON } from '@constants/icons';
import { Button, BottomSheet as RneBottomSheet, Text } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The `BottomSheet` component.
 *
 * @param {Types.BottomSheet.BottomSheetProps} props The component props.
 * @returns {React.JSX.Element} The bottom sheet.
 */
export default function BottomSheet(props) {
  const { children, onBackdropPress, onClose, title } = props;
  const styles = useStyles(props);

  const onBackdropPressWrapper = useCallback(() => {
    onBackdropPress?.();
    onClose?.();
  }, [onBackdropPress, onClose]);

  return (
    <RneBottomSheet
      {...props}
      backdropStyle={styles.backdrop}
      onBackdropPress={onBackdropPressWrapper}
    >
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>
            { title }
          </Text>
          <View style={styles.closeButtonContainer}>
            <Button
              onPress={onClose}
              icon={CLOSE_ICON}
              type="clear"
              size="sm"
            />
          </View>
        </View>

        {children}
      </View>
    </RneBottomSheet>
  );
}

BottomSheet.propTypes = {
  onBackdropPress: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
};
