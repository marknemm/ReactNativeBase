import type { InfoDialogProps } from '@components/info-dialog/InfoDialog.interfaces';

const MockInfoDialog = jest.fn().mockImplementation((props: InfoDialogProps) => {
  const ActualComponent = jest.requireActual('@components/info-dialog/InfoDialog').default;
  return <ActualComponent {...props} />;
});

export default MockInfoDialog;
