import ScreenView from '@components/screen-view/ScreenView';
import { genMockForm } from '@hooks/__mocks__/form-hooks';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';

describe('<ScreenView />', () => {
  describe('display props', () => {
    it('renders standard scroll view', () => {
      render(
        <ScreenView>
          <Text>Test</Text>
        </ScreenView>,
        { wrapper: AppProvider }
      );

      const scrollView = screen.getByTestId('rnb-screen-scroll-container-view');
      expect(scrollView).toBeVisible();
    });

    it('renders children', () => {
      render(
        <ScreenView>
          <Text>Test</Text>
        </ScreenView>,
        { wrapper: AppProvider }
      );

      const scrollView = screen.getByTestId('rnb-screen-scroll-container-view');
      expect(scrollView).toBeVisible();

      const text = screen.getByText('Test');
      expect(text).toBeVisible();
    });

    it('renders form', () => {
      render(
        <ScreenView form={genMockForm()} />,
        { wrapper: AppProvider }
      );

      const formView = screen.getByTestId('rnb-screen-form-view');
      expect(formView).toBeVisible();
    });

    it('renders noScroll', () => {
      render(
        <ScreenView noScroll>
          <Text>Test</Text>
        </ScreenView>,
        { wrapper: AppProvider }
      );

      const screenView = screen.getByTestId('rnb-screen-view');
      expect(screenView).toBeVisible();
    });
  });

  describe('styles', () => {
    it('applies custom styles to scroll container view', () => {
      render(
        <ScreenView containerStyle={{ height: '80%' }}>
          <Text>Test</Text>
        </ScreenView>,
        { wrapper: AppProvider }
      );

      const scrollView = screen.getByTestId('rnb-screen-scroll-container-view');
      expect(scrollView).toHaveStyle({
        height: '80%',
        width: '100%',
      });
    });

    it('applies custom styles to noScroll container view', () => {
      render(
        <ScreenView
          containerStyle={{ height: '80%' }}
          noScroll
        >
          <Text>Test</Text>
        </ScreenView>,
        { wrapper: AppProvider }
      );

      const scrollView = screen.getByTestId('rnb-screen-container-view');
      expect(scrollView).toHaveStyle({
        height: '80%',
        width: '100%',
      });
    });

    it('applies custom styles to screen view', () => {
      render(
        <ScreenView style={{ maxWidth: 800 }}>
          <Text>Test</Text>
        </ScreenView>,
        { wrapper: AppProvider }
      );

      const innerView = screen.getByTestId('rnb-screen-view');
      expect(innerView).toHaveStyle({
        maxWidth: 800,
        width: '100%',
      });
    });

    it('applies custom styles to form view', () => {
      render(
        <ScreenView
          form={genMockForm()}
          style={{ maxWidth: 800 }}
        >
          <Text>Test</Text>
        </ScreenView>,
        { wrapper: AppProvider }
      );

      const innerView = screen.getByTestId('rnb-screen-form-view');
      expect(innerView).toHaveStyle({
        maxWidth: 800,
        width: '100%',
      });
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <ScreenView />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with children, form, and no scroll', () => {
      render(
        <ScreenView
          form={genMockForm()}
          noScroll
        >
          <Text>Test</Text>
        </ScreenView>,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
