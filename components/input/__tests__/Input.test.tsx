import Input from '@components/input/Input';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';
import { type NativeSyntheticEvent, type TextInputChangeEventData } from 'react-native';
import { Masks } from 'react-native-mask-input';
import type { DeepPartial } from 'utility-types';

describe('<Input />', () => {
  const label = 'Test Label';
  const placeholder = 'Test Placeholder';
  const typeStr = 'Test Typing';

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

    it('updates the input value when `value` prop changes', async () => {
      let value = 'Test value ';
      const onChangeText = jest.fn().mockImplementation((text) => {
        value = text;
      });

      render(
        <Input
          onChangeText={onChangeText}
          value={value}
        />,
        { wrapper: AppProvider }
      );

      await Promise.resolve(process.nextTick);
      const textInput = screen.getByTestId('RNE__Input__text-input');
      await userEvent.type(textInput, typeStr, {  });
      expect(onChangeText).toHaveBeenNthCalledWith(typeStr.length, value);
    });
  });

  describe('form control', () => {

  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      const tree = render(
        <Input />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with label and placeholder', () => {
      const tree = render(
        <Input
          label={label}
          placeholder={placeholder}
        />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with label and mask', () => {
      const tree = render(
        <Input
          label={label}
          mask={Masks.USA_PHONE}
        />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
