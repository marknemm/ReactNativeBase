import Form from '@components/form/Form';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { useStyles } from './styles';

/**
 * The {@link ScreenView} component.
 *
 * @param {Object} props The component properties.
 * @param {React.ReactNode} [props.children] The children components.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.containerStyle] The {@link Types.ViewStyle style} to apply to the container.
 * @param {Types.Form.UseFormReturn<any>} [props.form] The {@link Types.Form.UseFormReturn form} that shall be provided to the view children.
 * @param {boolean} [props.fullScreen=false] Whether to apply full screen (no header / bottom tabs) styling.
 * @param {boolean} [props.noFooter=false] Whether to apply no footer styling.
 * @param {boolean} [props.noHeader=false] Whether to apply no header styling.
 * @param {boolean} [props.noScroll=false] Whether to not apply scrolling to the view.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The {@link Types.ViewStyle style} to apply to the inner {@link View}.
 * @returns {React.JSX.Element} The {@link ScreenView} component.
 */
export default function ScreenView({
  children,
  containerStyle,
  form,
  fullScreen,
  noFooter,
  noHeader,
  noScroll,
  style,
}) {
  const styles = useStyles({ containerStyle, fullScreen, noFooter, noHeader, style });

  const inner = form
    ? (
      <Form
        form={form}
        style={styles.inner}
      >
        { children }
      </Form>
    )
    : (
      <View style={styles.inner}>
        { children }
      </View>
    );

  return noScroll
    ? (
      <View style={styles.container}>
        { inner }
      </View>
    )
    : (
      <ScrollView style={styles.container}>
        { inner }
      </ScrollView>
    );
}

ScreenView.propTypes = {
  containerStyle: PropTypes.object,
  form: PropTypes.object,
  fullScreen: PropTypes.bool,
  noFooter: PropTypes.bool,
  noHeader: PropTypes.bool,
  noScroll: PropTypes.bool,
};
