import { fireEvent, render } from '@testing-library/react-native';
import { AppProvider } from '@test/providers/app-provider/AppProvider';
import Appearance from './Appearance';

describe('<Appearance />', () => {
  it('calls onAppearanceChange when the appearance changes', () => {
    const onAppearanceChange = jest.fn();
    const { getByText } = render(
      <Appearance appearance="auto" onAppearanceChange={onAppearanceChange} />,
      { wrapper: AppProvider }
    );

    fireEvent.press(getByText('Light'));
    expect(onAppearanceChange).toHaveBeenCalledWith('light');

    fireEvent.press(getByText('Dark'));
    expect(onAppearanceChange).toHaveBeenCalledWith('dark');

    fireEvent.press(getByText('Auto'));
    expect(onAppearanceChange).toHaveBeenCalledWith('auto');
  });

  it('does not call onAppearanceChange when disabled', () => {
    const onAppearanceChange = jest.fn();
    const { getByText } = render(
      <Appearance appearance="auto" onAppearanceChange={onAppearanceChange} disabled />,
      { wrapper: AppProvider }
    );

    fireEvent.press(getByText('Light'));
    expect(onAppearanceChange).not.toHaveBeenCalled();

    fireEvent.press(getByText('Dark'));
    expect(onAppearanceChange).not.toHaveBeenCalled();

    fireEvent.press(getByText('Auto'));
    expect(onAppearanceChange).not.toHaveBeenCalled();
  });

  describe('snapshots', () => {
    it('renders correctly auto appearance', () => {
      const tree = render(
        <Appearance appearance="auto" />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly dark appearance', () => {
      const tree = render(
        <Appearance appearance="dark" />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly light appearance', () => {
      const tree = render(
        <Appearance appearance="light" />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly disabled', () => {
      const tree = render(
        <Appearance appearance="auto" disabled />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
