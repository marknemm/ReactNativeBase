import Tooltip from '@components/tooltip/Tooltip';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';
import { View } from 'react-native';

describe('<Tooltip />', () => {
  const childrenStr = 'Tooltip content';
  const popoverStr = 'Popover content';
  const popover = (
    <View testID="rnb-test-popover">
      <Text>{popoverStr}</Text>
    </View>
  );

  describe('controlled visibility state', () => {
    it('shows popover on visible prop change', () => {
      render(
        <Tooltip
          popover={popover}
          visible
        >
          <Text>{childrenStr}</Text>
        </Tooltip>,
        { wrapper: AppProvider }
      );

      const popoverText = screen.getByText(popoverStr);
      expect(popoverText).toBeVisible();
    });

    it('hides popover on visible prop change', () => {
      render(
        <Tooltip
          popover={popover}
          visible
        >
          <Text>{childrenStr}</Text>
        </Tooltip>,
        { wrapper: AppProvider }
      );

      let popoverText = screen.getByText(popoverStr);
      expect(popoverText).toBeVisible();

      screen.rerender(
        <Tooltip
          popover={popover}
          visible={false}
        >
          <Text>{childrenStr}</Text>
        </Tooltip>
      );

      popoverText = screen.queryByText(popoverStr);
      expect(popoverText).toBeFalsy();
    });

    it('calls onClose and onOpen callbacks but does not auto open/close', async () => {
      const onClose = jest.fn();
      const onOpen = jest.fn();
      render(
        <Tooltip
          onClose={onClose}
          onOpen={onOpen}
          popover={popover}
          visible={false}
        >
          <Text>{childrenStr}</Text>
        </Tooltip>,
        { wrapper: AppProvider }
      );

      const text = screen.getByText(childrenStr);
      await userEvent.press(text);
      let popoverText = screen.queryByText(popoverStr);

      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(popoverText).toBeFalsy();

      screen.rerender(
        <Tooltip
          onClose={onClose}
          onOpen={onOpen}
          popover={popover}
          visible
        >
          <Text>{childrenStr}</Text>
        </Tooltip>
      );

      popoverText = screen.getByText(popoverStr);
      await userEvent.press(popoverText);
      popoverText = screen.getByText(popoverStr);

      expect(onClose).toHaveBeenCalledTimes(1);
      expect(popoverText).toBeVisible();
    });
  });

  describe('uncontrolled (auto) visibility state', () => {
    it('does not show popover by default', () => {
      render(
        <Tooltip popover={popover}>
          <Text>{childrenStr}</Text>
        </Tooltip>,
        { wrapper: AppProvider }
      );

      const popoverText = screen.queryByText(popoverStr);

      expect(popoverText).toBeFalsy();
    });

    it('shows popover on press', async () => {
      const onOpen = jest.fn();
      render(
        <Tooltip
          onOpen={onOpen}
          popover={popover}
        >
          <Text>{childrenStr}</Text>
        </Tooltip>,
        { wrapper: AppProvider }
      );

      const text = screen.getByText(childrenStr);
      await userEvent.press(text);

      expect(onOpen).toHaveBeenCalledTimes(1);

      const popoverText = screen.getByText(popoverStr);
      expect(popoverText).toBeVisible();
    });

    it('hides popover on popover press', async () => {
      const onOpen = jest.fn();
      const onClose = jest.fn();
      render(
        <Tooltip
          onClose={onClose}
          onOpen={onOpen}
          popover={popover}
        >
          <Text>{childrenStr}</Text>
        </Tooltip>,
        { wrapper: AppProvider }
      );

      const text = screen.getByText(childrenStr);
      await userEvent.press(text);

      expect(onOpen).toHaveBeenCalledTimes(1);

      let popoverText = screen.getByText(popoverStr);
      expect(popoverText).toBeVisible();

      await userEvent.press(popoverText);

      expect(onClose).toHaveBeenCalledTimes(1);

      popoverText = screen.queryByText(popoverStr);
      expect(popoverText).toBeFalsy();
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <Tooltip />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with text content', () => {
      render(
        <Tooltip>
          <Text>{childrenStr}</Text>
        </Tooltip>,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with hidden popover', () => {
      render(
        <Tooltip popover={popover}>
          <Text>{childrenStr}</Text>
        </Tooltip>,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with visible popover', () => {
      render(
        <Tooltip
          popover={popover}
          visible
        >
          <Text>{childrenStr}</Text>
        </Tooltip>,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
