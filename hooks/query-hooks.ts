import { useDebounce } from '@hooks/debounce-hooks';
import { useIncrementState } from '@hooks/state-hooks';
import { DBDocData, DBFilterOptions, DBQueryOptions, DBQueryOptionsState, DBQueryResult, DBQueryState, UseFormQueryOptions, UseQueryOptions, listDBDocs, logQueryOptions, mergeQueryOptions } from '@util/db';
import { log, logErr } from '@util/log';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

  const queryOptionsState = useMemo<DBQueryOptionsState<TData, TFilters>>(() => ({
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
 * Custom hook for performing a query against a remote database.
 *
 * If given a startAt option that is equivalent to the previous query's cursor,
 * and the same filters and orderBy options, then appends the results to the previous query results.
 *
 * @template TData The type of the raw queried document data.
 * @template TMap The (refined) type of the queried data.
 * @template TFilters The type of the filters to apply to the query.
 * @param collectionPath A slash-separated path to a collection.
 * @param queryOptionsState The {@link DBQueryOptionsState}.
 * @param map A function to map the raw document data {@link TRaw} to the desired type {@link T}.
 * @returns The {@link DBQueryState}.
 */
export function useQuery<
  TData extends DBDocData = DBDocData,
  TMap = TData,
  TFilters extends DBFilterOptions = DBFilterOptions<TData>,
>(
  collectionPath: string,
  queryOptionsState: Partial<DBQueryOptionsState<TData, TFilters>> = {},
  {
    debounceMs = 500,
    load = listDBDocs,
    map = (doc) => doc as any,
    onLoadComplete,
    onLoadError,
    onLoadSuccess,
    paginationMode = 'append',
  }: UseQueryOptions<TData, TMap> = {}
): DBQueryState<TMap> {
  const { filters, limit, orderBy, startAfter, setStartAfter } = queryOptionsState ?? {};
  const [loadError, setLoadError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingOnOptionsChange, setLoadingOnOptionsChange] = useState(false);
  const [queryResult, setQueryResult] = useState<DBQueryResult<TMap>>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshInstance, incrementRefreshInstance] = useIncrementState(0); // Used to force refresh.
  const debounce = useDebounce(debounceMs);

  const queryInstanceRef = useRef<number>(0);
  const prevQueryOptionsRef = useRef<DBQueryOptions>({});

  const stopLoadingCb = useCallback(() => {
    setLoading(false);
    setLoadingMore(false);
    setLoadingOnOptionsChange(false);
    setRefreshing(false);
    queryInstanceRef.current++; // Mark any currently progressing queries as stale.
  }, []);

  useEffect(() => {
    const optionsChangeDetected = (queryInstanceRef.current > 0 || loading)
      && (
        filters !== prevQueryOptionsRef.current.filters
        || limit !== prevQueryOptionsRef.current.limit
        || orderBy !== prevQueryOptionsRef.current.orderBy
      );

    const paginationDetected = (queryInstanceRef.current > 0 || loading)
      && startAfter === queryResult?.cursor
      && !optionsChangeDetected;

    if (paginationDetected && (!startAfter || refreshing)) {
      log('Skipping next page query:', !startAfter ? 'No more items' : 'Refreshing');
      return;
    }

    if (loading) {
      logQueryOptions('Cancelling previous query:', prevQueryOptionsRef.current);
      stopLoadingCb();
    }

    setLoading(true);
    setLoadingMore(paginationDetected);
    setLoadingOnOptionsChange(optionsChangeDetected);
    setLoadError('');

    debounce(async () => {
      const currentQueryInstance = queryInstanceRef.current; // Track if query was cancelled or is stale.
      const queryOptions = { filters, limit, orderBy, startAfter };

      try {
        const result = await load(collectionPath, queryOptions, map);
        if (currentQueryInstance !== queryInstanceRef.current) { // Check if query was cancelled or is stale.
          logQueryOptions(`Discarding stale query result (${currentQueryInstance} !== ${queryInstanceRef.current}):`,
            queryOptions
          );
          return;
        }

        setQueryResult((prevResult) => {
          result.items = paginationDetected && paginationMode === 'append'
            ? (prevResult?.items ?? []).concat(result.items)
            : result.items;
          return result;
        });

        prevQueryOptionsRef.current = queryOptions;

        onLoadSuccess?.(result);
        onLoadComplete?.(result, null);
      } catch (error: any) {
        if (currentQueryInstance !== queryInstanceRef.current) { // Check if query was cancelled or is stale.
          logQueryOptions(`Discarding stale query error (${currentQueryInstance} !== ${queryInstanceRef.current}):`,
            queryOptions
          );
          logErr('Discarded query error:', error);
          return;
        }

        logErr('Query error:', error);
        setLoadError(error instanceof Object ? error.message : error);
        onLoadError?.(error);
        onLoadComplete?.(null, error);
      } finally {
        if (currentQueryInstance === queryInstanceRef.current) { // Check if query was cancelled or is stale.
          stopLoadingCb();
        }
      }
    });
  // TODO: Replace disabled eslint rule with EffectEvent when it is stable.
  }, [collectionPath, filters, limit, orderBy, refreshInstance, startAfter, stopLoadingCb]); // eslint-disable-line react-hooks/exhaustive-deps

  return useMemo<DBQueryState<TMap>>(() => ({
    cancel: stopLoadingCb,
    cursor: queryResult?.cursor,
    items: queryResult?.items ?? [],
    loadError,
    loading,
    loadingInitial: loading && queryInstanceRef.current === 0,
    loadingMore,
    loadingOnOptionsChange,
    loadNext: () => {
      if (!loading && queryResult?.cursor) {
        setStartAfter?.(queryResult.cursor);
      }
    },
    refresh: ({ maintainStartAfter } = {}) => {
      if (!refreshing) {
        setRefreshing(true);
        if (!maintainStartAfter) {
          setStartAfter?.(null);
        }
        incrementRefreshInstance();
      }
    },
    refreshing,
  }), [
    incrementRefreshInstance,
    loadError,
    loading,
    loadingMore,
    loadingOnOptionsChange,
    queryResult,
    refreshing,
    setStartAfter,
    stopLoadingCb,
  ]);
}
