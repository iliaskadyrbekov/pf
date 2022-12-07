import React from 'react';
import { OptionsType } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { StylesConfig } from 'react-select/src/styles';

interface IValue {
  value: string;
  label: string;
}

interface CreatableInputProps<T> {
  id: string;
  value: IValue[];
  placeholder: string;
  onChange: (value: readonly IValue[] | T) => void;
  transform: (value: IValue[] | OptionsType<IValue>) => T;
  customStyles: StylesConfig<IValue, true>;
  label?: string;
}

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

const classes = {
  label: 'mb-1 block text-sm font-medium text-gray-700',
};

const CreatableInput = <T,>({
  id,
  label,
  value = [],
  transform,
  onChange,
  placeholder,
  customStyles,
}: CreatableInputProps<T>) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (!inputValue) return;
      switch (event.key) {
        case 'Enter':
        case 'Tab':
          setInputValue('');
          const newValue = [...value, createOption(inputValue)];
          const transformedValue = transform ? transform(newValue) : newValue;
          onChange(transformedValue);
          event.preventDefault();
      }
    },
    [value, inputValue],
  );

  const handleChange = (value: OptionsType<IValue>) => {
    const transformedValue = transform ? transform(value) : value;
    onChange(transformedValue);
  };

  return (
    <React.Fragment>
      {label && (
        <label htmlFor={label} className={classes.label}>
          {label}
        </label>
      )}
      <CreatableSelect
        instanceId={id}
        id={id}
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={setInputValue}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || ''}
        value={value}
        styles={customStyles}
      />
    </React.Fragment>
  );
};

export default CreatableInput;
