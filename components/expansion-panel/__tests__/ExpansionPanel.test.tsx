import ExpansionPanel from '@components/expansion-panel/ExpansionPanel';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';

describe('<ExpansionPanel />', () => {
  const title = 'Test Expansion Panel';
  const childrenStr = 'Test children';

  describe('display props', () => {
    it('renders title', () => {
      render(
        <ExpansionPanel title={title} />,
        { wrapper: AppProvider }
      );

      const titleElement = screen.getByText(title);
      expect(titleElement).toBeTruthy();
    });
  });

  describe('initial expanded state', () => {
    it('is collapsed by default', () => {
      render(
        <ExpansionPanel title={title}>
          <Text>{childrenStr}</Text>
        </ExpansionPanel>,
        { wrapper: AppProvider }
      );

      const children = screen.queryByText(childrenStr);
      expect(children).toBeFalsy();
    });

    it('is expanded when initExpanded is true', () => {
      render(
        <ExpansionPanel
          initExpanded
          title={title}
        >
          <Text>{childrenStr}</Text>
        </ExpansionPanel>,
        { wrapper: AppProvider }
      );

      const children = screen.queryByText(childrenStr);
      expect(children).toBeTruthy();
    });
  });

  describe('uncontrolled (auto) expanded state', () => {
    it('is expanded when pressed', async () => {
      render(
        <ExpansionPanel title={title}>
          <Text>{childrenStr}</Text>
        </ExpansionPanel>,
        { wrapper: AppProvider }
      );

      const expansionToggle = screen.getByText(title);
      await userEvent.press(expansionToggle);

      const children = screen.queryByText(childrenStr);
      expect(children).toBeTruthy();
    });

    it('is collapsed when pressed after init expanded', async () => {
      render(
        <ExpansionPanel
          initExpanded
          title={title}
        >
          <Text>{childrenStr}</Text>
        </ExpansionPanel>,
        { wrapper: AppProvider }
      );

      const expansionToggle = screen.getByText(title);
      await userEvent.press(expansionToggle);

      const children = screen.queryByText(childrenStr);
      expect(children).toBeFalsy();
    });
  });

  describe('controlled expanded state', () => {
    it('is expanded when isExpanded is true', () => {
      render(
        <ExpansionPanel
          isExpanded
          title={title}
        >
          <Text>{childrenStr}</Text>
        </ExpansionPanel>,
        { wrapper: AppProvider }
      );

      const children = screen.queryByText(childrenStr);
      expect(children).toBeTruthy();
    });

    it('is collapsed when isExpanded is false', () => {
      render(
        <ExpansionPanel
          initExpanded
          isExpanded={false}
          title={title}
        >
          <Text>{childrenStr}</Text>
        </ExpansionPanel>,
        { wrapper: AppProvider }
      );

      const children = screen.queryByText(childrenStr);
      expect(children).toBeFalsy();
    });

    it('invokes onPress callback', async () => {
      const onPress = jest.fn();
      render(
        <ExpansionPanel
          isExpanded
          onPress={onPress}
          title={title}
        >
          <Text>{childrenStr}</Text>
        </ExpansionPanel>,
        { wrapper: AppProvider }
      );

      const expansionToggle = screen.getByText(title);
      await userEvent.press(expansionToggle);

      expect(onPress).toHaveBeenCalled();
    });

    it('does not change expanded state automatically', async () => {
      render(
        <ExpansionPanel
          isExpanded={false}
          title={title}
        >
          <Text>{childrenStr}</Text>
        </ExpansionPanel>,
        { wrapper: AppProvider }
      );

      const expansionToggle = screen.getByText(title);
      await userEvent.press(expansionToggle);

      const children = screen.queryByText(childrenStr);
      expect(children).toBeFalsy();
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <ExpansionPanel title={title} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with children', () => {
      render(
        <ExpansionPanel title={title}>
          <Text>Test children</Text>
        </ExpansionPanel>,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with children and expanded', () => {
      render(
        <ExpansionPanel
          initExpanded
          title={title}
        >
          <Text>Test children</Text>
        </ExpansionPanel>,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
