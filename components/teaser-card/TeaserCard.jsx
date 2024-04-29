import Avatar from '@components/avatar/Avatar';
import { Button, Card, Text } from '@rneui/themed';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The {@link TeaserCard} component.
 *
 * @param {Types.TeaserCard.TeaserCardProps} props The component {@link Types.TeaserCard.TeaserCardProps properties}.
 * @returns {React.JSX.Element} The {@link TeaserCard} component.
 */
export default function TeaserCard({
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
}) {
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

TeaserCard.propTypes = {
  avatarBackgroundColor: PropTypes.string,
  avatarIcon: PropTypes.object,
  avatarRounded: PropTypes.bool,
  avatarSize: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['medium', 'small', 'large', 'xlarge'])]),
  avatarTitle: PropTypes.string,
  avatarURL: PropTypes.string,
  onPress: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};
