import { useAppState } from '@react-native-community/hooks';
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Point, Camera as VisionCamera, useCameraDevice } from 'react-native-vision-camera';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * A component for displaying a custom camera view.
 *
 * @param props The component {@link Props}.
 * @returns The {@link Camera} component.
 */
const Camera: React.FC<Props> = (props) => {
  const { device, isActive, position } = props;
  const styles = useStyles(props);
  const cameraDevice = useCameraDevice(position || 'back');
  const isFocused = useIsFocused();
  const appState = useAppState();
  const ref = useRef<VisionCamera>();

  const focus = useCallback((point: Point) => {
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
        style={styles.camera}
      />
    </GestureDetector>
  );
};

export default Camera;
