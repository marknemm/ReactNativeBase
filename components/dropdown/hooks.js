import { useMemo } from 'react';

/**
 * Generate dropdown items from an array of raw data.
 *
 * @param {Array<string | number | boolean | { label: string, value: any } | Object>} data The raw data to generate dropdown items from.
 * @param {string} labelField The field to use as the label.
 * @param {string} valueField The field to use as the value.
 * @param {boolean} includeEmptyOption Whether to include an empty option.
 * @returns {any[]} The dropdown items.
 */
export function useDropdownItems(data, labelField, valueField, includeEmptyOption) {
  return useMemo(() => {
    const dropdownItems = data
      ? data.map((datum) => {
        if (typeof datum === 'string' || typeof datum === 'number' || typeof datum === 'boolean' || !datum) {
          const dropdownDatum = {};
          dropdownDatum[labelField] = `${datum}`;
          dropdownDatum[valueField] = `${datum}`;
          return dropdownDatum;
        }
        return datum;
      })
      : [];

    if (includeEmptyOption) {
      const emptyDatum = {};
      emptyDatum[labelField] = '';
      emptyDatum[valueField] = null;
      dropdownItems.unshift(emptyDatum);
    }

    return dropdownItems;
  }, [data, labelField, valueField, includeEmptyOption]);
}
