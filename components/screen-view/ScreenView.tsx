import Form from '@components/form/Form';
import { ScrollView, View } from 'react-native';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * A root {@link View} for a screen.
 *
 * @param props The component {@link Props}.
 * @returns The {@link ScreenView} component.
 */
const ScreenView: React.FC<Props> = ({
  children,
  containerStyle,
  form,
  fullScreen,
  noFooter,
  noHeader,
  noScroll,
  style,
  ...screenProps
}) => {
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
      <View
        {...screenProps}
        style={styles.inner}
      >
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
};

export default ScreenView;
