import { type InputRefType } from '@components/input/Input';
import ClearButton from '@components/input/clear-button/ClearButton';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';
import { type RefObject } from 'react';
import { GestureResponderEvent } from 'react-native';

describe('<ClearButton />', () => {
  let mockInputRef: RefObject<InputRefType>;

  beforeEach(() => {
    mockInputRef = { current: { clear: jest.fn(), props: { onChangeText: jest.fn() } } as any };
  });

  describe('button press', () => {
    it('calls onPress and clears input when the button is pressed', async () => {
      const onPress = jest.fn();
      render(
        <ClearButton
          inputRef={mockInputRef}
          isVisible
          onPress={onPress}
        />,
        { wrapper: AppProvider }
      );

      const clearButton = screen.getByRole('button', { name: 'Clear' });
      await userEvent.press(clearButton);

      expect(onPress).toHaveBeenCalled();
      expect(mockInputRef.current.clear).toHaveBeenCalled();
      expect(mockInputRef.current.props.onChangeText).toHaveBeenCalledWith('');
    });

    it('does not call onPress or clear input when disabled', async () => {
      const onPress = jest.fn();
      render(
        <ClearButton
          disabled
          inputRef={mockInputRef}
          isVisible
          onPress={onPress}
        />,
        { wrapper: AppProvider }
      );

      const clearButton = screen.getByRole('button', { name: 'Clear' });
      await userEvent.press(clearButton);

      expect(onPress).not.toHaveBeenCalled();
      expect(mockInputRef.current.clear).not.toHaveBeenCalled();
      expect(mockInputRef.current.props.onChangeText).not.toHaveBeenCalled();
    });

    it('does clear input when onPress prevents default event', async () => {
      const onPress = jest.fn().mockImplementation((event: GestureResponderEvent) => {
        event.preventDefault();
        event.defaultPrevented = true;
      });
      render(
        <ClearButton
          inputRef={mockInputRef}
          isVisible
          onPress={onPress}
        />,
        { wrapper: AppProvider }
      );

      const clearButton = screen.getByRole('button', { name: 'Clear' });
      await userEvent.press(clearButton);

      expect(onPress).toHaveBeenCalled();
      expect(mockInputRef.current.clear).not.toHaveBeenCalled();
      expect(mockInputRef.current.props.onChangeText).not.toHaveBeenCalledWith('');
    });
  });

  describe('snapshots', () => {
    it('renders correctly when not visible', () => {
      render(
        <ClearButton inputRef={mockInputRef} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when visible', () => {
      render(
        <ClearButton
          inputRef={mockInputRef}
          isVisible
        />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when visible and disabled', () => {
      render(
        <ClearButton
          disabled
          inputRef={mockInputRef}
          isVisible
        />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
