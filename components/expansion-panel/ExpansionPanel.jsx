import { useControlledToggleState } from '@hooks/misc-hooks';
import { ListItem } from '@rneui/themed';
import PropTypes from 'prop-types';

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
  const [expandedState, toggleExpandedState] = useControlledToggleState(expanded, onPress);

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
      onPress={toggleExpandedState}
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
