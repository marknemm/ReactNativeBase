import { BottomSheetProps as RneBottomSheetProps } from '@rneui/base';
import { ViewStyle } from 'react-native';

/**
 * Properties for the `BottomSheet` component.
 */
export interface BottomSheetProps extends RneBottomSheetProps {

  /**
   * The children components to display in the bottom sheet.
   */
  children?: React.ReactNode;

  /**
   * The style for the inner content container of the bottom sheet.
   */
  innerStyle?: ViewStyle;

  /**
   * Callback for when the bottom sheet is to be closed.
   */
  onClose?: () => void;

  /**
   * The title of the bottom sheet.
   */
  title?: string;

}
