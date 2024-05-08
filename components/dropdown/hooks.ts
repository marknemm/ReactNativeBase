import { useMemo } from 'react';
import { RawDropdownData } from './props';

/**
 * Generate dropdown items from an array of {@link RawDropdownData}.
 *
 * @template T The type of the dropdown data.
 * @param data The {@link RawDropdownData} to generate dropdown items from.
 * @param labelField The field to use as the label.
 * @param valueField The field to use as the value.
 * @param includeEmptyOption Whether to include an empty option.
 * @returns The dropdown items.
 */
export function useDropdownItems<T = any>(
  data: RawDropdownData<T>,
  labelField: keyof T,
  valueField: keyof T,
  includeEmptyOption = false
): any[] {
  return useMemo(() => {
    const dropdownItems = data
      ? data.map((datum) => {
        if (typeof datum === 'string' || typeof datum === 'number' || typeof datum === 'boolean' || !datum) {
          const dropdownDatum = {} as any;
          dropdownDatum[labelField] = `${datum}`;
          dropdownDatum[valueField] = `${datum}`;
          return dropdownDatum;
        }
        return datum;
      })
      : [];

    if (includeEmptyOption) {
      const emptyDatum = {} as any;
      emptyDatum[labelField] = '';
      emptyDatum[valueField] = null;
      dropdownItems.unshift(emptyDatum);
    }

    return dropdownItems;
  }, [data, labelField, valueField, includeEmptyOption]);
}
