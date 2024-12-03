import Dropdown from '@components/dropdown/Dropdown';
import { useDropdownItems } from '@components/dropdown/Dropdown.hooks';
import Form from '@components/form/Form';
import { genMockForm } from '@hooks/__mocks__/form-hooks';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';

jest.mock('@components/dropdown/Dropdown.hooks');

describe('<Dropdown />', () => {
  let mockData: { label: string, labelAlt: string, value: string, valueAlt: string }[];

  beforeEach(() => {
    mockData = [
      { label: 'item 1', labelAlt: 'item 1 alt', value: 'value 1', valueAlt: 'value 1 alt' },
      { label: 'item 2', labelAlt: 'item 2 alt', value: 'value 2', valueAlt: 'value 2 alt' },
      { label: 'item 3', labelAlt: 'item 3 alt', value: 'value 3', valueAlt: 'value 3 alt' },
    ];
  });

  describe('dropdown items', () => {
    it('generates dropdown items from the raw data and default options', () => {
      render(
        <Dropdown data={mockData} />,
        { wrapper: AppProvider }
      );

      expect(useDropdownItems).toHaveBeenCalledWith(mockData, 'label', 'value', false);
    });

    it('generates dropdown items from the raw data and custom options', () => {
      render(
        <Dropdown
          data={mockData}
          includeEmptyOption
          labelField="labelAlt"
          valueField="valueAlt"
        />,
        { wrapper: AppProvider }
      );

      expect(useDropdownItems).toHaveBeenCalledWith(mockData, 'labelAlt', 'valueAlt', true);
    });
  });

  describe('value changes', () => {
    it('calls the `onChange` callback when dropdown item is selected', async () => {
      const onChange = jest.fn();
      render(
        <Dropdown
          data={mockData}
          onChange={onChange}
        />,
        { wrapper: AppProvider }
      );

      await openDropdown();
      const dropdownItem = screen.getByText(mockData[0].label);
      await userEvent.press(dropdownItem);

      expect(onChange).toHaveBeenCalledWith(expect.objectContaining(mockData[0]));
    });
  });

  describe('form control', () => {
    it('Updates the form value and calls the `onChange` callback when dropdown item is selected', async () => {
      const form = genMockForm({
        dropdown: '',
      });
      const onChange = jest.fn();

      render(
        <Form form={form}>
          <Dropdown
            data={mockData}
            name="dropdown"
            onChange={onChange}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      await openDropdown();
      const dropdownItem = screen.getByText(mockData[1].label);
      await userEvent.press(dropdownItem);

      expect(form.getValues('dropdown')).toBe(mockData[1].value);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining(mockData[1]));
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <Dropdown data={mockData} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with label and placeholder', () => {
      render(
        <Dropdown
          data={mockData}
          label="Test Dropdown Label"
          placeholder="Test Dropdown Placeholder"
        />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when open', async () => {
      render(
        <Dropdown data={mockData} />,
        { wrapper: AppProvider }
      );

      await openDropdown();
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  it('renders correctly when open with alternate label and value fields', async () => {
    render(
      <Dropdown
        data={mockData}
        labelField="labelAlt"
        valueField="valueAlt"
      />,
      { wrapper: AppProvider }
    );

    await openDropdown({ labelField: 'labelAlt' });
    expect(screen.toJSON()).toMatchSnapshot();
  });

  async function openDropdown({
    placeholder = 'Select item',
    labelField = 'label' as keyof typeof mockData[0],
  } = {}) {
    const dropdownToggle = screen.getByText(placeholder);
    await userEvent.press(dropdownToggle);
    await screen.findByText(mockData[0][labelField]);
  }
});
