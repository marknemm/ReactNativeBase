import CameraBottomSheet from '@components/camera-bottom-sheet/CameraBottomSheet';
import { useFormControl } from '@hooks/form-field-hooks';
import { Avatar as RneAvatar } from '@rneui/themed';
import { MediaTypeOptions, launchCamera, launchMediaLibrary } from '@util/camera';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useStyles } from './styles';

/**
 * The {@link Avatar} component.
 *
 * @param {Types.Avatar.AvatarProps} props The component {@link Types.Avatar.AvatarProps properties}.
 * @returns {React.JSX.Element} The {@link Avatar} component.
 * @throws {Error} The `name` property is required when using form controls.
 */
export default function Avatar(props)  {
  const { editable, name, onChange } = props;
  const control = useFormControl(props);

  return (control && editable)
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
}

/**
 * The {@link AvatarControlled} component.
 *
 * @param {Types.Avatar.AvatarProps} props The component {@link Types.Avatar.AvatarProps properties}.
 * @returns {React.JSX.Element} The {@link AvatarControlled} component.
 */
function AvatarControlled(props) {
  const styles = useStyles(props);
  const { description, editable, onChange, onPress, source, value } = props;
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const onPressWrapper = useCallback(() => {
    setBottomSheetVisible(true);
    onPress?.();
  }, [onPress]);

  return (
    <>
      <RneAvatar
        rounded
        {...props}
        containerStyle={styles.container}
        onPress={editable ? onPressWrapper : undefined}
        source={source ?? (value ? { uri: value } : undefined)}
      />

      <CameraBottomSheet
        isVisible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onPressChoosePhoto={async () => {
          const images = await launchMediaLibrary({ mediaTypes: MediaTypeOptions.Images });
          if (images.length) {
            onChange?.(images[0].uri);
          }
        }}
        onPressTakePhoto={async () => {
          const images = await launchCamera({ mediaTypes: MediaTypeOptions.Images });
          if (images.length) {
            onChange?.(images[0].uri);
          }
        }}
        title={`Edit ${description || 'Photo'}`}
      />
    </>
  );
}

Avatar.propTypes = {
  control: PropTypes.object,
  editable: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

AvatarControlled.propTypes = {
  description: PropTypes.string,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  onPress: PropTypes.func,
  source: PropTypes.object,
  value: PropTypes.string,
};
