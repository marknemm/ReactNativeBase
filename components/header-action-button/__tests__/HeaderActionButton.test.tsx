import HeaderActionButton from '@components/header-action-button/HeaderActionButton';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';
import { StyleProp, TextStyle } from 'react-native';

describe('<HeaderActionButton />', () => {
  const title = 'test';

  describe('styles', () => {
    it('correctly applies default title style', () => {
      render(
        <HeaderActionButton
          title={title}
          titleStyle={{ fontWeight: 'bold' }}
        />,
        { wrapper: AppProvider }
      );

      const buttonTitle = screen.getByText(title);
      expect(buttonTitle).toHaveStyle({ color: 'white' });
    });

    it('correctly applies custom title styles', () => {
      const titleStyle: StyleProp<TextStyle> = {
        color: 'black',
        fontWeight: 'bold',
      };

      render(
        <HeaderActionButton
          title={title}
          titleStyle={titleStyle}
        />,
        { wrapper: AppProvider }
      );

      const buttonTitle = screen.getByText(title);
      expect(buttonTitle).toHaveStyle(titleStyle);
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <HeaderActionButton title={title} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
