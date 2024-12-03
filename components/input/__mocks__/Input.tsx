import type { InputProps } from '@components/input/Input.interfaces';

const MockInput = jest.fn().mockImplementation((props: InputProps) => {
  const ActualComponent = jest.requireActual('@components/input/Input').default;
  return <ActualComponent {...props} />;
});

export default MockInput;
