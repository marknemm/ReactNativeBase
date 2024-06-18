import Modal from '@components/modal/Modal';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('<Modal />', () => {
  const modalContentStr = 'Modal content';

  describe('isVisible prop', () => {
    it('should render the modal with children when isVisible is true (default)', () => {
      render(
        <Modal>
          <Text>{modalContentStr}</Text>
        </Modal>,
        { wrapper: AppProvider }
      );

      const modalText = screen.getByText(modalContentStr);
      expect(modalText).toBeVisible();
    });

    it('should not render the modal when isVisible is false', () => {
      render(
        <Modal isVisible={false}>
          <Text>{modalContentStr}</Text>
        </Modal>,
        { wrapper: AppProvider }
      );

      const modalText = screen.queryByText(modalContentStr);
      expect(modalText).toBeFalsy();
    });
  });

  describe('backdrop press', () => {
    it('should call onBackdropPress when backdrop is pressed', () => {
      const onBackdropPress = jest.fn();

      render(
        <Modal onBackdropPress={onBackdropPress}>
          <Text>{modalContentStr}</Text>
        </Modal>,
        { wrapper: AppProvider }
      );

      const backdrop = screen.getByTestId('rnb-backdrop');
      fireEvent(backdrop, 'touchEnd');

      expect(onBackdropPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onBackdropPress when modal is pressed', async () => {
      const onBackdropPress = jest.fn();

      render(
        <Modal onBackdropPress={onBackdropPress}>
          <Text>{modalContentStr}</Text>
        </Modal>,
        { wrapper: AppProvider }
      );

      const modalText = screen.getByText(modalContentStr);
      fireEvent(modalText, 'touchEnd');

      expect(onBackdropPress).not.toHaveBeenCalled();
    });
  });

  describe('styles', () => {
    it('should apply the style prop to the modal', () => {
      const style = { backgroundColor: 'red' };

      render(
        <Modal style={style}>
          <Text>{modalContentStr}</Text>
        </Modal>,
        { wrapper: AppProvider }
      );

      const modal = screen.getByTestId('rnb-modal');
      expect(modal).toHaveStyle(style);
    });
  });

  describe('snapshots', () => {
    it('renders correctly when isVisible is true (default)', () => {
      render(
        <Modal />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when isVisible is false', () => {
      render(
        <Modal isVisible={false} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
