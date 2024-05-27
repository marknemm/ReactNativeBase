import { GroupDoc, GroupFilters, Role } from '@interfaces/group';
import { getBackgroundColor } from '@util/colors';
import { DBQueryOptions, DBQueryResult, createDBDoc, getDBDoc, listDBDocs } from '@util/db';
import { toInitials } from '@util/string';
import User from '@util/user';
import { getAuthUser } from './auth';
import { log, logErr } from './log';

/**
 * Represents a {@link Group} of {@link User}s.
 */
export class Group {

  /**
   * The raw {@link Group} document data.
   */
  readonly #groupDoc: GroupDoc;

  /**
   * The {@link Group}'s {@link User} admins.
   */
  #admins: User[];

  /**
   * The {@link Group}'s {@link User} editors.
   */
  #editors: User[];

  /**
   * The {@link Group}'s {@link Member}s.
   */
  #members: Member[];

  /**
   * The {@link Group}'s {@link User} owner.
   */
  #owner: User;

  /**
   * The {@link Group}'s {@link User} viewers.
   */
  #viewers: User[];

  /**
   * Creates a new {@link Group} instance.
   *
   * @param groupDoc The raw {@link GroupDoc} data.
   */
  constructor(groupDoc?: GroupDoc) {
    this.#groupDoc = groupDoc;
  }

  /**
   * The {@link Group} background color.
   */
  get backgroundColor(): string {
    return getBackgroundColor(this.id);
  }

  /**
   * The {@link Group} description.
   */
  get description(): string {
    return this.#groupDoc?.description || '';
  }

  /**
   * The {@link Group} unique identifier.
   */
  get id(): string {
    return this.#groupDoc?.id || '';
  }

  /**
   * The {@link Group} initials.
   */
  get initials(): string {
    return toInitials(this.name);
  }

  /**
   * The {@link Group} name.
   */
  get name(): string {
    return this.#groupDoc?.name || '';
  }

  /**
   * The {@link Group} photo URL.
   */
  get photoURL(): string {
    return this.#groupDoc?.photoURL || '';
  }

  /**
   * The {@link Group} visibility.
   */
  get visibility(): 'private' | 'public' {
    return this.#groupDoc?.visibility || 'private';
  }

  /**
   * Gets the {@link Group}'s {@link User} admins.
   *
   * @returns A promise that resolves to the {@link Group}'s {@link User} admins,
   * or `[]` if the {@link Group} has no admins.
   */
  async getAdmins(): Promise<User[]> {
    this.#admins ??= (await this.#loadMembers())
      .filter((member) => member.role === 'admin')
      .map((member) => member.user);

    return this.#admins;
  }

  /**
   * Gets the {@link Group}'s {@link User} editors.
   *
   * @returns A promise that resolves to the {@link Group}'s {@link User} editors,
   * or `[]` if the {@link Group} has no editors.
   */
  async getEditors(): Promise<User[]> {
    this.#editors ??= (await this.#loadMembers())
      .filter((member) => ['admin', 'editor'].includes(member.role))
      .map((member) => member.user);

    return this.#editors;
  }

  /**
   * Gets the {@link User} who owns the {@link Group}.
   *
   * @returns A promise that resolves to the {@link User} who owns the {@link Group}.
   */
  async getOwner(): Promise<User> {
    this.#owner ??= await getDBDoc('users', this.#groupDoc.owner, (userDoc) => new User(userDoc));
    return this.#owner;
  }

  /**
   * Gets the {@link Group}'s {@link User} viewers.
   *
   * @returns A promise that resolves to the {@link Group}'s {@link User} viewers,
   * or `[]` if the {@link Group} has no viewers.
   */
  async getViewers(): Promise<User[]> {
    this.#viewers ??= (await this.#loadMembers())
      .map((member) => member.user);

    return this.#viewers;
  }

  /**
   * Loads the {@link Group}'s {@link Member}s.
   *
   * Caches the {@link Member}s for future use.
   *
   * @returns A promise that resolves to the {@link Group}'s {@link Member}s,
   * or `[]` if the {@link Group} has no {@link Member}s.
   */
  async #loadMembers(): Promise<Member[]> {
    if (!this.#members) {
      const queryResult = await listDBDocs('users', {
        filters: {
          id: {
            operator: 'in',
            value: Object.keys(this.#groupDoc.members),
          },
        },
      }, (userDoc) => new User(userDoc));

      this.#members = queryResult.items.map((user) => ({
        role: this.#groupDoc.members[user.id],
        user,
      }));
    }

    return this.#members;
  }

}

/**
 * Creates a new {@link Group} in a remote database.
 *
 * @param groupDoc The {@link GroupDoc} data.
 * @param owner The {@link User} that owns the {@link Group}.
 * @returns A promise that resolves to the created {@link Group}.
 */
export async function createGroup(groupDoc: GroupDoc, owner: User): Promise<Group> {
  // Populate the group members with the creating user as an admin.
  groupDoc.createdAt ??= new Date().getTime();
  groupDoc.createdBy ??= getAuthUser()?.uid;
  groupDoc.members ??= {};
  groupDoc.members[owner.id] ??= 'admin';
  groupDoc.owner ??= owner.id;
  groupDoc.visibility ??= 'public';

  try {
    log('Creating group:', groupDoc);
    groupDoc.id = await createDBDoc('groups', groupDoc);
    return new Group(groupDoc);
  } catch (error) {
    logErr('Error creating group:', error);
    throw new Error('Error creating group, please try again');
  }
}

/**
 * Loads {@link Group}s from a remote database.
 *
 * @param queryOptions The {@link DBQueryOptions} for querying {@link Group}s.
 * @returns A promise that resolves to a {@link DBQueryResult} of {@link Group}s.
 */
export async function loadGroups(queryOptions: DBQueryOptions<GroupDoc, GroupFilters>): Promise<DBQueryResult<Group>> {
  return listDBDocs('groups', queryOptions, (groupDoc) => new Group(groupDoc));
}

/**
 * Represents a {@link Group} {@link Member}.
 */
interface Member {

  /**
   * The {@link Member}'s {@link Role}.
   */
  role: Role;

  /**
   * The {@link User} {@link Member}.
   */
  user: User;

}
