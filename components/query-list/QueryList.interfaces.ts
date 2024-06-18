import type { DBFilterOp, DBFilterOptions, DBFilters, DBQueryOptionsState, UseQueryOptions } from '@interfaces/db';
import type { ReactElement } from 'react';
import type { FlatListProps } from 'react-native';
import type QueryList from './QueryList';

/**
 * The {@link QueryList} component props.
 *
 * @template TData The type of the raw query data.
 * @template TMap The type of the mapped query data.
 * @template TFilters The type of the filters to apply to the query.
 */
export interface QueryListProps<
  TData = any,
  TMap = TData,
  TFilters extends DBFilterOptions = DBFilters<TData>
> extends
  Omit<FlatListProps<TMap>, 'data'>,
  Omit<UseQueryOptions<TData, TMap>, 'paginationMode'>
{

  /**
   * A slash-separated path to a collection.
   */
  collectionPath: string;

  /**
   * The {@link DBQueryOptionsState} used for querying data.
   */
  queryOptionsState: DBQueryOptionsState<TData, TFilters>;

  /**
   * The name of the general search filter field.
   *
   * If not provided, then the search bar will be hidden.
   */
  searchFilterName?: keyof TFilters;

  /**
   * The operator to use for the general search filter.
   *
   * @default 'starts-with-i'
   */
  searchFilterOperator?: DBFilterOp;

  /**
   * The search bar placeholder text.
   *
   * @default `Search ${collectionName}...`
   */
  searchPlaceholder?: string;

}

/**
 * The {@link QueryList} component style props.
 */
export type QueryListStyleProps = Pick<
  QueryListProps,
  'indicatorStyle' | 'columnWrapperStyle' | 'contentContainerStyle'
  | 'ListFooterComponentStyle' | 'ListHeaderComponentStyle' | 'style'
>;

/**
 * The {@link QueryList} functional component type.
 *
 * @template TData The type of the raw query data.
 * @template TMap The type of the mapped query data.
 * @template TFilters The type of the filters to apply to the query.
 */
export type QueryListFC = <
  TData = any,
  TMap = TData,
  TFilters extends DBFilterOptions = DBFilters<TData>
> (props: QueryListProps<TData, TMap, TFilters>) => ReactElement;
