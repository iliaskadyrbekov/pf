import React from 'react';

interface IInputLeftIconLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
  text: 'text-gray-500 sm:text-sm',
};

const InputLeftIconLayout = ({ children }: IInputLeftIconLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <span className={classes.text}>{children}</span>
    </div>
  );
};

export default InputLeftIconLayout;
