import { ListItem } from '@rneui/themed';
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * The expansion panel component.
 *
 * @param {Object} param0 The component properties.
 * @param {React.ReactNode} param0.children The children components inside the expansion panel.
 * @param {boolean} [param0.initExpanded=false] The initial expanded state.
 * @param {string} param0.title The title of the expansion panel toggle button.
 * @returns {React.JSX.Element} The expansion panel component.
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
