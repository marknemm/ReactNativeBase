import Form from '@components/form/Form';
import { ScrollView, View } from 'react-native';
import type { ScreenViewProps } from './ScreenView.interfaces';
import { useStyles } from './ScreenView.styles';

/**
 * A root {@link View} for a screen.
 *
 * @param props The component {@link ScreenViewProps}.
 * @returns The {@link ScreenView} component.
 */
const ScreenView: React.FC<ScreenViewProps> = ({
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
        testID="rnb-screen-form-view"
      >
        { children }
      </Form>
    )
    : (
      <View
        {...screenProps}
        style={styles.inner}
        testID="rnb-screen-view"
      >
        { children }
      </View>
    );

  return noScroll
    ? (
      <View
        style={styles.container}
        testID="rnb-screen-container-view"
      >
        { inner }
      </View>
    )
    : (
      <ScrollView
        style={styles.container}
        testID="rnb-screen-scroll-container-view"
      >
        { inner }
      </ScrollView>
    );
};

export type * from './ScreenView.interfaces';
export default ScreenView;
