import ActivityIndicator from '@components/activity-indicator/ActivityIndicator';
import Input from '@components/input/Input';
import ClearButton from '@components/input/clear-button/ClearButton';
import { InputRefType } from '@components/input/props';
import { SEARCH_ICON } from '@constants/icons';
import { useFormFieldValue } from '@hooks/form-hooks';
import { useMergedRefs } from '@hooks/state-hooks';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { useColors } from '@hooks/theme-hooks';
import { forwardRef, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { SearchBarFC } from './props';
import { useStyles } from './styles';

/**
 * An {@link Input} field that is specialized for search queries.
 *
 * @param props The component {@link Props}.
 * @param ref The component reference.
 * @returns The {@link SearchBar} component.
 */
const SearchBar: SearchBarFC = forwardRef(({
  showLoading = false,
  ...inputProps
}, ref) => {
  const value = useFormFieldValue(inputProps);
  const inputRef = useRef<InputRefType>();
  const colors = useColors();
  const generalStyles = useGeneralStyles();
  const styles = useStyles(inputProps);

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
        inputRef={inputRef}
        isVisible={!!value}
      />
    </View>
  ), [generalStyles, showLoading, styles, value]);

  return (
    <Input
      leftIcon={searchIcon}
      placeholder="Search..."
      rightIcon={rightIcon}
      {...inputProps}
      ref={useMergedRefs(inputRef, ref)}
    />
  );
});

export default SearchBar;
