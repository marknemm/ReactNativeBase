import { useControlledState } from '@hooks/state-hooks';
import { Tooltip as RneuiTooltip } from '@rneui/themed';
import { useCallback } from 'react';
import type { TooltipProps } from './Tooltip.interfaces';

/**
 * A tooltip component.
 *
 * The visibility state can be controlled internally or externally.
 *
 * @param props The component {@link TooltipProps}.
 * @returns The {@link Tooltip} component.
 */
const Tooltip: React.FC<TooltipProps> = ({
  backgroundColor = 'gray',
  children,
  onClose,
  onOpen,
  visible,
  ...tooltipProps
}) => {
  const [tooltipVisible, setTooltipVisible] = useControlledState(visible, { initValue: false });

  const onCloseCb = useCallback(() => {
    setTooltipVisible(false);
    onClose?.();
  }, [onClose, setTooltipVisible]);

  const onOpenCb = useCallback(() => {
    setTooltipVisible(true);
    onOpen?.();
  }, [onOpen, setTooltipVisible]);

  return (
    <RneuiTooltip
      backgroundColor={backgroundColor}
      onClose={onCloseCb}
      onOpen={onOpenCb}
      visible={tooltipVisible}
      {...tooltipProps}
    >
      { children }
    </RneuiTooltip>
  );
};

export type * from './Tooltip.interfaces';
export default Tooltip;
