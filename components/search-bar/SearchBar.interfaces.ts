import type { InputProps, InputStyleProps } from '@components/input/Input.interfaces';
import type { ReactNode } from 'react';
import type { FieldPath, FieldValues, Path } from 'react-hook-form';
import type { StyleProp, ViewStyle } from 'react-native';
import type SearchBar from './SearchBar';

export { InputRefType } from '@components/input/Input.interfaces';

/**
 * The {@link SearchBar} component properties.
 *
 * @extends InputProps The {@link InputProps} from the `@components/input/Input.interfaces` module.
 */
export interface SearchBarProps<
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends InputProps<TFieldValues, TContext, TFieldName> {

  /**
   * Whether to show the loading indicator.
   */
  showLoading?: boolean;

}

/**
 * The {@link SearchBar} component style properties.
 */
export type SearchBarStyleProps = InputStyleProps & {

  /**
   * The loading indicator style.
   */
  loadingStyle?: StyleProp<ViewStyle>;

};

/**
 * The {@link SearchBar} component functional component type.
 *
 * @template TFieldValues The type of the form data.
 * @template TContext The type of the form context.
 * @template TFieldName The form field name.
 * @param props The component {@link SearchBarProps}.
 */
export type SearchBarFC = <
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
>(
  props: SearchBarProps<TFieldValues, TContext, TFieldName>,
) => ReactNode;
