import BottomSheet from '@components/bottom-sheet/BottomSheet';
import { CAMERA_ICON, PHOTOS_ICON } from '@constants/icons';
import { Icon, ListItem } from '@rneui/themed';
import delay from 'delay';
import { Props } from './props';

/**
 * A {@link BottomSheet} for choosing a photo from the camera or media library.
 *
 * @param props The component {@link Props}.
 * @returns The {@link CameraBottomSheet} component.
 */
const CameraBottomSheet: React.FC<Props> = ({ isVisible, onClose, onPressChoosePhoto, onPressTakePhoto, title }) => (
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

export default CameraBottomSheet;
