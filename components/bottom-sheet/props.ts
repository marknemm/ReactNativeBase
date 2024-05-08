import { BottomSheetProps } from '@rneui/themed';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * Properties for the `BottomSheet` component.
 *
 * @extends BottomSheetProps The {@link BottomSheetProps} from the `@rneui/themed` module.
 */
export interface Props extends BottomSheetProps {

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
 * The `BottomSheet` component style properties.
 */
export type StyleProps = Pick<Props, 'innerStyle'>;
