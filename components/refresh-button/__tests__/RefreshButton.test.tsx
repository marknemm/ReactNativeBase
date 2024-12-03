import RefreshButton from '@components/refresh-button/RefreshButton';
import AppProvider from '@test/contexts/app/AppProvider';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('<RefreshButton />', () => {
  it('calls onPress when the button is pressed', () => {
    const onPress = jest.fn();
    render(
      <RefreshButton onPress={onPress} />,
      { wrapper: AppProvider }
    );

    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(
      <RefreshButton onPress={onPress} disabled />,
      { wrapper: AppProvider }
    );

    fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <RefreshButton />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when disabled', () => {
      render(
        <RefreshButton disabled />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
