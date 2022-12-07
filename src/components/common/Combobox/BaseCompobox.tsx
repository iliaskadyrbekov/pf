import React from 'react';
import { Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import { useCombobox, UseComboboxStateChange } from 'downshift';

import { classNames } from '@utils/classNames';
import { SimpleOption } from './components';
import { Input } from '../Input';

const classes = {
  wrapper: 'w-full relative',
  label: 'block mb-1 text-sm font-medium text-gray-700',
  selectWrapper: 'relative',
  selectButton: (isError?: boolean) =>
    `${
      isError ? 'border-red-500' : 'border-gray-300'
    } bg-white relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`,
  selectIcon: 'h-5 w-5 text-gray-400',
  dropdown:
    'absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm',
  optionActive: 'text-white bg-indigo-600',
  optionInactive: 'text-gray-900',
  option: 'cursor-default select-none relative py-2 pl-3 pr-9',
};

interface IOption<T> {
  value: T;
  label: string;
  additionalLabel?: string;
  disabled?: boolean;
}

interface IOptionRenderProps {
  selected: boolean;
  active: boolean;
  disabled?: boolean;
}

export interface IBaseComboboxProps<T> {
  isError?: boolean;
  options: IOption<T>[];
  placeholder?: string;
  label?: React.ReactNode;

  selectedItem: IOption<T> | null;
  inputValue: string;
  onSelectedItemChange: (changes: UseComboboxStateChange<IOption<T>>) => void;
  onInputValueChange?: (inputValue: string) => void;
  renderOption?: (option: IOption<T> & IOptionRenderProps) => React.ReactNode;
}

const BaseCombobox = <T,>({
  selectedItem,
  options,
  inputValue,
  isError,
  placeholder,
  label,
  onSelectedItemChange,
  onInputValueChange,
  renderOption,
}: IBaseComboboxProps<T>) => {
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: options,
    selectedItem,
    inputValue,
    itemToString: (item) => item?.label || '',
    onSelectedItemChange,
    onInputValueChange: ({ inputValue = '' }) => onInputValueChange?.(inputValue),
    stateReducer: (_, { type, changes }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return { ...changes, inputValue: changes.selectedItem?.label || '' };
        default:
          return changes;
      }
    },
  });

  return (
    <div className={classes.wrapper}>
      {label && (
        <label {...getLabelProps()} className={classes.label}>
          {label}
        </label>
      )}
      <div className={classes.selectWrapper} {...getComboboxProps()}>
        <Input
          {...getToggleButtonProps()}
          {...getInputProps()}
          placeholder={placeholder}
          className={classes.selectButton(isError)}
          rightElement={
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button {...getToggleButtonProps()} aria-label="toggle menu">
                <SelectorIcon className={classes.selectIcon} aria-hidden="true" />
              </button>
            </div>
          }
        />
      </div>
      <ul {...getMenuProps()}>
        <Transition
          show={isOpen}
          as={React.Fragment}
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={classes.dropdown}>
            {options.map((item, index) => (
              <li
                key={index}
                className={classNames(
                  highlightedIndex === index ? classes.optionActive : classes.optionInactive,
                  classes.option,
                )}
                {...getItemProps({ item, index })}
              >
                {renderOption ? (
                  renderOption({
                    ...item,
                    active: highlightedIndex === index,
                    selected: item.value === selectedItem?.value,
                  })
                ) : (
                  <SimpleOption
                    {...item}
                    active={highlightedIndex === index}
                    selected={item.value === selectedItem?.value}
                  />
                )}
              </li>
            ))}
          </div>
        </Transition>
      </ul>
    </div>
  );
};

export default BaseCombobox;
