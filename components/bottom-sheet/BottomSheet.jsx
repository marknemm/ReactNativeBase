import { CLOSE_ICON } from '@constants/icons';
import { useBackdrop } from '@hooks/backdrop-hooks';
import { useCallbacks } from '@hooks/callbacks';
import { Button, BottomSheet as RneBottomSheet, Text } from '@rneui/themed';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The {@link BottomSheet} component.
 *
 * @param {Types.BottomSheet.BottomSheetProps} props The component {@link Types.BottomSheet.BottomSheetProps properties}.
 * @returns {React.JSX.Element} The {@link BottomSheet} component.
 */
export default function BottomSheet(props) {
  const { backdropStyle, children, isVisible, onBackdropPress, onClose, title } = props;
  const styles = useStyles(props);
  useBackdrop({ isVisible, style: backdropStyle });

  return (
    <RneBottomSheet
      {...props}
      backdropStyle={styles.backdrop}
      containerStyle={styles.container}
      onBackdropPress={useCallbacks(onBackdropPress, onClose)}
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
  backdropStyle: PropTypes.object,
  isVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
};
