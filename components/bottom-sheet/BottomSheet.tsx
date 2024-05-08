import Backdrop from '@components/backdrop/Backdrop';
import { CLOSE_ICON } from '@constants/icons';
import { useModal } from '@hooks/modal-hooks';
import { useCallbacks } from '@hooks/state-hooks';
import { Button, BottomSheet as RneBottomSheet, Text } from '@rneui/themed';
import { View } from 'react-native';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * A component for displaying a bottom sheet.
 */
const BottomSheet: React.FC<Props> = (props) => {
  const { backdropStyle, children, isVisible, onBackdropPress, onClose, title } = props;
  const styles = useStyles(props);

  useModal(isVisible, () => // Show custom Backdrop to change animation from sliding up to fading in.
    <Backdrop style={backdropStyle} />
  );

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

export default BottomSheet;
