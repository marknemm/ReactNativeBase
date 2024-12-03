import type { DBFilterOptions, DBFilters, DBQueryOptions, DBQueryOptionsState, DBQueryState, UseQueryOptions } from '@interfaces/db';
import { renderHook } from '@testing-library/react-native';

const ActualModule = jest.requireActual('@hooks/query-hooks');

/**
 * Generates a mock {@link DBQueryOptionsState} from the given {@link DBQueryOptions}.
 *
 * @param options The {@link DBQueryOptions} to mock.
 * @returns The mock {@link DBQueryOptionsState}.
 */
export function genMockQueryOptionsState<
  TData = any,
  TFilters extends DBFilterOptions = DBFilters<TData>,
>(options: DBQueryOptions<TData, TFilters>): DBQueryOptionsState<TData, TFilters> {
  const queryOptionsState = renderHook(() =>
    useQueryOptions(options)
  ).result.current;

  queryOptionsState.setFilters = jest.fn(queryOptionsState.setFilters);
  queryOptionsState.setLimit = jest.fn(queryOptionsState.setLimit);
  queryOptionsState.setOrderBy = jest.fn(queryOptionsState.setOrderBy);
  queryOptionsState.setStartAfter = jest.fn(queryOptionsState.setStartAfter);

  return queryOptionsState as any;
}

/**
 * Mock of custom hook for creating {@link DBQueryOptions} state.
 *
 * @param args The initial {@link DBQueryOptions}.
 * @returns The mock {@link DBQueryOptionsState}.
 */
export const useQueryOptions = jest.fn<DBQueryOptionsState, [DBQueryOptions]>().mockImplementation(
  ActualModule.useQueryOptions
);

type UseQueryParamList = [string, Partial<DBQueryOptionsState>, UseQueryOptions];

/**
 * Mock of query item.
 */
export interface MockQueryItem {

  /**
   * The description of the item.
   */
  description?: string;

  /**
   * The name of the item.
   */
  name: string;

  /**
   * The ID of the item.
   */
  id: number;

  /**
   * Whether the item is public.
   */
  public: boolean;

}

/**
 * Generates a {@link MockQueryItem} list.
 *
 * @param count The number of items to generate. Default is `4`.
 * @returns The {@link MockQueryItem} list.
 */
export function genMockQueryItems(count = 4): MockQueryItem[] {
  const mockQueryItems = [];

  for (let i = 0; i < count; i++) {
    mockQueryItems.push({
      description: `Test description ${i}`,
      id: i,
      name: `Test Item ${i}`,
      public: i % 2 === 0,
    });
  }

  return mockQueryItems;
}

/**
 * Generates a mock {@link DBQueryState} from the given data.
 *
 * @param mockData The mock data to use.
 * @returns The mock {@link DBQueryState}.
 */
export function genMockUseQueryReturn(mockData?: Partial<DBQueryState<MockQueryItem>>): DBQueryState<MockQueryItem> {
  return {
    cancel: jest.fn(),
    cursor: undefined,
    items: genMockQueryItems(),
    loadError: '',
    loading: false,
    loadingInitial: false,
    loadingMore: false,
    loadingOnOptionsChange: false,
    loadNext: jest.fn(),
    refresh: jest.fn(),
    refreshing: false,
    ...mockData,
  };
}

/**
 * Mock of custom hook for querying a list of documents.
 *
 * @param args The {@link UseQueryParamList}.
 * @returns The mock {@link DBQueryState}.
 */
export const useQuery = jest.fn<DBQueryState<MockQueryItem>, UseQueryParamList>().mockReturnValue(
  genMockUseQueryReturn()
);
