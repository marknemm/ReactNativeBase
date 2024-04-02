import { Tooltip as RneuiTooltip } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * The tooltip component.
 *
 * @param {Object} param0 The component properties.
 * @param {string} [param0.backgroundColor='gray'] The background color of the tooltip.
 * @param {React.ReactNode} param0.children The children of the tooltip.
 * @param {React.ReactElement} param0.popover The content of the tooltip.
 * @returns {React.JSX.Element} The status dot component.
 */
export default function Tooltip({ backgroundColor = 'gray', children, popover}) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <RneuiTooltip
      backgroundColor={backgroundColor}
      popover={popover}
      onOpen={() => setTooltipVisible(true)}
      onClose={() => setTooltipVisible(false)}
      visible={tooltipVisible}
    >
      { children }
    </RneuiTooltip>
  );
}

Tooltip.propTypes = {
  backgroundColor: PropTypes.string,
  popover: PropTypes.element.isRequired,
};
