import QueryList from '@components/query-list/QueryList';
import { genMockQueryItems, genMockQueryOptionsState, genMockUseQueryReturn, type MockQueryItem } from '@hooks/__mocks__/query-hooks';
import type { DBQueryOptionsState } from '@interfaces/db';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';
import { useQuery } from '@hooks/query-hooks';

jest.mock('@hooks/query-hooks');

describe('<QueryList />', () => {
  const collectionPath = 'TestCollection';
  const renderItem = ({ item }: { item: MockQueryItem }) => <Text>{item.name}</Text>;
  const searchPlaceholder = 'Search Test Collection...';
  const searchValue = 'test';
  let queryOptionsState: DBQueryOptionsState<MockQueryItem>;

  beforeEach(() => {
    queryOptionsState = genMockQueryOptionsState({
      limit: 10,
      orderBy: 'name',
    });
  });

  describe('query state and result', () => {
    it('lists all items on successful query', () => {
      render(
        <QueryList
          collectionPath={collectionPath}
          renderItem={renderItem}
          queryOptionsState={queryOptionsState}
        />,
        { wrapper: AppProvider }
      );

      for (const mockItem of genMockQueryItems()) {
        const itemText = screen.getByText(mockItem.name);
        expect(itemText).toBeVisible();
      }
    });

    it('renders error message on failed query', () => {
      const loadError = 'Test error message';
      (useQuery as jest.Mock).mockReturnValueOnce(genMockUseQueryReturn({
        items: [],
        loadError,
      }));

      render(
        <QueryList
          collectionPath={collectionPath}
          renderItem={renderItem}
          queryOptionsState={queryOptionsState}
        />,
        { wrapper: AppProvider }
      );

      const errorMessage = screen.getByText(loadError);
      expect(errorMessage).toBeVisible();
    });

    it('renders initial loading spinner while querying initial items', () => {
      (useQuery as jest.Mock).mockReturnValueOnce(genMockUseQueryReturn({
        items: [],
        loading: true,
        loadingInitial: true,
      }));

      render(
        <QueryList
          collectionPath={collectionPath}
          renderItem={renderItem}
          queryOptionsState={queryOptionsState}
          searchFilterName="name"
        />,
        { wrapper: AppProvider }
      );

      const loadingInitSpinner = screen.getByTestId('rnb-query-list-loading-initial');
      expect(loadingInitSpinner).toBeVisible();

      const loadingMoreSpinner = screen.queryByTestId('rnb-query-list-loading-more');
      expect(loadingMoreSpinner).toBeFalsy();

      const loadingSearchSpinner = screen.queryByTestId('rnb-search-bar-loading');
      expect(loadingSearchSpinner).toBeFalsy();
    });

    it('renders loading spinner while querying more items', () => {
      (useQuery as jest.Mock).mockReturnValueOnce(genMockUseQueryReturn({
        items: genMockQueryItems(),
        loading: true,
        loadingMore: true,
      }));

      render(
        <QueryList
          collectionPath={collectionPath}
          renderItem={renderItem}
          queryOptionsState={queryOptionsState}
          searchFilterName="name"
        />,
        { wrapper: AppProvider }
      );

      const loadingMoreSpinner = screen.getByTestId('rnb-query-list-loading-more');
      expect(loadingMoreSpinner).toBeVisible();

      const loadingInitSpinner = screen.queryByTestId('rnb-query-list-loading-initial');
      expect(loadingInitSpinner).toBeFalsy();

      const loadingSearchSpinner = screen.queryByTestId('rnb-search-bar-loading');
      expect(loadingSearchSpinner).toBeFalsy();
    });

    it('renders loading spinner while searching for items', () => {
      (useQuery as jest.Mock).mockReturnValueOnce(genMockUseQueryReturn({
        items: genMockQueryItems(),
        loading: true,
        loadingOnOptionsChange: true,
      }));

      render(
        <QueryList
          collectionPath={collectionPath}
          renderItem={renderItem}
          queryOptionsState={queryOptionsState}
          searchFilterName="name"
        />,
        { wrapper: AppProvider }
      );

      const loadingSearchSpinner = screen.getByTestId('rnb-search-bar-loading');
      expect(loadingSearchSpinner).toBeVisible();

      const loadingInitSpinner = screen.queryByTestId('rnb-query-list-loading-initial');
      expect(loadingInitSpinner).toBeFalsy();

      const loadingMoreSpinner = screen.queryByTestId('rnb-query-list-loading-more');
      expect(loadingMoreSpinner).toBeFalsy();
    });
  });

  describe('search bar', () => {
    it('does not render search bar by default', () => {
      render(
        <QueryList
          collectionPath={collectionPath}
          renderItem={renderItem}
          queryOptionsState={queryOptionsState}
        />,
        { wrapper: AppProvider }
      );

      const searchBar = screen.queryByPlaceholderText(/Search/i);
      expect(searchBar).toBeFalsy();
    });

    it('renders search bar', () => {
      render(
        <QueryList
          collectionPath={collectionPath}
          queryOptionsState={queryOptionsState}
          renderItem={renderItem}
          searchFilterName="name"
        />,
        { wrapper: AppProvider }
      );

      const searchBar = screen.getByPlaceholderText('Search Testcollection...');
      expect(searchBar).toBeVisible();
    });

    it('renders search bar with custom placeholder', () => {
      render(
        <QueryList
          collectionPath={collectionPath}
          queryOptionsState={queryOptionsState}
          renderItem={renderItem}
          searchFilterName="name"
          searchPlaceholder={searchPlaceholder}
        />,
        { wrapper: AppProvider }
      );

      const searchBar = screen.getByPlaceholderText(searchPlaceholder);
      expect(searchBar).toBeVisible();
    });

    it('filters items by search input', async () => {
      let newValue;

      render(
        <QueryList
          collectionPath={collectionPath}
          queryOptionsState={queryOptionsState}
          renderItem={renderItem}
          searchFilterName="name"
        />,
        { wrapper: AppProvider }
      );

      (queryOptionsState.setFilters as jest.Mock).mockImplementation((cb) => {
        newValue = cb({ description: { operator: 'starts-with-i', value: 'description' } });
        return newValue;
      });

      const searchInput = screen.getByPlaceholderText(/Search/i);
      await userEvent.type(searchInput, searchValue);

      expect(newValue).toEqual({
        description: { operator: 'starts-with-i', value: 'description' },
        name: { operator: 'starts-with-i', value: searchValue },
      });
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <QueryList
          collectionPath={collectionPath}
          queryOptionsState={queryOptionsState}
          renderItem={renderItem}
        />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with search bar', () => {
      render(
        <QueryList
          collectionPath={collectionPath}
          queryOptionsState={queryOptionsState}
          renderItem={renderItem}
          searchFilterName="name"
          searchPlaceholder={searchPlaceholder}
        />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly on initial loading', () => {
      (useQuery as jest.Mock).mockReturnValueOnce(genMockUseQueryReturn({
        items: [],
        loading: true,
        loadingInitial: true,
      }));

      render(
        <QueryList
          collectionPath={collectionPath}
          queryOptionsState={queryOptionsState}
          renderItem={renderItem}
        />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
