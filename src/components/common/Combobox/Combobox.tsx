import React from 'react';

import BaseCombobox, { IBaseComboboxProps } from './BaseCompobox';

interface IOption<T> {
  value: T;
  label: string;
  additionalLabel?: string;
  disabled?: boolean;
}

interface IComboboxProps<T>
  extends Omit<
    IBaseComboboxProps<T>,
    'selectedItem' | 'options' | 'inputValue' | 'onSelectedItemChange' | 'onInputValueChange'
  > {
  value: T;
  onChange: (value: T) => void;
  options: IOption<T>[];
}

const Combobox = <T,>({ options, value, onChange, ...rest }: IComboboxProps<T>) => {
  const selectedItem = React.useMemo(() => options.find((opt) => opt.value === value) || null, [value, options]);

  const [filteredItems, setFilteredItems] = React.useState(options);
  const [inputValue, setInputValue] = React.useState<string>(selectedItem?.label || '');

  React.useEffect(
    () => setFilteredItems(options.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))),
    [inputValue, options],
  );

  return (
    <BaseCombobox
      {...rest}
      selectedItem={selectedItem}
      options={filteredItems}
      inputValue={inputValue}
      onSelectedItemChange={(changes) => {
        if (changes.selectedItem) {
          onChange(changes.selectedItem?.value);
        }
      }}
      onInputValueChange={setInputValue}
    />
  );
};

export default Combobox;
