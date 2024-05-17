import { Props as InputProps } from '@components/input/props';
import { ReactNode } from 'react';
import { FieldPath, FieldValues, Path, ValidationRule } from 'react-hook-form';

/**
 * The `EmailInput` component properties.
 *
 * @extends InputProps The {@link InputProps} from the `@components/input/props` package.
 */
export interface Props<
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends InputProps<TFieldValues, TContext, TFieldName> {

  /**
   * @inheritdoc
   */
  keyboardType?: 'email-address';

  /**
   * The pattern to match the email address against.
   *
   * @default Constants.EMAIL_PATTERN
   */
  pattern?: ValidationRule<RegExp>;

  /**
   * @default 'emailAddress'
   */
  textContentType?: 'emailAddress' | 'username';

}

/**
 * The `EmailInput` component functional component type.
 *
 * @template TFieldValues The type of the form data.
 * @template TContext The type of the form context.
 * @template TFieldName The form field name.
 */
export type EmailInputFC = <
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
>(
  props: Props<TFieldValues, TContext, TFieldName>,
) => ReactNode;
