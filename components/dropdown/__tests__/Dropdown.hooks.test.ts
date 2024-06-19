import { useDropdownItems } from '@components/dropdown/Dropdown.hooks';
import { renderHook } from '@testing-library/react-native';

describe('Dropdown hooks', () => {
  describe('useDropdownItems', () => {
    it('should give empty array when given null data', () => {
      const dropdownItems = renderHook(() =>
        useDropdownItems(null, 'label', 'value')
      ).result.current;

      expect(dropdownItems).toEqual([]);
    });

    it('should give identity of items that are already formatted correctly', () => {
      const items = [
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
        { label: 'Item 3', value: 'item3' },
      ];

      const dropdownItems = renderHook(() =>
        useDropdownItems(items, 'label', 'value')
      ).result.current;

      expect(dropdownItems).toEqual(items);
    });

    it('should format list of strings into dropdown items', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];

      const dropdownItems = renderHook(() =>
        useDropdownItems<{ l: string, v: string }>(items, 'l', 'v')
      ).result.current;

      expect(dropdownItems).toEqual([
        { l: 'Item 1', v: 'Item 1' },
        { l: 'Item 2', v: 'Item 2' },
        { l: 'Item 3', v: 'Item 3' },
      ]);
    });

    it('should format list of numbers into dropdown items', () => {
      const items = [1, 2, 3];

      const dropdownItems = renderHook(() =>
        useDropdownItems<{ l: string, v: string }>(items, 'l', 'v')
      ).result.current;

      expect(dropdownItems).toEqual([
        { l: '1', v: 1 },
        { l: '2', v: 2 },
        { l: '3', v: 3 },
      ]);
    });

    it('should format list of booleans into dropdown items', () => {
      const items = [true, false];

      const dropdownItems = renderHook(() =>
        useDropdownItems<{ l: string, v: string }>(items, 'l', 'v')
      ).result.current;

      expect(dropdownItems).toEqual([
        { l: 'true', v: true },
        { l: 'false', v: false },
      ]);
    });

    it('should format list of mixed types into dropdown items', () => {
      const items = ['Item 1', 2, true, { l: 'Item 4', v: 'item4' }];

      const dropdownItems = renderHook(() =>
        useDropdownItems<{ l: string, v: string }>(items, 'l', 'v')
      ).result.current;

      expect(dropdownItems).toEqual([
        { l: 'Item 1', v: 'Item 1' },
        { l: '2', v: 2 },
        { l: 'true', v: true },
        { l: 'Item 4', v: 'item4' },
      ]);
    });

    it('should include empty option when includeEmptyOption is true', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];

      const dropdownItems = renderHook(() =>
        useDropdownItems<{ l: string, v: string }>(items, 'l', 'v', true)
      ).result.current;

      expect(dropdownItems).toEqual([
        { l: '', v: null },
        { l: 'Item 1', v: 'Item 1' },
        { l: 'Item 2', v: 'Item 2' },
        { l: 'Item 3', v: 'Item 3' },
      ]);
    });
  });
});
