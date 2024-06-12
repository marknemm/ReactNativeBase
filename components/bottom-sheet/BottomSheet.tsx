import Backdrop from '@components/backdrop/Backdrop';
import { CLOSE_ICON } from '@constants/icons';
import { useModal } from '@hooks/modal-hooks';
import { useCallbacks } from '@hooks/state-hooks';
import { Button, BottomSheet as RneBottomSheet, Text } from '@rneui/themed';
import { useCallback } from 'react';
import { View } from 'react-native';
import type { BottomSheetProps } from './BottomSheet.interfaces';
import { useStyles } from './BottomSheet.styles';

/**
 * A component for displaying a bottom sheet.
 *
 * @param props The {@link BottomSheetProps}.
 * @returns The {@link BottomSheet} component.
 */
const BottomSheet: React.FC<BottomSheetProps> = (props) => {
  const { backdropStyle, children, isVisible, onBackdropPress, onClose, title } = props;
  const styles = useStyles(props);

  useModal(isVisible, useCallback(() => // Show custom Backdrop to change animation from sliding up to fading in.
    <Backdrop style={backdropStyle} />,
  [backdropStyle]));

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
              accessibilityLabel="Close"
              icon={CLOSE_ICON}
              onPress={onClose}
              size="sm"
              type="clear"
            />
          </View>
        </View>

        {children}
      </View>
    </RneBottomSheet>
  );
};

export type * from './BottomSheet.interfaces';
export default BottomSheet;
