import React from 'react';
import { Listbox, Transition } from '@headlessui/react';

interface ICustomSelectLayoutProps {
  listBox: React.ReactNode;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  tipText: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  countItems?: string;
}

const classes = {
  wrapper: 'relative w-full',
  listboxButton:
    'relative flex items-center w-full bg-gray-50 rounded-lg py-3.5 px-3.5 h-12 border-2 group hover:border-indigo-600 border-gray-50 transition duration-300 ease-in-out',
  selected: 'truncate text-base text-gray-800 pr-6 text-left w-full',
  rightIcon: (open: boolean) =>
    `${open ? 'transform rotate-180' : ''} absolute inset-y-0 right-4 flex items-center pointer-events-none`,
  listboxOptions:
    'mt-1 overflow-hidden absolute z-10 w-full bg-gray-50 shadow-lg rounded-md py-4 pl-1 pr-2 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none',
  tipText: 'text-sm leading-none text-gray-400 px-2 mb-2',
  leftIcon: 'pr-1.5',
};

const CustomSelect = ({
  listBox,
  selected,
  setSelected,
  rightIcon,
  leftIcon,
  tipText,
  countItems,
}: ICustomSelectLayoutProps) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className={classes.wrapper}>
          <Listbox.Button className={classes.listboxButton}>
            {leftIcon && <span className={classes.leftIcon}>{leftIcon}</span>}
            <span className={classes.selected}>
              {countItems}
              {selected ? selected : tipText}
            </span>
            {rightIcon && <span className={classes.rightIcon(open)}>{rightIcon}</span>}
          </Listbox.Button>
          <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options static className={classes.listboxOptions}>
              <p className={classes.tipText}>{tipText}</p>
              {listBox}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default CustomSelect;
