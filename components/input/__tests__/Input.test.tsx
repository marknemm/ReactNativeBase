import Input, { type InputRefType } from '@components/input/Input';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, renderHook, screen, userEvent } from '@testing-library/react-native';
import React, { useRef } from 'react';
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
  });
});
