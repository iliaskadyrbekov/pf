import React from 'react';
import { SelectorIcon } from '@heroicons/react/solid';
import { Listbox, Transition } from '@headlessui/react';

import { SimpleOption } from '../Select/components';

import { classNames } from '@utils/classNames';

const classes = {
  wrapper: 'w-full',
  label: 'block mb-1 text-sm font-medium text-gray-700',
  selectWrapper: 'relative',
  selectButton: (isError?: boolean) =>
    `${
      isError ? 'border-red-500' : 'border-gray-300'
    } bg-white relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`,
  selectIconWrapper: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
  selectIcon: 'h-5 w-5 text-gray-400',
  selectedOption: 'block truncate',
  placeholder: 'text-gray-500',
  dropdown:
    'absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm',
  optionActive: 'text-white bg-indigo-600',
  optionInactive: 'text-gray-900',
  option: 'cursor-default select-none relative py-2 pl-3 pr-9',
};

interface IOption<T> {
  value: T | IOption<T>[];
  label: string;
  disabled?: boolean;
}

interface IOptionRenderProps {
  selected: boolean;
  active: boolean;
  disabled: boolean;
}

interface ISelectWithGroupingProps<T> {
  isError?: boolean;
  options: IOption<T>[];
  value: T;
  placeholder?: React.ReactNode;
  label?: React.ReactNode;
  renderSelectedOption?: (option?: IOption<T>) => React.ReactNode;
  renderOption?: (option: IOption<T> & IOptionRenderProps) => React.ReactNode;
  onChange: (value: T) => void;
}

const SelectWithGrouping = <T,>({
  options,
  value,
  placeholder,
  label,
  onChange,
  renderOption,
  renderSelectedOption,
  isError,
}: ISelectWithGroupingProps<T>) => {
  const selected = options.reduce<IOption<T> | null>((acc, cur) => {
    if (Array.isArray(cur.value)) {
      const selectedOption = cur.value.find(({ value: nestedVal }) => nestedVal === value);

      if (selectedOption) {
        return selectedOption;
      } else {
        return acc;
      }
    }

    if (cur.value === value) {
      return cur;
    } else {
      return acc;
    }
  }, null);

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className={classes.wrapper}>
          {label && <Listbox.Label className={classes.label}>{label}</Listbox.Label>}
          <div className={classes.selectWrapper}>
            <Listbox.Button className={classes.selectButton(isError)}>
              {selected && renderSelectedOption ? (
                renderSelectedOption(selected)
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
              <Listbox.Options static className={classes.dropdown}>
                {options.map(({ value, label, disabled }, index) => {
                  if (Array.isArray(value)) {
                    return (
                      <React.Fragment key={index}>
                        <div key={`group-${label}-${index}`} className="py-1 pl-2 bg-gray-100">
                          {label}
                        </div>
                        {value.map(({ disabled, value, label }, indexInner) => (
                          <Listbox.Option
                            key={`${index}-${indexInner}`}
                            disabled={disabled}
                            className={({ active }) =>
                              classNames(active ? classes.optionActive : classes.optionInactive, classes.option)
                            }
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
                      </React.Fragment>
                    );
                  } else {
                    return (
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
                            renderOption({ ...renderProps, value, label })
                          ) : (
                            <SimpleOption {...{ ...renderProps, value, label }} />
                          )
                        }
                      </Listbox.Option>
                    );
                  }
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default SelectWithGrouping;
