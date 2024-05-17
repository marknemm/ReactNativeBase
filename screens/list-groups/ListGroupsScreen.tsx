import FormError from '@components/form-error/FormError';
import GroupCard from '@components/group-card/GroupCard';
import ScreenView from '@components/screen-view/ScreenView';
import SearchBar from '@components/search-bar/SearchBar';
import { useFormQueryOptions, useQuery, useQueryOptions } from '@hooks/query-hooks';
import { GroupDoc } from '@interfaces/group';
import { ScreenProps } from '@interfaces/screen';
import { Group } from '@util/group';
import { useForm } from 'react-hook-form';
import { FlatList } from 'react-native';

/**
 * A screen that lists {@link Group}s.
 *
 * @returns The {@link ListGroupsScreen} component.
 */
const ListGroupsScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const form = useForm<GroupDoc>({
    defaultValues: {
      name: '',
    },
  });

  const queryOptionsState = useQueryOptions<GroupDoc>({
    filters: {
      visibility: 'public',
    },
    limit: 10,
    orderBy: 'name',
  });
  const { setStartAfter } = queryOptionsState;

  // Sync form data with query options.
  useFormQueryOptions<GroupDoc>({
    form,
    queryOptionsState,
    mergeForm: (formValue) => ({
      filters: {
        name: { operator: 'starts-with-i', value: formValue.name },
      },
    }),
    mergeTrigger: 'onChange',
  });

  const queryState = useQuery('groups', queryOptionsState, {
    map: (groupDoc) => new Group(groupDoc),
  });

  return (
    <ScreenView form={form} noScroll>
      <SearchBar
        name="name"
        placeholder="Search Groups..."
        showLoading={queryState.loading}
      />

      <FormError
        center
        errorMessage={queryState.loadError}
      />

      <FlatList
        data={queryState.items}
        keyExtractor={(group) => group.id}
        onEndReached={() => setStartAfter(queryState.cursor)}
        renderItem={({ item: group }) => (
          <GroupCard
            group={group}
            onPress={() => navigation.navigate('Group', { group })}
          />
        )}
      />
    </ScreenView>
  );
};

export default ListGroupsScreen;
