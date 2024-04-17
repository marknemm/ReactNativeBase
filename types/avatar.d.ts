import { AvatarProps as RneAvatarProps } from '@rneui/base';
import { User } from '@util/user';
import { ImagePickerAsset } from 'expo-image-picker';
import { FormFieldProps } from './form-field';

/**
 * Properties for the `Avatar` component.
 */
export interface AvatarProps extends RneAvatarProps, FormFieldProps {

  /**
   * The background color of the `Avatar` if displaying an {@link icon} or {@link title}.
   */
  backgroundColor?: string;

  /**
   * The usage description of the `Avatar` (e.g. `Profile Picture`).
   */
  description?: string;

  /**
   * Whether the `Avatar` is editable. Defaults to `false`.
   */
  editable?: boolean;

  /**
   * Callback for when the user changes the `Avatar` image.
   *
   * @param uri The new `Avatar` image uri.
   */
  onChange?: (uri: string) => void;

  /**
   * The uri value of the `Avatar` image.
   */
  value?: string;

}
