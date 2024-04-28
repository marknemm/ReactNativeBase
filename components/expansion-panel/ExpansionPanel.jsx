import { ListItem } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

/**
 * The {@link ExpansionPanel} component.
 *
 * @param {Object} props The component properties.
 * @param {React.ReactNode} props.children The children components inside the expansion panel.
 * @param {boolean} [props.expanded=false] The expanded state. Default is `false`.
 * Managed internally, but also can be controlled.
 * @param {(event: Types.GestureResponderEvent) => void} [props.onPress] The function to call when the expansion panel toggle button is pressed.
 * Can be used to control the expanded state externally.
 * @param {React.ReactNode | string} props.title The title of the expansion panel toggle button.
 * @returns {React.JSX.Element} The {@link ExpansionPanel} component.
 */
export function ExpansionPanel({ children, expanded = false, onPress, title }) {
  const [expandedState, setExpandedState] = useState(expanded);

  // Sync expanded state with expanded prop
  useEffect(() => {
    setExpandedState(expanded);
  }, [expanded]);

  // Memoize onPress callback and auto toggle expanded state
  const onPressCb = useCallback((event) => {
    onPress?.(event);
    if (event.isDefaultPrevented()) return;
    setExpandedState((state) => !state);
  }, [onPress]);

  return (
    <ListItem.Accordion
      content={(
        <ListItem.Content>
          <ListItem.Title>
            { title }
          </ListItem.Title>
        </ListItem.Content>
      )}
      isExpanded={expandedState}
      onPress={onPressCb}
    >
      { children }
    </ListItem.Accordion>
  );
}

ExpansionPanel.propTypes = {
  expanded: PropTypes.bool,
  onPress: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};
