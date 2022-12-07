import React from 'react';
import { Listbox } from '@headlessui/react';

interface IOptionLayoutProps {
  name: string;
  value: string;
  children?: React.ReactNode;
  isDisabled?: boolean;
  pricing?: string;
  isActive?: boolean;
}

const classes = {
  wrapper: (isDisabled: boolean) =>
    `${
      isDisabled ? 'pointer-events-none' : ''
    } py-1.5 cursor-pointer relative hover:bg-[#6A6A6A] hover:bg-opacity-10 transition duration-300 ease-in-out rounded-md px-2`,
  content: 'flex items-center space-x-2 justify-between',
  optionName: (isDisabled: boolean, isActive: boolean) =>
    `${isDisabled ? 'text-[#C4C4C4]' : ''} ${isActive ? 'font-bold' : ''} text-base text-gray-800`,
  pricing: 'font-bold text-sm',
  nameWrapper: 'w-full',
};

const OptionLayout = ({ value, name, children, pricing, isDisabled = false, isActive = false }: IOptionLayoutProps) => {
  return (
    <Listbox.Option className={classes.wrapper(isDisabled)} value={value} disabled={isDisabled}>
      <div className={classes.content}>
        <div className={classes.nameWrapper}>
          <p className={classes.optionName(isDisabled, isActive)}>{name}</p>
          {pricing && <span className={classes.pricing}>{pricing}</span>}
        </div>
        {children}
      </div>
    </Listbox.Option>
  );
};

export default OptionLayout;
