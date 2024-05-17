import { Props as InputProps, StyleProps as InputStyleProps } from '@components/input/props';
import { ReactNode } from 'react';
import { FieldPath, FieldValues, Path } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * The `SearchBar` component properties.
 *
 * @extends InputProps The {@link InputProps} from the `@components/input/props` module.
 */
export interface Props<
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
 * The `SearchBar` component style properties.
 */
export type StyleProps = InputStyleProps & {

  /**
   * The loading indicator style.
   */
  loadingStyle?: StyleProp<ViewStyle>;

};

/**
 * The `SearchBar` component functional component type.
 *
 * @template TFieldValues The type of the form data.
 * @template TContext The type of the form context.
 * @template TFieldName The form field name.
 */
export type SearchBarFC = <
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
>(
  props: Props<TFieldValues, TContext, TFieldName>,
) => ReactNode;
