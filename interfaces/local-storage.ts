/**
 * Local storage item data type.
 */
export type LSDataType = 'boolean' | 'buffer' | 'number' | 'serialized' | 'string';

/**
 * Local storage state options.
 *
 * @template T The state type.
 */
export interface LSStateOptions<T = any> {

  /**
   * The data type of the persistent state. Defaults to `'serialized'`.
   */
  dataType?: LSDataType;

  /**
   * The default value of the persistent state which shall be set after attempting to load non-existing state from local storage.
   */
  defaultValue?: T;

  /**
   * Whether to persist the state on set state. Defaults to `true`.
   */
  persistOnSetState?: boolean;

  /**
   * Whether to watch changes to the persistent state. Defaults to `true`.
   */
  watchChanges?: boolean;

}
