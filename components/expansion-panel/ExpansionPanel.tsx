import { useControlledToggleState } from '@hooks/state-hooks';
import { ListItem } from '@rneui/themed';
import { Props } from './props';

/**
 * A component for a expandable panel with a title toggle button.
 *
 * The expanded state can be controlled internally or externally.
 *
 * @param props The component {@link Props}.
 * @returns The {@link ExpansionPanel} component.
 */
const ExpansionPanel: React.FC<Props> = ({
  children,
  initExpanded = false,
  isExpanded,
  onPress,
  title,
  ...accordionProps
}) => {
  const [expandedState, toggleExpandedState] = useControlledToggleState(
    isExpanded,
    onPress,
    { initValue: initExpanded }
  );

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
      {...accordionProps}
    >
      { children }
    </ListItem.Accordion>
  );
};

export default ExpansionPanel;
