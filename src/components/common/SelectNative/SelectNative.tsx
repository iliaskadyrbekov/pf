import React from 'react';

interface IOption {
  value: string | number | undefined;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}

export interface ISelectNativeProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: IOption[];
  label?: string;
  isError?: boolean;
}

const classes = {
  wrapper: 'w-full',
  label: 'mb-1 block text-sm font-medium text-gray-700',
  select: (isError?: boolean, isDisabled?: boolean) =>
    `border block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
      isError ? 'border-red-500' : 'border-gray-300'
    } ${isDisabled ? 'bg-gray-300' : ''}`,
};

const SelectNative = ({ name, label, options, isError, className, ...rest }: ISelectNativeProps) => {
  const classname = `${classes.select(isError, rest.disabled)}${className ? ` ${className}` : ''}`;

  return (
    <div className={classes.wrapper}>
      {label && (
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
      )}
      <select id={name} name={name} className={classname} {...rest}>
        {options.map(({ value, label, disabled, selected }) => (
          <option selected={selected} disabled={disabled} key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectNative;
