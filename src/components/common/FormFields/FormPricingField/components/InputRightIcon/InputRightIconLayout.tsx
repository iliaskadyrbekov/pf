import React from 'react';

interface IInputRightIconLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none',
  text: 'text-gray-500 sm:text-sm',
};

const InputRightIconLayout = ({ children }: IInputRightIconLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <span className={classes.text}>{children}</span>
    </div>
  );
};

export default InputRightIconLayout;
