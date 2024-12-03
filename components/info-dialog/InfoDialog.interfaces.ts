import type { DialogProps } from '@rneui/base';
import type InfoDialog from './InfoDialog';

/**
 * The {@link InfoDialog} component properties.
 *
 * @extends DialogProps The {@link DialogProps} from the `@rneui/base` module.
 */
export interface InfoDialogProps extends DialogProps {

  /**
   * The function to call when the {@link InfoDialog} is closed.
   */
  onClose?: () => void;

  /**
   * The title of the {@link InfoDialog}.
   */
  title?: string;

}
