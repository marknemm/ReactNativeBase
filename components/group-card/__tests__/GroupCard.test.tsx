import GroupCard from '@components/group-card/GroupCard';
import AppProvider from '@test/contexts/app/AppProvider';
import { render } from '@testing-library/react-native';
import { genMockGroup } from '@util/__mocks__/group';
import Group from '@util/group';

describe('<GroupCard />', () => {
  let mockGroup: Group;

  beforeEach(() => {
    mockGroup = genMockGroup();
  });

  describe('snapshots', () => {
    it('renders correctly when not given a group', () => {
      const tree = render(
        <GroupCard group={null} />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders correctly when given a group', () => {
      const tree = render(
        <GroupCard group={mockGroup} />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
