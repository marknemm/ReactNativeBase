import Avatar from '@components/avatar/Avatar';
import { Button, Card, Text } from '@rneui/themed';
import { View } from 'react-native';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * A card with a surrounding link, avatar image, title, and subtitle.
 */
const TeaserCard: React.FC<Props> = ({
  avatarBackgroundColor,
  avatarIcon,
  avatarRounded = true,
  avatarSize = 'medium',
  avatarTitle,
  avatarURL,
  children,
  onPress,
  subtitle,
  title,
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
          avatarStyle={styles.avatar}
          backgroundColor={avatarBackgroundColor}
          icon={avatarIcon}
          iconStyle={styles.avatarIcon}
          rounded={avatarRounded}
          size={avatarSize}
          title={avatarTitle}
          titleStyle={styles.avatarTitle}
          value={avatarURL}
        />

        <View style={styles.textContent}>
          <Card.Title style={styles.title}>
            {title}
          </Card.Title>
          {subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
          {children}
        </View>
      </Card>
    </Button>
  );
}

export default TeaserCard;
