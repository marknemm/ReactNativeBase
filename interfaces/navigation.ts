import { DocumentTitleOptions, LinkingOptions, NavigationContainerProps, NavigationContainerRefWithCurrent, ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Theme } from '@rneui/themed';

/**
 * The root navigation container reference.
 */
export type RootNavigationContainerRef = NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;

/**
 * The navigation route.
 */
export type Route = NativeStackScreenProps<ParamListBase>['route'];

/**
 * The stack navigation.
 */
export type StackNavigation = NativeStackScreenProps<ParamListBase>['navigation'];

/**
 * The themed navigation container properties.
 */
export type ThemedNavigationContainerProps = NavigationContainerProps & {

  /**
   * The theme to use for the navigation container.
   */
  theme?: Theme | undefined;

  /**
   * The linking options for the navigation container.
   */
  linking?: LinkingOptions<ReactNavigation.RootParamList>;

  /**
   * The fallback element to render while the navigation container is loading.
   */
  fallback?: React.ReactNode;

  /**
   * The document title options for the navigation container.
   */
  documentTitle?: DocumentTitleOptions | undefined;

  /**
   * The on ready callback for the navigation container.
   */
  onReady?: (() => void) | undefined;

};
