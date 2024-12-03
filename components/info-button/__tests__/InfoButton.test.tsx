import InfoButton from '@components/info-button/InfoButton';
import InfoDialog from '@components/info-dialog/InfoDialog';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { act, render, screen, userEvent } from '@testing-library/react-native';

jest.mock('@components/info-dialog/InfoDialog');

describe('<InfoButton />', () => {
  const infoDialogStr = 'Info Dialog Test';

  describe('on press', () => {
    it('invokes onPress callback', async () => {
      const onPress = jest.fn();
      render(
        <InfoButton onPress={onPress} />,
        { wrapper: AppProvider }
      );

      const infoButton = screen.getByRole('button', { name: 'Info' });
      await userEvent.press(infoButton);

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('info dialog', () => {
    it('opens the info dialog on press', async () => {
      const onPress = jest.fn();
      render(
        <InfoButton onPress={onPress}>
          <Text>{infoDialogStr}</Text>
        </InfoButton>,
        { wrapper: AppProvider }
      );

      const infoButton = screen.getByRole('button', { name: 'Info' });
      await userEvent.press(infoButton);

      const infoDialog = screen.getByText(infoDialogStr);
      expect(infoDialog).toBeVisible();
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('closes the info dialog on close', async () => {
      render(
        <InfoButton>
          <Text>{infoDialogStr}</Text>
        </InfoButton>,
        { wrapper: AppProvider }
      );

      const infoButton = screen.getByRole('button', { name: 'Info' });
      await userEvent.press(infoButton);

      let infoDialog = screen.getByText(infoDialogStr);
      expect(infoDialog).toBeVisible();

      act(() => {
        (InfoDialog as jest.Mock).mock.calls[0][0].onClose();
      });

      infoDialog = screen.queryByText(infoDialogStr);
      expect(infoDialog).toBeFalsy();
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <InfoButton />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with info dialog', async () => {
      render(
        <InfoButton>
          <Text>{infoDialogStr}</Text>
        </InfoButton>,
        { wrapper: AppProvider }
      );

      const infoButton = screen.getByRole('button', { name: 'Info' });
      await userEvent.press(infoButton);

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
