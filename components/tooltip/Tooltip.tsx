import { useControlledState } from '@hooks/state-hooks';
import { Tooltip as RneuiTooltip } from '@rneui/themed';
import { Props } from './props';
import { useCallback } from 'react';

/**
 * A tooltip component.
 *
 * The visibility state can be controlled internally or externally.
 */
const Tooltip: React.FC<Props> = ({
  backgroundColor = 'gray',
  children,
  onClose,
  onOpen,
  visible,
  ...tooltipProps
}) => {
  const [tooltipVisible, setTooltipVisible] = useControlledState(visible, false);

  const onCloseCb = useCallback(() => {
    setTooltipVisible(false);
    onClose?.();
  }, [onClose]);

  const onOpenCb = useCallback(() => {
    setTooltipVisible(true);
    onOpen?.();
  }, [onOpen]);

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
}

export default Tooltip;
