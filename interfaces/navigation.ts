import { DocumentTitleOptions, LinkingOptions, NavigationContainerProps, NavigationContainerRefWithCurrent, ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Theme } from '@rneui/themed';

export type RootNavigationContainerRef = NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
export type Route = NativeStackScreenProps<ParamListBase>['route'];
export type StackNavigation = NativeStackScreenProps<ParamListBase>['navigation'];
export type ThemedNavigationContainerProps = NavigationContainerProps & {
  theme?: Theme | undefined;
  linking?: LinkingOptions<ReactNavigation.RootParamList>;
  fallback?: React.ReactNode;
  documentTitle?: DocumentTitleOptions | undefined;
  onReady?: (() => void) | undefined;
};
