import ActivityIndicator from '@components/activity-indicator/ActivityIndicator';
import ErrorText from '@components/error-text/ErrorText';
import SearchBar from '@components/search-bar/SearchBar';
import { useQuery } from '@hooks/query-hooks';
import { DBFilter } from '@interfaces/db';
import { toTitleCase } from '@util/string';
import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Props, QueryListFC } from './props';

/**
 * A list of dynamically queried items.
 *
 * @param props The component {@link Props}.
 * @returns The {@link QueryList} component.
 */
const QueryList: QueryListFC = ({
  collectionPath,
  debounceMs,
  load,
  map,
  onLoadComplete,
  onLoadError,
  onLoadSuccess,
  queryOptionsState,
  searchFilterName,
  searchFilterOperator = 'starts-with-i',
  searchPlaceholder,
  ...flatListProps
}) => {
  const queryState = useQuery(collectionPath, queryOptionsState, {
    debounceMs,
    load,
    map,
    onLoadComplete,
    onLoadError,
    onLoadSuccess,
  });

  const collectionName = toTitleCase(collectionPath.split('/').pop());
  searchPlaceholder ??= `Search ${collectionName}...`;

  const onSearchChangeCb = useCallback((text: string) => {
    queryOptionsState.setFilters((prevFilters) => ({
      ...prevFilters,
      [searchFilterName]: {
        operator: searchFilterOperator,
        value: text,
      },
    }));
  }, [queryOptionsState, searchFilterName, searchFilterOperator]);

  return (
    <>
      {searchFilterName && (
        <SearchBar
          placeholder={searchPlaceholder}
          onChangeText={onSearchChangeCb}
          showLoading={queryState.loadingOnOptionsChange}
          value={(queryOptionsState.filters[searchFilterName] as DBFilter)?.value ?? ''}
        />
      )}

      <ActivityIndicator
        isVisible={queryState.loadingInitial}
        size="large"
      />

      <ErrorText
        center
        error={queryState.loadError}
      />

      <FlatList
        data={queryState.items}
        keyExtractor={useCallback((item: any) =>
          item.id,
        [])}
        onEndReached={queryState.loadNext}
        onRefresh={queryState.refresh}
        refreshing={queryState.refreshing}
        {...flatListProps}
      />

      <ActivityIndicator
        isVisible={queryState.loadingMore}
        size="large"
      />
    </>
  );
};

export default QueryList;
