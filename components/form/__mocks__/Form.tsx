import type { FormProps } from '@components/form/Form.interface';

const FormMock = jest.fn().mockImplementation((props: FormProps) => {
  const ActualComponent = jest.requireActual('@components/form/Form').default;
  return <ActualComponent {...props} />;
});

export default FormMock;
