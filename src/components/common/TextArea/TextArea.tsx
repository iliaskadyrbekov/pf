import React from 'react';

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
  isError?: boolean;
}

const classes = {
  wrapper: 'w-full h-full',
  label: 'flex items-center text-sm font-medium text-gray-700 mb-1',
  icon: 'mr-2',
  input: (isError?: boolean) =>
    `px-3 py-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md ${
      isError ? 'border-red-500' : 'border-gray-300'
    }`,
};

const TextArea = ({ name, label, icon, isError, className, ...rest }: ITextAreaProps) => {
  const classname = `${classes.input(isError)}${className ? ` ${className}` : ''}`;

  return (
    <div className={classes.wrapper}>
      {label && (
        <label htmlFor={name} className={classes.label}>
          {icon && <div className={classes.icon}>{icon}</div>}
          {label}
        </label>
      )}
      <textarea name={name} id={name} className={classname} {...rest} />
    </div>
  );
};

export default TextArea;
