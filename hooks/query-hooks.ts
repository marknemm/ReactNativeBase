import { DBDocData, DBFilterOptions, DBOrderByOptions, DBQueryOptions, DBQueryOptionsState, DBQueryResult, DBQueryState, UseFormQueryOptions, UseQueryOptions } from '@interfaces/db';
import { listDBDocs, mergeQueryOptions } from '@util/db';
import { log, logErr } from '@util/log';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from './debounce-hooks';

/**
 * Custom hook for creating a stateful {@link DBQueryOptions} object.
 *
 * @template TData The type of the query data.
 * @template TFilters The type of the filters to apply to the query.
 * @template TForm The type of the form data to map to the filters.
 * @param args The initial {@link DBQueryOptions}.
 * @returns The {@link DBQueryOptionsState}.
 */
export function useQueryOptions<
  TData = any,
  TFilters extends DBFilterOptions = DBFilterOptions<TData>,
>({
  filters: initFilters,
  limit: initLimit,
  orderBy: initOrderBy,
  startAfter: initStartAt,
}: DBQueryOptions<TData, TFilters> = {}
): DBQueryOptionsState<TData, TFilters> {
  const [filters, setFilters] = useState(initFilters ?? {} as TFilters);
  const [limit, setLimit] = useState(initLimit);
  const [orderBy, setOrderBy] = useState(initOrderBy);
  const [startAfter, setStartAfter] = useState(initStartAt);

  const queryOptionsState = useMemo(() => ({
    filters,
    limit,
    orderBy,
    startAfter,
    setFilters,
    setLimit,
    setOrderBy,
    setStartAfter,
  }), [filters, limit, orderBy, startAfter]);

  return queryOptionsState;
}

/**
 * Custom hook for merging form data into a list query options state.
 *
 * @param options The {@link UseFormQueryOptions}.
 */
export function useFormQueryOptions<
  TData = any,
  TFilters extends DBFilterOptions = DBFilterOptions<TData>,
>({
  queryOptionsState,
  form,
  mergeForm,
  mergeTrigger = 'onSubmit',
}: UseFormQueryOptions<TData, TFilters>) {
  const mergeFormCb = useCallback(mergeForm, []); // eslint-disable-line react-hooks/exhaustive-deps

  // onChange
  useEffect(() => {
    if (mergeTrigger !== 'onChange' || !form || !mergeFormCb) return undefined;

    const subscription = form.watch((formValue) => {
      mergeQueryOptions(queryOptionsState, formValue, mergeFormCb);
    });

    return () => subscription.unsubscribe();
  }, [form, mergeFormCb, mergeTrigger, queryOptionsState]);

  // onSubmit
  if (mergeTrigger === 'onSubmit' && form?.formState.isSubmitted && mergeFormCb) {
    mergeQueryOptions(queryOptionsState, form.getValues(), mergeFormCb);
    form.reset(form.getValues()); // Make sure isSubmitted is set back to false.
  }
}

/**
 * Custom hook for performing a list query against a remote database.
 *
 * If given a startAt option that is equivalent to the previous query's cursor,
 * and the same filters and orderBy options, then appends the results to the previous query results.
 *
 * @template TData The type of the raw queried document data.
 * @template TMap The (refined) type of the queried data.
 * @param collectionPath A slash-separated path to a collection.
 * @param queryOptions The {@link DBQueryOptions}.
 * @param map A function to map the raw document data {@link TRaw} to the desired type {@link T}.
 * @returns The {@link DBQueryState}.
 */
export function useQuery<TData extends DBDocData = DBDocData, TMap = TData>(
  collectionPath: string,
  {
    filters,
    limit,
    orderBy,
    startAfter,
  }: DBQueryOptions<TData> = {},
  {
    debounceMs = 500,
    map = (doc) => doc as any,
  }: UseQueryOptions<TData, TMap> = {}
): DBQueryState<TMap> {
  const [loadError, setLoadError] = useState('');
  const [loading, setLoading] = useState(true);
  const [queryResult, setQueryResult] = useState<DBQueryResult<TMap>>(null);

  const debounce = useDebounce(debounceMs);
  const mapCb = useCallback(map, []); // eslint-disable-line react-hooks/exhaustive-deps

  const prevFiltersRef = useRef<DBFilterOptions>();
  const prevOrderByRef = useRef<DBOrderByOptions<TData>>();

  useEffect(() => {
    setLoading(true);
    setLoadError('');

    debounce(() => {
      log('Querying:', collectionPath, { filters, limit, orderBy, startAfter });

      listDBDocs(collectionPath, { filters, limit, orderBy, startAfter }, mapCb)
        .then((result) => {
          setQueryResult((prevResult) => {
            result.items = ( // Append results if detected that getting next pagination set.
              startAfter === prevResult?.cursor
              && filters === prevFiltersRef.current
              && orderBy === prevOrderByRef.current
            )
              ? (prevResult?.items ?? []).concat(result.items)
              : result.items;
            return result;
          });

          prevFiltersRef.current = filters;
          prevOrderByRef.current = orderBy;
        })
        .catch((error) => {
          logErr('Query error:', error);
          setLoadError(error.message);
        })
        .finally(() => setLoading(false));
    });
  }, [collectionPath, debounce, filters, limit, mapCb, orderBy, startAfter]);

  return useMemo(() => ({
    cursor: queryResult?.cursor,
    items: queryResult?.items,
    loadError,
    loading,
  }), [loadError, loading, queryResult]);
}
