import React from 'react';

import BaseCombobox, { IBaseComboboxProps } from './BaseCompobox';

interface IOption<T> {
  value: T;
  label: string;
  additionalLabel?: string;
  disabled?: boolean;
}

interface ICreatableComboboxProps
  extends Omit<
    IBaseComboboxProps<string>,
    'selectedItem' | 'options' | 'inputValue' | 'onSelectedItemChange' | 'onInputValueChange'
  > {
  value: string;
  additionalLabel: string;
  onChange: (value: string) => void;
  options: IOption<string>[];
}

const CreatableCombobox = ({ options, value, onChange, additionalLabel, ...rest }: ICreatableComboboxProps) => {
  const selectedItem = React.useMemo(
    () => options.find((opt) => opt.value === value) || (value && { value, label: value }) || null,
    [value, options],
  );

  const [inputValue, setInputValue] = React.useState<string>(selectedItem?.label || '');
  const [filteredItems, setFilteredItems] = React.useState(options);

  React.useEffect(() => {
    const filteredOptions = options.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()));

    if (inputValue && options.every(({ label }) => label !== inputValue) && selectedItem?.value !== inputValue) {
      return setFilteredItems([
        ...filteredOptions,
        { value: inputValue, label: inputValue, additionalLabel: additionalLabel },
      ]);
    }

    return setFilteredItems(filteredOptions);
  }, [inputValue, options]);

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

export default CreatableCombobox;
