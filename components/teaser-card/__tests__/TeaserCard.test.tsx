import TeaserCard from '@components/teaser-card/TeaserCard';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';

describe('<TeaserCard />', () => {
  const childrenStr = 'Children';
  const icon = { name: 'user', type: 'font-awesome' };
  const photoURL = 'https://example.com/photo.jpg';
  const photoPlaceholder = 'Photo';
  const photoPlaceholderBg = 'gray';
  const subtitle = 'Subtitle';
  const title = 'Title';

  describe('display props', () => {
    it('displays the title', () => {
      render(
        <TeaserCard title={title} />,
        { wrapper: AppProvider }
      );

      const titleText = screen.getByText(title);
      expect(titleText).toBeVisible();
    });

    it('displays the subtitle', () => {
      render(
        <TeaserCard subtitle={subtitle} />,
        { wrapper: AppProvider }
      );

      const titleText = screen.getByText(subtitle);
      expect(titleText).toBeVisible();
    });

    it('displays the icon', () => {
      render(
        <TeaserCard icon={icon} />,
        { wrapper: AppProvider }
      );

      const iconElement = screen.getByTestId('RNE__Avatar__Image');
      expect(iconElement).toBeVisible();
    });

    it('displays the photo', () => {
      render(
        <TeaserCard photoURL={photoURL} />,
        { wrapper: AppProvider }
      );

      const iconElement = screen.getByTestId('RNE__Avatar__Image');
      expect(iconElement).toBeVisible();
    });

    it('displays the photo placeholder', () => {
      render(
        <TeaserCard photoPlaceholder={photoPlaceholder} />,
        { wrapper: AppProvider }
      );

      const iconElement = screen.getByTestId('RNE__Avatar__Image');
      expect(iconElement).toBeVisible();

      const textElement = screen.getByText(photoPlaceholder);
      expect(textElement).toBeVisible();
    });

    it('displays children', () => {
      render(
        <TeaserCard>
          <Text>{childrenStr}</Text>
        </TeaserCard>,
        { wrapper: AppProvider }
      );

      const childrenElement = screen.getByText(childrenStr);
      expect(childrenElement).toBeVisible();
    });
  });

  describe('callback props', () => {
    it('calls onPress', async () => {
      const onPress = jest.fn();
      render(
        <TeaserCard onPress={onPress} />,
        { wrapper: AppProvider }
      );

      const buttonElement = screen.getByRole('button');
      await userEvent.press(buttonElement);

      expect(onPress).toHaveBeenCalled();
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <TeaserCard />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with all display props', () => {
      render(
        <TeaserCard
          icon={icon}
          photoPlaceholder={photoPlaceholder}
          photoPlaceholderBg={photoPlaceholderBg}
          photoURL={photoURL}
          subtitle={subtitle}
          title={title}
        >
          <Text>{childrenStr}</Text>
        </TeaserCard>,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
