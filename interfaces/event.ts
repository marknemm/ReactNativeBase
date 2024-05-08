/**
 * Interface for preventable events.
 */
export interface PreventableEvent {

  defaultPrevented?: boolean;

  isDefaultPrevented?: () => boolean;

}
