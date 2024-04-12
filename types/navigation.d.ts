import { NavigationContainerProps, NavigationContainerRefWithCurrent, ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootNavigationRef = NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
export type StackNavigation = NativeStackScreenProps<ParamListBase>['navigation'];
export type Route = NativeStackScreenProps<ParamListBase>['route'];
export type ThemedNavigationContainerProps = NavigationContainerProps & {
  theme?: Theme | undefined;
  linking?: LinkingOptions<RootParamList>;
  fallback?: React.ReactNode;
  documentTitle?: DocumentTitleOptions | undefined;
  onReady?: (() => void) | undefined;
};
