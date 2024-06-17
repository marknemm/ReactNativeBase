import InfoDialog from '@components/info-dialog/InfoDialog';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';

describe('<InfoDialog />', () => {
  const title = 'Test Title';
  const contentStr = 'Test Content';

  describe('display inputs', () => {
    it('Does not render when not visible', () => {
      render(
        <InfoDialog title={title}>
          <Text>{contentStr}</Text>
        </InfoDialog>,
        { wrapper: AppProvider }
      );

      const titleText = screen.queryByText(title);
      expect(titleText).toBeFalsy();
    });

    it('Renders title', () => {
      render(
        <InfoDialog
          isVisible
          title={title}
        />,
        { wrapper: AppProvider }
      );

      const titleText = screen.queryByText(title);
      expect(titleText).toBeVisible();
    });

    it('Renders children', () => {
      render(
        <InfoDialog isVisible>
          <Text>{contentStr}</Text>
        </InfoDialog>,
        { wrapper: AppProvider }
      );

      const contentText = screen.queryByText(contentStr);
      expect(contentText).toBeVisible();
    });
  });

  describe('on close', () => {
    it('invokes onClose callback', async () => {
      const onClose = jest.fn();
      render(
        <InfoDialog
          isVisible
          onClose={onClose}
        />,
        { wrapper: AppProvider }
      );

      const closeButton = screen.getByRole('button', { name: 'Close' });
      await userEvent.press(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('snapshots', () => {
    it('renders correctly when not visible', () => {
      render(
        <InfoDialog />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when visible', () => {
      render(
        <InfoDialog isVisible />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with title and children', () => {
      render(
        <InfoDialog
          isVisible
          title={title}
        >
          <Text>{contentStr}</Text>
        </InfoDialog>,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
