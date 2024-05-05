/**
 * The `Input` component theme.
 *
 * @param {Types.Rneui.InputProps} props The `Input` component {@link Types.Rneui.InputProps properties}.
 * @param {Types.Rneui.FullTheme} theme The {@link Types.Rneui.FullTheme theme}.
 * @returns {Types.Rneui.InputProps} The default themed `Input` component {@link Types.Rneui.InputProps properties}.
 */
export default function Input(props, theme) {
  return {
    containerStyle: theme.styles.form.fieldContainer,
    inputContainerStyle: theme.styles.form.fieldBorder,
    inputStyle: theme.styles.form.field,
    labelStyle: theme.styles.form.label,
    placeholderTextColor: theme.colors.placeholder,
    style: theme.styles.form.fieldText,
  };
}
