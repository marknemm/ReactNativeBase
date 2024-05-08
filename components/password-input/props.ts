import { FieldPath, FieldValues, Path, ValidationRule } from 'react-hook-form';
import { Props as InputProps } from '@components/input/props';

/**
 * The `PasswordInput` component properties.
 *
 * @extends InputProps The {@link InputProps} from the `@components/input/props` package.
 */
export interface Props<
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends InputProps<TFieldValues, TContext, TFieldName>  {

  /**
   * @default 'current-password'
   */
  autoComplete?: 'current-password' | 'new-password';

  /**
   * Whether the password visibility toggle is enabled.
   *
   * @default true
   */
  isVisibilityToggleEnabled?: boolean;

  /**
   * @default 'default'
   */
  keyboardType?: 'default' | 'visible-password';

  /**
   * The minimum length of the password.
   *
   * @default 6
   */
  minLength?: ValidationRule<number>;

  /**
   * @default 'password'
   */
  textContentType?: 'newPassword' | 'password';

}
