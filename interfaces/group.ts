import { DBDocData, DBFilters } from './db';

/**
 * A raw {@link GroupDoc} from a remote database.
 *
 * @extends DBDocData The {@link DBDocData} interface.
 */
export interface GroupDoc extends DBDocData {

  /**
   * The group creation timestamp.
   */
  createdAt?: number;

  /**
   * The unique ID of the user who created the group.
   */
  createdBy?: string;

  /**
   * The group's description.
   */
  description?: string;

  /**
   * The group's name.
   */
  name?: string;

  /**
   * A map of group member user IDs to their {@link Role}s.
   */
  members?: Record<string, Role>;

  /**
   * The unique ID of the group owner.
   */
  owner?: string;

  /**
   * The group's photo URL.
   */
  photoURL?: string;

  /**
   * The group's visibility.
   */
  visibility?: 'private' | 'public';

}

/**
 * Filters for querying `Groups`.
 */
export type GroupFilters = DBFilters<GroupDoc>;

/**
 * The {@link Group} {@link Member} {@link Role}.
 */
export type Role = 'admin' | 'editor' | 'viewer';
