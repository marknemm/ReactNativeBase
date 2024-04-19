import { NavigationContainerProps, NavigationContainerRef, NavigationContainerRefWithCurrent, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';

export type NativeStackNavigationOptions = NativeStackNavigationOptions;
export type NavigationContainerRef = NavigationContainerRef<ParamListBase>;
export type RootNavigationContainerRef = NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
export type Route = NativeStackScreenProps<ParamListBase>['route'];
export type StackNavigation = NativeStackScreenProps<ParamListBase>['navigation'];
export type ThemedNavigationContainerProps = NavigationContainerProps & {
  theme?: Theme | undefined;
  linking?: LinkingOptions<RootParamList>;
  fallback?: React.ReactNode;
  documentTitle?: DocumentTitleOptions | undefined;
  onReady?: (() => void) | undefined;
};
