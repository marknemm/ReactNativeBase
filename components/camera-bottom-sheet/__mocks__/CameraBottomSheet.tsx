import type { CameraBottomSheetProps } from '@components/camera-bottom-sheet/CameraBottomSheet.interfaces';

const MockCameraBottomSheet = jest.fn().mockImplementation((props: CameraBottomSheetProps) => {
  const ActualComponent = jest.requireActual('@components/camera-bottom-sheet/CameraBottomSheet').default;
  return <ActualComponent {...props} />;
});

export default MockCameraBottomSheet;
