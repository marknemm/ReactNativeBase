import Appearance from '@components/appearance/Appearance';
import AppProvider from '@test/contexts/app/AppProvider';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('<Appearance />', () => {
  it('calls onAppearanceChange when the appearance changes', () => {
    const onAppearanceChange = jest.fn();
    render(
      <Appearance appearance="auto" onAppearanceChange={onAppearanceChange} />,
      { wrapper: AppProvider }
    );

    fireEvent.press(screen.getByText('Light'));
    expect(onAppearanceChange).toHaveBeenCalledWith('light');

    fireEvent.press(screen.getByText('Dark'));
    expect(onAppearanceChange).toHaveBeenCalledWith('dark');

    fireEvent.press(screen.getByText('Auto'));
    expect(onAppearanceChange).toHaveBeenCalledWith('auto');
  });

  it('does not call onAppearanceChange when disabled', () => {
    const onAppearanceChange = jest.fn();
    render(
      <Appearance appearance="auto" onAppearanceChange={onAppearanceChange} disabled />,
      { wrapper: AppProvider }
    );

    fireEvent.press(screen.getByText('Light'));
    expect(onAppearanceChange).not.toHaveBeenCalled();

    fireEvent.press(screen.getByText('Dark'));
    expect(onAppearanceChange).not.toHaveBeenCalled();

    fireEvent.press(screen.getByText('Auto'));
    expect(onAppearanceChange).not.toHaveBeenCalled();
  });

  describe('snapshots', () => {
    it('renders correctly auto appearance', () => {
      render(
        <Appearance appearance="auto" />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly dark appearance', () => {
      render(
        <Appearance appearance="dark" />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly light appearance', () => {
      render(
        <Appearance appearance="light" />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly disabled', () => {
      render(
        <Appearance appearance="auto" disabled />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
