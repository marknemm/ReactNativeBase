import ActivityIndicator from '@components/activity-indicator/ActivityIndicator';
import Input from '@components/input/Input';
import ClearButton from '@components/input/clear-button/ClearButton';
import { SEARCH_ICON } from '@constants/icons';
import { useFormFieldValue } from '@hooks/form-hooks';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { useColors } from '@hooks/theme-hooks';
import { RefObject, forwardRef, useMemo, useRef } from 'react';
import { View } from 'react-native';
import type { InputRefType, SearchBarFC, SearchBarProps } from './SearchBar.interfaces';
import { useStyles } from './SearchBar.styles';

/**
 * An {@link Input} field that is specialized for search queries.
 *
 * @param props The component {@link SearchBarProps}.
 * @param ref The component reference.
 * @returns The {@link SearchBar} component.
 */
const SearchBar: SearchBarFC = forwardRef(({
  showLoading = false,
  ...inputProps
}, ref) => {
  const value = useFormFieldValue(inputProps);
  const colors = useColors();
  const generalStyles = useGeneralStyles();
  const styles = useStyles(inputProps);
  const inputRef = useRef<InputRefType>();
  ref ??= inputRef;

  const searchIcon = useMemo(() => ({
    ...SEARCH_ICON,
    color: colors.placeholder,
    size: 18,
  }), [colors]);

  const rightIcon = useMemo(() => (
    <View style={generalStyles.view.row}>
      <ActivityIndicator
        isVisible={showLoading}
        style={styles.loading}
      />

      <ClearButton
        inputRef={ref as RefObject<InputRefType>}
        isVisible={!!value}
      />
    </View>
  ), [generalStyles, ref, showLoading, styles, value]);

  return (
    <Input
      leftIcon={searchIcon}
      placeholder="Search..."
      rightIcon={rightIcon}
      {...inputProps}
      ref={ref}
    />
  );
});

export type * from './SearchBar.interfaces';
export default SearchBar;
