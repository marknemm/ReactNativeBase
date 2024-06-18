import type { BottomSheetProps } from '@components/bottom-sheet/BottomSheet.interfaces';

const MockBottomSheet = jest.fn().mockImplementation((props: BottomSheetProps) => {
  const ActualComponent = jest.requireActual('@components/bottom-sheet/BottomSheet').default;
  return <ActualComponent {...props} />;
});

export default MockBottomSheet;
