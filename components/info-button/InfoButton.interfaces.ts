import type InfoDialog from '@components/info-dialog/InfoDialog';
import type { FixedIconButtonProps } from '@interfaces/button';
import type { PropsWithChildren } from 'react';
import type InfoButton from './InfoButton';

/**
 * The {@link InfoButton} component props.
 *
 * @extends FixedIconButtonProps The {@link FixedIconButtonProps} from the `@interfaces/button` module.
 */
export interface InfoButtonProps extends PropsWithChildren<FixedIconButtonProps> {

  /**
   * The title of the {@link InfoDialog}.
   *
   * Ignored if {@link children} is not provided.
   */
  dialogTitle?: string;

}
