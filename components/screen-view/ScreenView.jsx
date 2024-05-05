import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from './styles';

/**
 * The {@link ScreenView} component.
 *
 * @param {Object} props The component properties.
 * @param {React.ReactNode} [props.children] The children components.
 * @param {boolean} [props.safeArea=false] Whether to apply safe area styling.
 * @param {boolean} [props.safeAreaBottom=false] Whether to apply safe area styling to the bottom.
 * @param {boolean} [props.scrollable=false] Whether the form is scrollable.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The {@link Types.ViewStyle style} to apply.
 * @returns {React.JSX.Element} The {@link ScreenView} component.
 */
export default function ScreenView(props) {
  const { children, safeArea, scrollable } = props;
  const styles = useStyles(props);

  const innerView = safeArea
    ? (
      <SafeAreaView style={styles.viewStyle}>
        { children }
      </SafeAreaView>
    )
    : (
      <View style={styles.viewStyle}>
        { children }
      </View>
    );

  return scrollable
    ? (
      <ScrollView>
        { innerView }
      </ScrollView>
    )
    : innerView;
}

ScreenView.propTypes = {
  safeArea: PropTypes.bool,
  scrollable: PropTypes.bool,
};
