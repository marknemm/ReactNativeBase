type CameraModule = typeof import('@util/camera');
const CameraMock = jest.createMockFromModule<CameraModule>('@util/camera');

CameraMock.launchCamera = jest.fn().mockResolvedValue([{ uri: 'camera.jpg' }]);
CameraMock.launchMediaLibrary = jest.fn().mockResolvedValue([{ uri: 'media.jpg' }]);

/**
 * Camera mock functions.
 */
export const { launchCamera, launchMediaLibrary } = CameraMock;
export default CameraMock;
