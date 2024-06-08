import type { FormFieldProps } from '@interfaces/form';
import type { AvatarProps as RneAvatarProps } from '@rneui/themed';
import type { ReactNode, RefAttributes } from 'react';
import type { FieldPath, FieldValues, Path } from 'react-hook-form';
import type { ColorValue } from 'react-native';

/**
 * The `Avatar` component properties.
 */
export interface AvatarProps<
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends RneAvatarProps, FormFieldProps<TFieldValues, TContext, TFieldName>, RefAttributes<RneAvatarProps> {

  /**
   * The background color of the `Avatar` if displaying an {@link icon} or {@link title}.
   */
  backgroundColor?: ColorValue;

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

/**
 * The `Avatar` component style properties.
 */
export type AvatarStyleProps = Pick<AvatarProps, 'backgroundColor' | 'containerStyle'>;

/**
 * The `Avatar` component functional component type.
 *
 * @template TFieldValues The type of the form data.
 * @template TContext The type of the form context.
 * @template TFieldName The form field name.
 */
export type AvatarFC = <
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
>(
  props: AvatarProps<TFieldValues, TContext, TFieldName>,
) => ReactNode;
