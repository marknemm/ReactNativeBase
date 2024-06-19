import Form from '@components/form/Form';
import SearchBar from '@components/search-bar/SearchBar';
import { genMockForm } from '@hooks/__mocks__/form-hooks';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';

describe('<SearchBar />', () => {
  describe('clear button', () => {
    it('does not show clear button when input is empty', () => {
      const form = genMockForm({
        search: '',
      });
      const onChangeText = jest.fn();
      render(
        <Form form={form}>
          <SearchBar
            name="search"
            onChangeText={onChangeText}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      const clearButton = screen.queryByRole('button', { name: 'Clear' });
      expect(clearButton).toBeFalsy();
    });

    it('shows clear button when input is not empty', () => {
      const form = genMockForm({
        search: 'test',
      });
      const onChangeText = jest.fn();
      render(
        <Form form={form}>
          <SearchBar
            name="search"
            onChangeText={onChangeText}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      const clearButton = screen.getByRole('button', { name: 'Clear' });
      expect(clearButton).toBeVisible();
    });

    it('clears the text field on clear button press', async () => {
      const typedStr = 'test';
      const form = genMockForm({
        search: '',
      });
      const onChangeText = jest.fn();
      render(
        <Form form={form}>
          <SearchBar
            name="search"
            onChangeText={onChangeText}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      const input = screen.getByPlaceholderText('Search...');

      await userEvent.type(input, typedStr);
      expect(onChangeText).toHaveBeenLastCalledWith(typedStr);
      expect(form.getValues().search).toBe(typedStr);

      const clearButton = screen.getByRole('button', { name: 'Clear' });

      await userEvent.press(clearButton);
      expect(onChangeText).toHaveBeenLastCalledWith('');
      expect(form.getValues().search).toBe('');
    });
  });

  describe('loading', () => {
    it('does not show loading indicator by default', () => {
      render(
        <SearchBar />,
        { wrapper: AppProvider }
      );

      const loadingIndicator = screen.queryByTestId('rnb-search-bar-loading');
      expect(loadingIndicator).toBeFalsy();
    });

    it('shows loading indicator when showLoading is true', () => {
      render(
        <SearchBar showLoading />,
        { wrapper: AppProvider }
      );

      const loadingIndicator = screen.getByTestId('rnb-search-bar-loading');
      expect(loadingIndicator).toBeVisible();
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <SearchBar />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with label, custom placeholder, and clear button', () => {
      render(
        <SearchBar
          label="Search"
          placeholder="Search here"
          value="test"
        />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
