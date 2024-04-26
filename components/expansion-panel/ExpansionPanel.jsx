import { ListItem } from '@rneui/themed';
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * The {@link ExpansionPanel} component.
 *
 * @param {Object} props The component properties.
 * @param {React.ReactNode} props.children The children components inside the expansion panel.
 * @param {boolean} [props.initExpanded=false] The initial expanded state.
 * @param {string} props.title The title of the expansion panel toggle button.
 * @returns {React.JSX.Element} The {@link ExpansionPanel} component.
 */
export function ExpansionPanel({ children, initExpanded = false, title }) {
  const [expanded, setExpanded] = useState(initExpanded);

  return (
    <ListItem.Accordion
      content={(
        <ListItem.Content>
          <ListItem.Title>{ title }</ListItem.Title>
        </ListItem.Content>
      )}
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}
    >
      { children }
    </ListItem.Accordion>
  );
}

ExpansionPanel.propTypes = {
  initExpanded: PropTypes.bool,
  title: PropTypes.string.isRequired,
};
