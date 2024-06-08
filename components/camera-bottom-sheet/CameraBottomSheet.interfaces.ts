/**
 * The `CameraBottomSheet` component properties.
 */
export interface CameraBottomSheetProps {

  /**
   * Whether the bottom sheet is visible.
   */
  isVisible?: boolean;

  /**
   * The function to call when the bottom sheet is to be closed.
   */
  onClose?: () => void;

  /**
   * The function to call when the choose photo button is pressed.
   */
  onPressChoosePhoto?: () => void;

  /**
   * The function to call when the take photo button is pressed.
   */
  onPressTakePhoto?: () => void;

  /**
   * The description.
   */
  title?: string;

}
