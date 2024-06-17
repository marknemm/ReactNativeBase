// import type { StyleProps } from '@components/input/Input.interfaces';
// import { useFormControl, useFormErrorMessage, useValidationRules } from '@hooks/form-hooks';
// import { useGeneralStyles, useThemedStyles } from '@hooks/styles-hooks';
// import type { FormFieldProps } from '@interfaces/form';
// import { SearchBar as RneSearchBar, SearchBarProps, useTheme } from '@rneui/themed';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { Controller, FieldPath, FieldValues, Path } from 'react-hook-form';
// import { StyleSheet, TextInput } from 'react-native';

// /**
//  * An input field that is specialized for search queries.
//  *
//  * @param props The component {@link Props}.
//  * @returns The {@link SearchBar} component.
//  */
// const SearchBar: React.FC<Props> = (props) => {
//   const { label, name, onBlur, onChangeText } = props;

//   // Derive entities related to an input controlled by react-hook-form
//   const control = useFormControl(props);
//   const rules = useValidationRules(props, label?.toString());
//   const errorMessage = useFormErrorMessage(rules, props);

//   return control
//     ? (
//       <Controller
//         control={control}
//         name={name}
//         render={({ field: { onChange: onChangeForm, onBlur: onBlurForm, value } }) => (
//           <SearchBarControlled
//             {...props}
//             errorMessage={errorMessage}
//             onBlur={(event) => {
//               onBlurForm();
//               onBlur?.(event);
//             }}
//             onChangeText={(text) => {
//               onChangeForm(text);
//               onChangeText?.(text);
//             }}
//             value={value}
//           />
//         )}
//         rules={rules}
//       />
//     )
//     : <SearchBarControlled {...props} />;
// };

// /**
//  * Controlled {@link SearchBar} component.
//  *
//  * @param props The component {@link Props}.
//  * @returns The {@link SearchBarControlled} component.
//  */
// const SearchBarControlled: React.FC<Props> = ({
//   containerStyle,
//   inputContainerStyle,
//   inputStyle,
//   labelStyle,
//   onChangeText,
//   style,
//   value,
//   ...searchBarProps
// }) => {
//   const styles = useStyles({ containerStyle, inputContainerStyle, inputStyle, labelStyle, style });
//   const { theme } = useTheme();
//   const [uiValue, setUiValue] = useState('');
//   const inputRef = useRef<TextInput>();

//   useEffect(() => {
//     // Sync value prop with input (UI) value. Done manually to prevent change on each keystroke and prevent lag.
//     if (value !== undefined && value !== uiValue) {
//       inputRef.current?.setNativeProps({ text: value });
//     }
//   }, [value, uiValue]);

//   return (
//     <RneSearchBar
//       keyboardAppearance={theme.mode}
//       placeholderTextColor={theme.colors.placeholder}
//       {...searchBarProps}
//       containerStyle={styles.container}
//       inputContainerStyle={styles.inputContainer}
//       inputStyle={styles.input}
//       labelStyle={styles.label}
//       onChangeText={useCallback((text) => {
//         onChangeText?.(text);
//         setUiValue(text);
//       }, [onChangeText])}
//       ref={inputRef}
//       style={styles.style}
//     />
//   );
// };

// /**
//  * Gets the styles for the `SearchBar` component.
//  *
//  * @param props The component {@link StyleProps}.
//  * @returns The styles for the `SearchBar` component.
//  */
// function useStyles({ containerStyle, inputContainerStyle, inputStyle, labelStyle, style }: StyleProps) {
//   const generalStyles = useGeneralStyles();

//   return useThemedStyles(() => ({
//     container: {
//       ...generalStyles.form.fieldContainer,
//       ...StyleSheet.flatten(containerStyle),
//     },
//     inputContainer: {
//       ...generalStyles.form.fieldBorder,
//       ...StyleSheet.flatten(inputContainerStyle),
//     },
//     input: {
//       ...generalStyles.form.field,
//       ...StyleSheet.flatten(inputStyle),
//     },
//     label: {
//       ...generalStyles.form.label,
//       ...StyleSheet.flatten(labelStyle),
//     },
//     style: {
//       ...generalStyles.form.fieldText,
//       ...StyleSheet.flatten(style),
//     },
//   }), [containerStyle, inputContainerStyle, inputStyle, generalStyles, labelStyle, style]);
// }

// /**
//  * The `SearchBar` component properties.
//  */
// type Props<
//   TFieldValues extends FieldValues = any,
//   TContext = any,
//   TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
// > = SearchBarProps & FormFieldProps<TFieldValues, TContext, TFieldName>;

// export default SearchBar;
