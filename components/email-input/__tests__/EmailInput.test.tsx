import EmailInput from '@components/email-input/EmailInput';
import Form from '@components/form/Form';
import { EMAIL_PATTERN_RULE } from '@constants/validation';
import { genMockForm } from '@hooks/__mocks__/form-hooks';
import AppProvider from '@test/contexts/app/AppProvider';
import { act, render, screen, userEvent } from '@testing-library/react-native';
import { cloneElement } from 'react';

describe('<EmailInput />', () => {
  describe('validation', () => {
    it('should show validation error with invalid email', async () => {
      const form = genMockForm({
        emailInput: '',
      });

      const renderJSX = (
        <Form form={form}>
          <EmailInput name="emailInput" />
        </Form>
      );

      render(
        renderJSX,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, 'testuser@domain');

      await act(() =>
        form.handleSubmit(() => {})()
      );

      expect(form.formState.errors.emailInput.type).toBe('pattern');

      screen.rerender(
        cloneElement(renderJSX, { form })
      );

      const errorText = screen.getByText(EMAIL_PATTERN_RULE.message);
      expect(errorText).toBeVisible();
    });

    it('should not show validation error with valid email', async () => {
      const form = genMockForm({
        emailInput: '',
      });

      const renderJSX = (
        <Form form={form}>
          <EmailInput name="emailInput" />
        </Form>
      );

      render(
        renderJSX,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, 'testuser@domain.com');

      await act(() =>
        form.handleSubmit(() => {})()
      );

      expect(form.formState.errors.emailInput).toBeUndefined();
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <EmailInput />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
