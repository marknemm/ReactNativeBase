import { Props as InputProps } from '@components/input/props';
import { ReactNode } from 'react';
import { FieldPath, FieldValues, Path, ValidationRule } from 'react-hook-form';

/**
 * The `PhoneInput` component properties.
 *
 * @extends InputProps The {@link InputProps} from the `@components/input/props` package.
 */
export interface Props<
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends InputProps<TFieldValues, TContext, TFieldName>  {

  /**
   * @inheritdoc
   */
  autoComplete?: 'tel';

  /**
   * @inheritdoc
   */
  keyboardType?: 'phone-pad';

  /**
   * The pattern to match the phone number against.
   *
   * @default Constants.PHONE_PATTERN
   */
  pattern?: ValidationRule<RegExp>;

  /**
   * @inheritdoc
   */
  textContentType?: 'telephoneNumber';

}

/**
 * The `PhoneInput` component functional component type.
 *
 * @template TFieldValues The type of the form data.
 * @template TContext The type of the form context.
 * @template TFieldName The form field name.
 */
export type PhoneInputFC = <
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
>(
  props: Props<TFieldValues, TContext, TFieldName>,
) => ReactNode;
