import Avatar from '@components/avatar/Avatar';
import { Button, Card, Text } from '@rneui/themed';
import { View } from 'react-native';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * A card with a surrounding link, avatar image, title, and subtitle.
 *
 * @param props The component {@link Props}.
 * @returns The {@link TeaserCard} component.
 */
const TeaserCard: React.FC<Props> = ({
  children,
  icon,
  onPress,
  photoPlaceholder,
  photoPlaceholderBg,
  photoRounded = true,
  photoSize = 'medium',
  photoURL,
  subtitle,
  subtitleNumberOfLines = 1,
  title,
  titleNumberOfLines = 2,
  ...styleProps
}) => {
  const styles = useStyles(styleProps);

  return (
    <Button
      disabled={!onPress}
      onPress={onPress}
      size="lg"
      type="clear"
    >
      <Card
        containerStyle={styles.cardContainer}
        wrapperStyle={styles.cardInner}
      >
        <Avatar
          avatarStyle={styles.photo}
          backgroundColor={photoPlaceholderBg}
          icon={icon}
          iconStyle={styles.icon}
          rounded={photoRounded}
          size={photoSize}
          title={photoPlaceholder}
          titleStyle={styles.photoPlaceholder}
          value={photoURL}
        />

        <View style={styles.textContent}>
          <Card.Title
            ellipsizeMode="tail"
            numberOfLines={titleNumberOfLines}
            style={styles.title}
          >
            {title}
          </Card.Title>
          {subtitle && (
            <Text
              ellipsizeMode="tail"
              numberOfLines={subtitleNumberOfLines}
              style={styles.subtitle}
            >
              {subtitle}
            </Text>
          )}
          {children}
        </View>
      </Card>
    </Button>
  );
};

export default TeaserCard;
