import CameraBottomSheet from '@components/camera-bottom-sheet/CameraBottomSheet';
import { useFormControl } from '@hooks/form-hooks';
import { useCallbacks } from '@hooks/state-hooks';
import { Avatar as RneAvatar } from '@rneui/themed';
import { launchCamera, launchMediaLibrary } from '@util/camera';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { IMAGE_PICKER_OPTIONS } from './constants';
import { AvatarFC, Props } from './props';
import { useStyles } from './styles';

/**
 * Component that displays an editable avatar image.
 *
 * @param props The component {@link Props}.
 * @param ref The component reference.
 * @returns The {@link Avatar} component.
 */
const Avatar: AvatarFC = forwardRef((props, ref) => {
  const { editable, name, onChange } = props;
  const control = useFormControl(props, !editable);

  return (control && name)
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
            ref={ref}
            value={value}
          />
        )}
      />
    )
    : <AvatarControlled {...props} ref={ref} />;
});

/**
 * The controlled {@link Avatar} component.
 *
 * @param props The component {@link Props}.
 * @param ref The component reference.
 * @returns The {@link AvatarControlled} component.
 */
const AvatarControlled: AvatarFC = forwardRef((props, ref) => {
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
        ref={ref}
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
});

export default Avatar;
