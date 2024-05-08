import CameraBottomSheet from '@components/camera-bottom-sheet/CameraBottomSheet';
import { useFormControl } from '@hooks/form-hooks';
import { useCallbacks } from '@hooks/state-hooks';
import { Avatar as RneAvatar } from '@rneui/themed';
import { CameraType, ImagePickerOptions, MediaTypeOptions, launchCamera, launchMediaLibrary } from '@util/camera';
import { useCallback, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useStyles } from './styles';
import { Props } from './props';

/**
 * The {@link Avatar} component's image picker and camera {@link ImagePickerOptions options}.
 */
const IMAGE_PICKER_OPTIONS: ImagePickerOptions = {
  allowsEditing: true,
  aspect: [1, 1],
  cameraType: CameraType.front,
  mediaTypes: MediaTypeOptions.Images,
};

/**
 * Component that displays an editable avatar image.
 *
 * @param props The component {@link Props}.
 * @returns The {@link Avatar} component.
 */
const Avatar: React.FC<Props> = (props) => {
  const { name, onChange } = props;
  const control = useFormControl(props);

  return control
    ? (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange: onChangeForm, value } }) => (
          <AvatarControlled
            {...props}
            onChange={(uri) => {
              onChange?.(uri);
              onChangeForm(uri);
            }}
            value={value}
          />
        )}
      />
    )
    : <AvatarControlled {...props} />;
};

/**
 * The controlled {@link Avatar} component.
 *
 * @param props The component {@link Props}.
 * @returns The {@link AvatarControlled} component.
 */
const AvatarControlled: React.FC<Props> = (props) => {
  const styles = useStyles(props);
  const { description, editable, onChange, onPress, source, value } = props;
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const onPressWrapper = useCallbacks(
    useCallback(() => setBottomSheetVisible(true), []),
    onPress
  );

  const sourceMemo = useMemo(() =>
    source ?? (value ? { uri: value } : undefined),
  [source, value]);

  return (
    <>
      <RneAvatar
        {...props}
        containerStyle={styles.container}
        onPress={editable ? onPressWrapper : undefined}
        source={sourceMemo}
      />

      <CameraBottomSheet
        isVisible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onPressChoosePhoto={async () => {
          const images = await launchMediaLibrary(IMAGE_PICKER_OPTIONS);
          if (images.length) {
            onChange?.(images[0].uri);
          }
        }}
        onPressTakePhoto={async () => {
          const images = await launchCamera(IMAGE_PICKER_OPTIONS);
          if (images.length) {
            onChange?.(images[0].uri);
          }
        }}
        title={`Edit ${description || 'Photo'}`}
      />
    </>
  );
};

export default Avatar;
