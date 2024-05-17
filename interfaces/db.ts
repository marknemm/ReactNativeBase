import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { DeepPartial, UseFormReturn } from 'react-hook-form';

/**
 * A DB document.
 *
 * @extends FirebaseFirestoreTypes.DocumentData The Firestore {@link FirebaseFirestoreTypes.DocumentData DocumentData}.
 */
export interface DBDocData {

  /**
   * The DB document's unique ID.
   */
  id?: string;

}

/**
 * A Firebase Firestore query filter.
 */
export type FirestoreQueryFilter = FirebaseFirestoreTypes.QueryFilterConstraint
                                 | FirebaseFirestoreTypes.QueryCompositeFilterConstraint;

/**
 * A Firestore composite AND/OR filter function.
 *
 * `Note`: This fixes the incorrect type definition in the `@react-native-firebase/firestore` package.
 * The composite `Filter.or` and `Filter.and` functions should accept both `QueryFilterConstraint` and `QueryCompositeFilterConstraint` types.
 *
 * @todo Remove this when the `@react-native-firebase/firestore` package is updated.
 */
export type FirestoreCompositeFilterFn = (
  ...queries: FirestoreQueryFilter[]
) => FirebaseFirestoreTypes.QueryCompositeFilterConstraint;

/**
 * Options for performing a DB (list) query.
 *
 * @template TData The type of the query data.
 * @template TFilters The type of the filters to apply to the query.
 */
export interface DBQueryOptions<
  TData = any,
  TFilters extends DBFilterOptions = DBFilterOptions<TData>
> {

  /**
   * The filters to apply to the query.
   */
  filters?: TFilters;

  /**
   * The maximum number of documents to query.
   */
  limit?: number;

  /**
   * The order-by clause to apply to the query.
   */
  orderBy?: DBOrderByOptions<TData>;

  /**
   * The document cursor to start the query after.
   */
  startAfter?: DBStartAfterOptions;

}

/**
 * Stateful DB query options.
 *
 * @template TData The type of the query data.
 * @template TFilters The type of the filters to apply to the query.
 */
export interface DBQueryOptionsState<
  TData = any,
  TFilters extends DBFilterOptions = DBFilterOptions<TData>
> extends DBQueryOptions<TData, TFilters> {

  /**
   * Sets the filters state.
   */
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>

  /**
   * Sets the limit state.
   */
  setLimit: React.Dispatch<React.SetStateAction<number>>

  /**
   * Sets the order-by state.
   */
  setOrderBy: React.Dispatch<React.SetStateAction<DBOrderByOptions<TData>>>

  /**
   * Sets the start-after state.
   */
  setStartAfter: React.Dispatch<React.SetStateAction<DBStartAfterOptions>>

}

/**
 * Filter options for querying DB documents.
 *
 * @template T The type of the DB document data.
 */
export type DBFilterOptions<T = any> = DBFilters<T> | FirestoreQueryFilter[];

/**
 * Filters for querying DB documents.
 *
 * All top level {@link DBFilter} members will be combined using the `'AND'` operator.
 *
 * To combine filters using the `'OR'` operator, use a {@link DBCompositeFilter}.
 *
 * @template T The type of the DB document data.
 */
export type DBFilters<T = any> = {

  /**
   * The filters to apply to the query.
   */
  [K in keyof T]: DBCompositeFilter | DBFilter<T[K]> | DBFilters<T[K]> | T[K];

}

/**
 * A composite filter for combining multiple {@link filters}.
 *
 * The filters will be combined using the specified composite boolean {@link operator}.
 */
export interface DBCompositeFilter {

  /**
   * The 'where' filter composite boolean {@link FirebaseFirestoreTypes.QueryFilterType operator}.
   *
   * Either `'AND'` or `'OR'`.
   */
  operator: FirebaseFirestoreTypes.QueryFilterType;

  /**
   * The filters to apply to the query.
   */
  filters: DBFilters;

}

/**
 * A filter for querying DB documents.
 *
 * The filter will be applied to the query using the specified comparison {@link operator}.
 *
 * @template T The type of the filter value.
 */
export interface DBFilter<T = any> {

    /**
     * The 'where' filter comparison {@link FirebaseFirestoreTypes.WhereFilterOp operator}.
     *
     * For example: `'<'`, `'<='`, `'=='`, `'>'`, `'>='`, ...
     */
    operator: FirebaseFirestoreTypes.WhereFilterOp | 'starts-with' | 'starts-with-i';

    /**
     * The filter value.
     */
    value: T | T[];

}

/**
 * A DB document field value.
 */
export type DBFieldValue = string | number | boolean | Date | null;

/**
 * Order-by option(s) for querying DB documents.
 */
export type DBOrderByOptions<T = any> = DBOrderByOption<T>[] | DBOrderByOption<T>;

/**
 * A singular order-by option for querying DB documents.
 */
export type DBOrderByOption<T = any> = DBOrderBy<T> | keyof T | FirebaseFirestoreTypes.FieldPath;

/**
 * A DB order-by clause.
 *
 * @template T The type of the DB document data.
 */
export interface DBOrderBy<T extends Record<string, any> = any> {

  /**
   * The field path to order by.
   */
  fieldPath: keyof T | FirebaseFirestoreTypes.FieldPath;

  /**
   * The order direction.
   *
   * Either `'asc'` or `'desc'`.
   *
   * @default 'asc'
   */
  direction?: 'asc' | 'desc';

}

/**
 * Start-at option(s) for querying DB documents.
 */
export type DBStartAfterOptions = FirebaseFirestoreTypes.DocumentSnapshot | DBFieldValue[] | DBFieldValue;

/**
 * The result of a DB query.
 *
 * @template TData The type of the query data.
 */
export interface DBQueryResult<TData = DBDocData> {

  /**
   * The query cursor that can be used to refer to the next set of items in pagination.
   */
  cursor: DBCursor;

  /**
   * The items returned by the query.
   */
  items: TData[];

}

/**
 * The state of a DB query.
 *
 * @template TData The type of the query data.
 */
export interface DBQueryState<TData = DBDocData> extends DBQueryResult<TData> {

  /**
   * The error that occurred while loading the query.
   */
  loadError: string;

  /**
   * Whether the query is currently loading.
   */
  loading: boolean;

}

/**
 * A DB cursor used for pagination.
 *
 * @template T The type of the DB document data.
 */
export type DBCursor<T = any> = FirebaseFirestoreTypes.DocumentSnapshot<T>;

/**
 * Arguments for the `useFormQueryOptions` hook.
 *
 * @template TData The type of the query data.
 * @template TFilters The type of the filters to apply to the query.
 */
export interface UseFormQueryOptions<
  TData = any,
  TFilters extends DBFilterOptions = DBFilterOptions<TData>
> {

  /**
   * The {@link UseFormReturn Form} from which to merge values into the {@link DBQueryOptions} on change.
   */
  form: UseFormReturn<TData>;

  /**
   * A function to merge the {@link UseFormReturn Form} data into the {@link DBQueryOptions}.
   * Will be invoked whenever a change is detected in the form data.
   *
   * If not provided, the form data will be merged into the query options as-is on change.
   *
   * @param formValue The form data value.
   * @returns The merged {@link DBQueryOptions}.
   */
  mergeForm?: (formValue: DeepPartial<TData>) => DBQueryOptions<TData, TFilters>;

  /**
   * The event on which to merge the form data into the query options.
   *
   * @default 'onSubmit'
   */
  mergeTrigger?: 'onChange' | 'onSubmit';

  /**
   * The {@link DBQueryOptionsState} to merge {@link UseFormReturn Form} data into.
   */
  queryOptionsState: DBQueryOptionsState<TData, TFilters>;

}

export interface UseQueryOptions<TData = any, TMap = TData> {

  /**
   * The debounce time in milliseconds.
   *
   * @default 500
   */
  debounceMs?: number;

  /**
   * A function to map the raw document data {@link TData} to the desired type {@link TMap}.
   *
   * If not provided, the raw document data will be returned as-is.
   *
   * @param doc The raw document data.
   * @returns The mapped document data.
   */
  map?: (doc: TData) => TMap

}
