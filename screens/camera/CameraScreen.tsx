import Camera from '@components/camera/Camera';
import { ScreenProps } from '@interfaces/screen';

/**
 * Screen that displays a custom {@link Camera} view.
 *
 * @returns The {@link CameraScreen} component.
 */
const CameraScreen: React.FC<ScreenProps> = () =>
  <Camera isActive />;

export default CameraScreen;
