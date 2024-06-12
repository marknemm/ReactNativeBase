import type { BottomSheetProps as RneBottomSheetProps } from '@rneui/themed';
import type { StyleProp, ViewStyle } from 'react-native';
import type BottomSheet from './BottomSheet';

/**
 * Properties for the {@link BottomSheet} component.
 *
 * @extends BottomSheetProps The {@link RneBottomSheetProps BottomSheetProps} from the `@rneui/themed` module.
 */
export interface BottomSheetProps extends RneBottomSheetProps {

  /**
   * The children components to display in the bottom sheet.
   */
  children?: React.ReactNode;

  /**
   * The style for the inner content container of the bottom sheet.
   */
  innerStyle?: StyleProp<ViewStyle>;

  /**
   * Callback for when the bottom sheet is to be closed.
   */
  onClose?: () => void;

  /**
   * The title of the bottom sheet.
   */
  title?: string;

}

/**
 * The {@link BottomSheet} component style properties.
 */
export type BottomSheetStyleProps = Pick<BottomSheetProps, 'innerStyle'>;
