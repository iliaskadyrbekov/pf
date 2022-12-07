import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';

import { classNames } from '@utils/classNames';
import { SimpleOption } from './components';
import { Tooltip } from '../Tooltip';

const classes = {
  wrapper: 'w-full',
  header: 'flex justify-between',
  label: 'block text-sm font-medium text-gray-700',
  selectWrapper: 'relative',
  selectButton: (isError?: boolean) =>
    `${
      isError ? 'border-red-500' : 'border-gray-300'
    } flex items-center bg-white relative w-full border rounded-md shadow-sm pl-3 py-2 pr-10 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-full`,
  selectIconWrapper: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
  selectIcon: 'h-5 w-5 text-gray-400',
  selectedOption: 'block truncate',
  placeholder: 'text-gray-500',
  dropdown:
    'absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm',
  optionActive: 'text-white bg-indigo-600',
  optionInactive: 'text-gray-900',
  option: 'cursor-default select-none relative py-2 pl-3 pr-9',
  tipText: 'text-sm leading-none text-gray-400 px-2 mb-2',
};

export interface IOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface IOptionRenderProps {
  selected: boolean;
  active: boolean;
  disabled: boolean;
}

export interface ISelectProps<T> {
  isError?: boolean;
  options: IOption<T>[];
  value: T;
  tipText?: string;
  placeholder?: React.ReactNode;
  tooltipContent?: React.ReactNode;
  label?: React.ReactNode;
  disabled?: boolean;
  renderSelectedOption?: (option?: IOption<T>) => React.ReactNode;
  renderOption?: (option: IOption<T> & IOptionRenderProps, index: number) => React.ReactNode;
  onChange: (value: T) => void;
  wrapperClassName?: string;
  dropdownClassName?: string;
  selectButtonClassName?: string;
  renderDefaultOption?: React.ReactNode;
}

const Select = <T,>({
  options,
  value,
  placeholder,
  label,
  onChange,
  renderOption,
  renderDefaultOption,
  renderSelectedOption,
  tooltipContent,
  isError,
  wrapperClassName,
  dropdownClassName,
  selectButtonClassName,
  tipText,
  disabled,
}: ISelectProps<T>) => {
  const selected = options.find(({ value: val }) => val === value);

  return (
    <Listbox disabled={disabled} value={value} onChange={onChange}>
      {({ open }) => (
        <div className={classes.wrapper}>
          <div className={classes.header}>
            {label && <Listbox.Label className={classes.label}>{label}</Listbox.Label>}
            {tooltipContent && <Tooltip>{tooltipContent}</Tooltip>}
          </div>
          <div className={classNames(classes.selectWrapper, wrapperClassName)}>
            <Listbox.Button className={classNames(classes.selectButton(isError), selectButtonClassName)}>
              {selected && renderSelectedOption ? (
                renderSelectedOption(selected)
              ) : renderDefaultOption ? (
                renderDefaultOption
              ) : (
                <span className={classNames(classes.selectedOption, selected ? '' : classes.placeholder)}>
                  {selected ? selected.label : placeholder}
                </span>
              )}
              <span className={classes.selectIconWrapper}>
                <SelectorIcon className={classes.selectIcon} aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options static className={classNames(classes.dropdown, dropdownClassName)}>
                {tipText && <p className={classes.tipText}>{tipText}</p>}
                {options.map(({ value, label, disabled }, index) => (
                  <Listbox.Option
                    key={index}
                    disabled={disabled}
                    className={({ active }) =>
                      classNames(active ? classes.optionActive : classes.optionInactive, classes.option)
                    }
                    value={value}
                  >
                    {(renderProps) =>
                      renderOption ? (
                        renderOption({ ...renderProps, value, label }, index)
                      ) : (
                        <SimpleOption {...{ ...renderProps, value, label }} />
                      )
                    }
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
