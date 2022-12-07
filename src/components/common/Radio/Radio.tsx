import React from 'react';

interface IRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  isError?: boolean;
}

const classes = {
  wrapper: 'flex items-start',
  checkboxWrapper: 'h-5 flex items-center',
  checkbox: (isError?: boolean) =>
    `focus:ring-indigo-500 h-4 w-4 text-indigo-600 ${isError ? 'border-red-500' : 'border-gray-300'}`,
  labelWrapper: 'ml-3 text-sm',
  label: 'font-medium text-gray-700',
};

const Radio = ({ id, name, label, isError, className, value, ...rest }: IRadioProps) => {
  const classname = `${classes.checkbox(isError)}${className ? ` ${className}` : ''}`;

  return (
    <div className={classes.wrapper}>
      <div className={classes.checkboxWrapper}>
        <input id={id} name={name} value={id} checked={id === value} type="radio" className={classname} {...rest} />
      </div>
      <div className={classes.labelWrapper}>
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default Radio;
