import React from 'react';

interface IOptionsLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'absolute mt-1 w-full rounded-md bg-white shadow-lg z-10',
  ul: 'max-h-60 rounded-md py-1 text-base leading-6 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm sm:leading-5',
};

const OptionsLayout = ({ children }: IOptionsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <ul tabIndex={-1} role="listbox" className={classes.ul}>
        {/* <!--
  Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

  Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
--> */}
        {children}
      </ul>
    </div>
  );
};

export default OptionsLayout;
