import type { GroupDoc, Role } from '@interfaces/group';
import { genMockUser } from '@util/__mocks__/user';
import type Group from '@util/group';
import type User from '@util/user';

jest.mock('@util/user');

const ActualGroup: typeof Group = jest.requireActual('@util/group').default;

/**
 * Generates a {@link GroupDoc} object that can be used as mock data.
 *
 * @param seed The seed number to use for group data generation.
 * @returns A {@link GroupDoc} object.
 */
export const genGroupDoc = (seed = 0): GroupDoc => ({
  createdAt: 1718466583000 + (seed * 10),
  createdBy: `uid-${seed}`,
  description: `Group (${seed}) for testing purposes.`,
  name: `Test Group (${seed})`,
  members: {
    [`uid-${seed}`]: 'admin',
    [`uid-${seed + 1}`]: 'viewer',
    [`uid-${seed + 2}`]: 'editor',
    [`uid-${seed + 3}`]: 'viewer',
    [`uid-${seed + 4}`]: 'editor',
  },
  owner: `uid-${seed}`,
  photoURL: `https://www.example.com/group${seed}.jpg`,
  visibility: 'public',
});

/**
 * Generates a {@link Group} object that can be used as mock data.
 *
 * @param seed The seed number to use for {@link Group} data generation.
 * @returns A mock {@link Group} object.
 */
export const genMockGroup = (seed = 0): Group => new GroupMock(genGroupDoc(seed));

/**
 * Generates mock {@link User} objects for the given {@link Role} in the given {@link GroupDoc} data.
 *
 * @param docData The {@link GroupDoc} data.
 * @param role The {@link Role} to generate mock {@link User} objects for.
 * @returns An array of mock {@link User} objects.
 */
const genMockUsersOfRole = (docData: GroupDoc, role: Role): User[] =>
  Object.keys(docData.members)
    .filter((id) => docData.members[id] === role)
    .map((id) => id.charCodeAt(id.length - 1) - 48)
    .map((seed) => genMockUser(seed));

/**
 * The `@util/group` module mock.
 */
const GroupMock = jest.fn<Group, [GroupDoc]>().mockImplementation((docData: GroupDoc = genGroupDoc()) => {
  const group = new ActualGroup(docData);

  jest.spyOn(group, 'getAdmins').mockResolvedValue(
    genMockUsersOfRole(docData, 'admin')
  );
  jest.spyOn(group, 'getEditors').mockResolvedValue(
    genMockUsersOfRole(docData, 'editor')
  );
  jest.spyOn(group, 'getOwner').mockResolvedValue(
    genMockUser(docData.owner.charCodeAt(docData.owner.length - 1) - 48)
  );
  jest.spyOn(group, 'getViewers').mockResolvedValue(
    genMockUsersOfRole(docData, 'viewer')
  );

  return group;
});

export default GroupMock;
