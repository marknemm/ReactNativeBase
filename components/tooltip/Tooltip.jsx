import { Tooltip as RneuiTooltip } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * The {@link Tooltip} component.
 *
 * @param {Object} props The component properties.
 * @param {string} [props.backgroundColor='gray'] The background color of the {@link Tooltip}.
 * @param {React.ReactNode} props.children The children of the {@link Tooltip}.
 * @param {React.ReactElement} props.popover The content of the {@link Tooltip}.
 * @returns {React.JSX.Element} The {@link Tooltip} component.
 */
export default function Tooltip({ backgroundColor = 'gray', children, popover }) {
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
