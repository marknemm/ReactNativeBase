import ErrorText from '@components/error-text/ErrorText';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';

describe('<ErrorText />', () => {
  describe('displays error', () => {
    it('displays error message', () => {
      const errorMsg = 'Test error message';
      render(
        <ErrorText error={errorMsg} />,
        { wrapper: AppProvider }
      );

      const errorText = screen.getByText(errorMsg);
      expect(errorText).toBeDefined();
    });

    it('displays error message from Error object', () => {
      const error = new Error('Test error message');
      render(
        <ErrorText error={error} />,
        { wrapper: AppProvider }
      );

      const errorText = screen.getByText(error.message);
      expect(errorText).toBeDefined();
    });

    it('displays custom children error message', () => {
      const errorMsg = 'Test error message';
      render(
        <ErrorText>
          <Text>{errorMsg}</Text>
        </ErrorText>,
        { wrapper: AppProvider }
      );

      const errorText = screen.getByText(errorMsg);
      expect(errorText).toBeDefined();
    });
  });

  describe('custom styles', () => {
    it('applies custom styles', () => {
      const errorMsg = 'Test error message';
      const style = { color: 'red' };
      render(
        <ErrorText
          error={errorMsg}
          style={style}
        />,
        { wrapper: AppProvider }
      );

      const errorText = screen.getByText(errorMsg);
      expect(errorText).toHaveStyle(style);
    });
  });

  describe('snapshots', () => {
    it('renders correctly with no error or children', () => {
      const tree = render(
        <ErrorText />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with error message', () => {
      const tree = render(
        <ErrorText error="Test error message" />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
