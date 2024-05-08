import Camera from '@components/camera/Camera';
import { ScreenProps } from '@interfaces/screen';

/**
 * Screen that displays a custom {@link Camera} view.
 */
const CameraScreen: React.FC<ScreenProps> = () => {
  return (
    <Camera isActive />
  );
}

export default CameraScreen;
