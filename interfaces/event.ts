/**
 * Interface for preventable events.
 */
export interface PreventableEvent {

  /**
   * Whether the default action has been prevented.
   */
  defaultPrevented?: boolean;

  /**
   * Determines whether the default action should be prevented.
   *
   * @returns Whether the default action should be prevented.
   */
  isDefaultPrevented?: () => boolean;

}
