import Form from '@components/form/Form';
import PhoneInput from '@components/phone-input/PhoneInput';
import { PHONE_PATTERN_RULE } from '@constants/validation';
import { genMockForm } from '@hooks/__mocks__/form-hooks';
import AppProvider from '@test/contexts/app/AppProvider';
import { act, render, screen, userEvent } from '@testing-library/react-native';
import { cloneElement } from 'react';

describe('<PhoneInput />', () => {
  describe('validation', () => {
    it('should show validation error with invalid phone number', async () => {
      const form = genMockForm({
        phoneInput: '',
      });

      const renderJSX = (
        <Form form={form}>
          <PhoneInput name="phoneInput" />
        </Form>
      );

      render(
        renderJSX,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, '123');

      await act(() =>
        form.handleSubmit(() => {})()
      );

      expect(form.formState.errors.phoneInput.type).toBe('pattern');

      screen.rerender(
        cloneElement(renderJSX, { form })
      );

      const errorText = screen.getByText(PHONE_PATTERN_RULE.message);
      expect(errorText).toBeVisible();
    });

    it('should not show validation error with valid phone number', async () => {
      const form = genMockForm({
        phoneInput: '',
      });

      const renderJSX = (
        <Form form={form}>
          <PhoneInput name="phoneInput" />
        </Form>
      );

      render(
        renderJSX,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, '2234567890');

      await act(() =>
        form.handleSubmit(() => {})()
      );

      expect(form.formState.errors.phoneInput).toBeUndefined();
    });
  });

  describe('masked value change', () => {
    it('should apply mask to the phone number typed input', async () => {
      const onChangeText = jest.fn();
      const form = genMockForm({
        phoneInput: '',
      });

      render(
        <Form form={form}>
          <PhoneInput
            name="phoneInput"
            onChangeText={onChangeText}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, '2234567890');

      expect(onChangeText).toHaveBeenLastCalledWith('(223) 456-7890');
      expect(form.getValues().phoneInput).toBe('(223) 456-7890');
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <PhoneInput />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
