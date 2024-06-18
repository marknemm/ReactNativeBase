import GroupCard from '@components/group-card/GroupCard';
import QueryList from '@components/query-list/QueryList';
import ScreenView from '@components/screen-view/ScreenView';
import { useQueryOptions } from '@hooks/query-hooks';
import { GroupDoc } from '@interfaces/group';
import { ScreenProps } from '@interfaces/screen';
import Group from '@util/group';

/**
 * A screen that lists {@link Group}s.
 *
 * @returns The {@link ListGroupsScreen} component.
 */
const ListGroupsScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const queryOptionsState = useQueryOptions<GroupDoc>({
    filters: {
      visibility: 'public',
    },
    limit: 10,
    orderBy: 'name',
  });

  return (
    <ScreenView noScroll>
      <QueryList
        collectionPath="groups"
        map={(doc) => new Group(doc)}
        queryOptionsState={queryOptionsState}
        searchFilterName="name"
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

export type * from './ListGroupsScreen';
export default ListGroupsScreen;
