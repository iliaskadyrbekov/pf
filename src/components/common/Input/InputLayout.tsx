import { classNames } from '@utils/classNames';
import React from 'react';

const classes = {
  wrapper: 'w-full',
  header: 'flex justify-between mb-1',
  label: 'flex items-center text-sm font-medium text-gray-700',
  icon: 'mr-2',
  inputWrapper: 'shadow-sm relative',
  input: (isError?: boolean, isDisabled?: boolean) =>
    `rounded-md border  focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  ${
      isError ? 'border-red-500' : 'border-gray-300'
    } ${isDisabled ? 'bg-gray-300' : ''}`,
};

interface IInputLayoutProps {
  icon: React.ReactNode;
  label: React.ReactNode;
  tooltipContent: React.ReactNode;
  leftElement: React.ReactNode;
  rightElement: React.ReactNode;
  input: (className: string) => React.ReactNode;
  name?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  isError?: boolean;
}

const InputLayout = ({
  icon,
  label,
  name,
  tooltipContent,
  leftElement,
  rightElement,
  input,
  wrapperClassName,
  isError,
  inputClassName,
  disabled,
}: IInputLayoutProps) => {
  const className = classNames(classes.input(isError, disabled), inputClassName);

  return (
    <div className={classNames(classes.wrapper, wrapperClassName)}>
      <div className={classes.header}>
        {label && (
          <label htmlFor={name} className={classes.label}>
            {icon && <div className={classes.icon}>{icon}</div>}
            {label}
          </label>
        )}
        {tooltipContent ? tooltipContent : null}
      </div>
      <div className={classes.inputWrapper}>
        {leftElement}
        {input(className)}
        {rightElement}
      </div>
    </div>
  );
};

export default InputLayout;
