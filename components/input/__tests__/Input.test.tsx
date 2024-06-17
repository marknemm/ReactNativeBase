import Form from '@components/form/Form';
import Input, { type InputRefType } from '@components/input/Input';
import { genMockForm } from '@hooks/__mocks__/form-hooks';
import AppProvider from '@test/contexts/app/AppProvider';
import { act, fireEvent, render, renderHook, screen, userEvent } from '@testing-library/react-native';
import React, { cloneElement, useRef } from 'react';
import { type NativeSyntheticEvent, type TextInputChangeEventData } from 'react-native';
import { Masks } from 'react-native-mask-input';
import type { DeepPartial } from 'utility-types';

describe('<Input />', () => {
  const label = 'Test Label';
  const placeholder = 'Test Placeholder';
  const typeStr = 'Test Typing';
  const value = 'Test Value';

  describe('value changes', () => {
    it('calls the `onChange` callback when input is typed in', async () => {
      const onChange = jest.fn();
      render(
        <Input onChange={onChange} />,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, typeStr);

      for (let i = 0; i < typeStr.length; i++) {
        expect(onChange).toHaveBeenNthCalledWith(i + 1,
          expect.objectContaining<DeepPartial<NativeSyntheticEvent<TextInputChangeEventData>>>({
            nativeEvent: expect.objectContaining({ text: typeStr.slice(0, i + 1) }),
          })
        );
      }
    });

    it('calls the `onChangeText` callback when input is typed in', async () => {
      const onChangeText = jest.fn();
      render(
        <Input
          label={label}
          placeholder={placeholder}
          onChangeText={onChangeText}
        />,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, typeStr);

      for (let i = 0; i < typeStr.length; i++) {
        expect(onChangeText).toHaveBeenNthCalledWith(i + 1, typeStr.slice(0, i + 1));
      }
    });

    it('updates the input value when `value` prop changes', () => {
      const ref = renderHook(() => useRef<InputRefType>()).result.current;
      render(
        <Input ref={ref} />,
        { wrapper: AppProvider }
      );

      jest.spyOn(ref.current, 'setNativeProps');
      screen.rerender(
        <Input
          ref={ref}
          value={value}
        />
      );

      expect(ref.current.setNativeProps).toHaveBeenCalledWith({ text: value });
    });

    it('does not update the input value when changed via UI', async () => {
      const ref = renderHook(() => useRef<InputRefType>()).result.current;
      render(
        <Input ref={ref} />,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, typeStr);

      jest.spyOn(ref.current, 'setNativeProps');
      screen.rerender(
        <Input ref={ref} />
      );

      expect(ref.current.setNativeProps).not.toHaveBeenCalled();
    });

    it('does not update the input value when value is set to current UI value', async () => {
      const ref = renderHook(() => useRef<InputRefType>()).result.current;
      render(
        <Input ref={ref} />,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, typeStr);

      jest.spyOn(ref.current, 'setNativeProps');
      screen.rerender(
        <Input
          ref={ref}
          value={typeStr}
        />
      );

      expect(ref.current.setNativeProps).not.toHaveBeenCalled();
    });
  });

  describe('form control', () => {
    it('updates the form control when the input is typed in', async () => {
      const form = genMockForm({
        input: '',
      });
      const onChangeText = jest.fn();

      render(
        <Form form={form}>
          <Input
            label={label}
            name="input"
            onChangeText={onChangeText}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, typeStr);

      expect(form.getValues('input')).toBe(typeStr);
      expect(onChangeText).toHaveBeenCalledWith(typeStr);
    });

    it('blurs the form control when the input is blurred', async () => {
      const form = genMockForm({
        input: '',
      });
      const onBlur = jest.fn();

      render(
        <Form form={form}>
          <Input
            label={label}
            name="input"
            onBlur={onBlur}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, typeStr);
      fireEvent(textInput, 'blur');

      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('validation and constraints', () => {
    it('validates the required constraint when form is submitted', async () => {
      const form = genMockForm({
        input: '',
      });

      const renderJSX = (
        <Form form={form}>
          <Input
            label={label}
            name="input"
            required
          />
        </Form>
      );

      render(
        renderJSX,
        { wrapper: AppProvider }
      );

      await act(() =>
        form.handleSubmit(() => {})()
      );

      expect(form.formState.errors.input.type).toBe('required');

      screen.rerender(
        cloneElement(renderJSX, { form })
      );

      const errorText = screen.getByText(`${label} is required`);
      expect(errorText).toBeVisible();
    });

    it('validates max length constraint when form is submitted but typing is not restricted', async () => {
      const errorMsg = 'Max length exceeded';
      const onChangeText = jest.fn();
      const form = genMockForm({
        input: '',
      });

      const renderJSX = (
        <Form form={form}>
          <Input
            label={label}
            maxLength={{ value: 5, message: errorMsg }}
            name="input"
            onChangeText={onChangeText}
          />
        </Form>
      );

      render(
        renderJSX,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, '123456');

      await act(() =>
        form.handleSubmit(() => {})()
      );

      expect(form.formState.errors.input.type).toBe('maxLength');

      screen.rerender(
        cloneElement(renderJSX, { form })
      );

      const errorText = screen.getByText(errorMsg);
      expect(errorText).toBeVisible();
      expect(onChangeText).toHaveBeenCalledWith('123456');
    });

    it('Enforces max length constraint when typing', async () => {
      const onChangeText = jest.fn();
      const form = genMockForm({
        input: '',
      });

      render(
        <Form form={form}>
          <Input
            label={label}
            maxLength={5}
            maxLengthLimitTyping
            name="input"
            onChangeText={onChangeText}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, '123456');

      expect(onChangeText).toHaveBeenCalledWith('12345');
      expect(onChangeText).not.toHaveBeenCalledWith('1234567');
    });
  });

  describe('mask', () => {
    it('applies the mask to the input', async () => {
      const form = genMockForm({
        input: '',
      });

      render(
        <Form form={form}>
          <Input
            label={label}
            mask={Masks.USA_PHONE}
            name="input"
          />
        </Form>,
        { wrapper: AppProvider }
      );

      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, '2234567890');

      expect(form.getValues('input')).toBe('(223) 456-7890');
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <Input />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with label and placeholder', () => {
      render(
        <Input
          label={label}
          placeholder={placeholder}
        />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with label and mask', () => {
      render(
        <Input
          label={label}
          mask={Masks.USA_PHONE}
        />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with error', async () => {
      const form = genMockForm({
        input: '',
      });

      const renderJSX = (
        <Form form={form}>
          <Input
            label={label}
            name="input"
            required
          />
        </Form>
      );

      render(
        renderJSX,
        { wrapper: AppProvider }
      );

      await act(() =>
        form.handleSubmit(() => {})()
      );

      screen.rerender(
        cloneElement(renderJSX, { form })
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
