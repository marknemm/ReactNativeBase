import BottomSheet from '@components/bottom-sheet/BottomSheet';
import { CAMERA_ICON, PHOTOS_ICON } from '@constants/icons';
import { Icon, ListItem } from '@rneui/themed';
import delay from 'delay';
import PropTypes from 'prop-types';

/**
 * The {@link CameraBottomSheet} component.
 *
 * @param {object} param0 The component properties.
 * @param {boolean} [param0.isVisible] Whether the bottom sheet is visible.
 * @param {() => void} [param0.onClose] The function to call when the bottom sheet is to be closed.
 * @param {() => void} [param0.onPressChoosePhoto] The function to call when the choose photo button is pressed.
 * @param {() => void} [param0.onPressTakePhoto] The function to call when the take photo button is pressed.
 * @param {string} [param0.title] The description.
 * @returns {React.JSX.Element} The {@link CameraBottomSheet} component.
 */
export default function CameraBottomSheet({ isVisible, onClose, onPressChoosePhoto, onPressTakePhoto, title }) {
  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title={title}
    >
      <ListItem
        onPress={async () => {
          onClose?.();
          await delay(200); // Prevent bottom sheet close from blocking camera opening
          onPressTakePhoto?.();
        }}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>Take Photo</ListItem.Title>
        </ListItem.Content>
        <Icon {...CAMERA_ICON} color="grey" />
      </ListItem>
      <ListItem
        onPress={async () => {
          onClose?.();
          await delay(200); // Prevent bottom sheet close from blocking media library opening
          onPressChoosePhoto?.();
        }}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>Choose Photo</ListItem.Title>
        </ListItem.Content>
        <Icon {...PHOTOS_ICON} color="grey" />
      </ListItem>
    </BottomSheet>
  );
}

CameraBottomSheet.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onPressChoosePhoto: PropTypes.func,
  onPressTakePhoto: PropTypes.func,
  title: PropTypes.string,
};
