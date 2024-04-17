import { useAppState } from '@react-native-community/hooks';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Camera as VisionCamera, useCameraDevice } from 'react-native-vision-camera';
import { useStyles } from './styles';

/**
 * The {@link Camera} component.
 *
 * @param {Types.Camera.CameraProps} props The component {@link Types.Camera.CameraProps properties}.
 * @returns {React.JSX.Element} The {@link Camera} component.
 */
export default function Camera(props) {
  const styles = useStyles(props);
  const { device, isActive, position, style } = props;
  const cameraDevice = useCameraDevice(position || 'back');
  const isFocused = useIsFocused();
  const appState = useAppState();
  /** @type {React.LegacyRef<VisionCamera>} */
  const ref = useRef();

  const focus = useCallback((point) => {
    if (!ref.current) return;
    ref.current.focus(point);
  }, []);

  const gesture = Gesture.Tap().onEnd(focus);

  return (
    <GestureDetector gesture={gesture}>
      <VisionCamera
        ref={ref}
        {...props}
        device={device ?? cameraDevice}
        isActive={isActive && isFocused && appState === 'active'}
        style={[styles.camera, style]}
      />
    </GestureDetector>
  );
}

Camera.propTypes = {
  device: PropTypes.object,
  position: PropTypes.string,
  isActive: PropTypes.bool,
};
