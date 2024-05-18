import { useControlledState } from '@hooks/state-hooks';
import { Tooltip as RneuiTooltip } from '@rneui/themed';
import { useCallback } from 'react';
import { Props } from './props';

/**
 * A tooltip component.
 *
 * The visibility state can be controlled internally or externally.
 *
 * @param props The component {@link Props}.
 * @returns The {@link Tooltip} component.
 */
const Tooltip: React.FC<Props> = ({
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

export default Tooltip;
