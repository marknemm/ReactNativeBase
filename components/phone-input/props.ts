import { Props as InputProps } from '@components/input/props';
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
