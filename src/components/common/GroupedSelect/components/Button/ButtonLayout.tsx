import React from 'react';

interface IButtonLayoutProps {
  children: React.ReactNode;
  onClick(): void;
}

const classes = {
  wrapper: 'inline-block w-full rounded-md shadow-sm',
  button:
    'cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-20 py-2 text-left focus:outline-none focus:ring-1 ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:leading-5',
};

const ButtonLayout = ({ children, onClick }: IButtonLayoutProps) => {
  return (
    <span className={classes.wrapper}>
      <button onClick={onClick} type="button" aria-expanded="true" className={classes.button}>
        {children}
      </button>
    </span>
  );
};

export default ButtonLayout;
