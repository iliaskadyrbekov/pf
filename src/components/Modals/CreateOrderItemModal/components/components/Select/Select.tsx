import React from 'react';
import dynamic from 'next/dynamic';
import { Listbox, Transition } from '@headlessui/react';

import { SimpleOption } from './components';
const ChevronDownIcon = dynamic(() => import('@heroicons/react/solid/ChevronDownIcon'), { ssr: false });

import { classNames } from '@utils/classNames';

const classes = {
  wrapper: 'w-full',
  label: 'block mb-1 text-sm font-medium text-gray-700',
  selectWrapper: 'relative',
  selectButton:
    'relative flex items-center w-full bg-gray-50 rounded-lg py-3.5 px-3.5 h-12 border-2 group hover:border-indigo-600 border-gray-50 transition duration-300 ease-in-out',
  selectIconWrapper: 'absolute inset-y-0 right-4 flex items-center pointer-events-none',
  selectIcon: 'h-5 w-5 text-gray-400',
  selectedOption: 'block truncate pr-4',
  dropdown:
    'mt-1 overflow-hidden absolute z-10 w-full bg-gray-50 shadow-lg rounded-md py-4 pl-1 pr-2 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none',
  option:
    'cursor-pointer select-none relative hover:bg-[#6A6A6A] hover:bg-opacity-10 transition duration-300 ease-in-out rounded-md px-2 py-1.5',
  disabled: 'cursor-default text-[#C4C4C4] relative py-1.5 px-2',
  tipText: 'text-sm leading-none text-gray-400 px-2 mb-2',
  arrowIcon: (open: boolean) =>
    `${
      open ? 'transform rotate-180' : ''
    } h-5 w-5 text-[#2A2C32] group-hover:text-indigo-600 transition duration-300 ease-in-out`,
};

interface IOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface IOptionRenderProps {
  selected: boolean;
  active: boolean;
  disabled: boolean;
}

interface ISelectProps {
  isError?: boolean;
  options: IOption[];
  value?: string | number;
  emptyLabel: React.ReactNode;
  label?: React.ReactNode;
  renderSelectedOption?: (option?: IOption) => React.ReactNode;
  renderOption?: (option: IOption & IOptionRenderProps) => React.ReactNode;
  onChange: (value: string | number) => void;
  tipText: string;
}

const Select = ({
  options,
  value,
  emptyLabel,
  label,
  onChange,
  renderOption,
  renderSelectedOption,
  tipText,
}: ISelectProps) => {
  const selected = options.find(({ value: val }) => val === value);

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className={classes.wrapper}>
          {label && <Listbox.Label className={classes.label}>{label}</Listbox.Label>}
          <div className={classes.selectWrapper}>
            <Listbox.Button className={classes.selectButton}>
              {selected && renderSelectedOption ? (
                renderSelectedOption(selected)
              ) : (
                <span className={classes.selectedOption}>{selected ? selected.label : emptyLabel}</span>
              )}
              <span className={classes.selectIconWrapper}>
                <ChevronDownIcon className={classes.arrowIcon(open)} aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              // as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options static className={classes.dropdown}>
                <p className={classes.tipText}>{tipText}</p>
                {options.map(({ value, label, disabled }) => (
                  <Listbox.Option
                    key={value}
                    disabled={disabled}
                    className={() => classNames(disabled ? classes.disabled : classes.option)}
                    value={value}
                  >
                    {(renderProps) =>
                      renderOption ? (
                        renderOption({ ...renderProps, value, label })
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
