import GroupCard from '@components/group-card/GroupCard';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';
import { genMockGroup } from '@util/__mocks__/group';
import type Group from '@util/group';

describe('<GroupCard />', () => {
  let mockGroup: Group;

  beforeEach(() => {
    mockGroup = genMockGroup();
  });

  describe('snapshots', () => {
    it('renders correctly when not given a group', () => {
      render(
        <GroupCard group={null} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when given a group', () => {
      render(
        <GroupCard group={mockGroup} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
