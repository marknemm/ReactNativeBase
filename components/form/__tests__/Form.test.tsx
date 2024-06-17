import Form from '@components/form/Form';
import Input from '@components/input/Input';
import { genMockForm, type DefaultMockFormT } from '@hooks/__mocks__/form-hooks';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';
import { type UseFormReturn } from 'react-hook-form';

describe('<Form />', () => {
  let form: UseFormReturn<DefaultMockFormT>;

  beforeEach(() => {
    form = genMockForm();
  });

  describe('custom styles', () => {
    it('applies custom styles', () => {
      const style = { backgroundColor: 'black' };
      render(
        <Form
          form={form}
          style={style}
        >
          <Text>Form</Text>
        </Form>,
        { wrapper: AppProvider }
      );

      const formView = screen.getByTestId('form-view');
      expect(formView).toHaveStyle(style);
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <Form form={form} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with children', () => {
      render(
        <Form form={form}>
          <Input name="field1" />
          <Input name="field2" />
        </Form>,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
