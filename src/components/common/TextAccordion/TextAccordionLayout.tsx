import React from 'react';

interface ITextAccordionLayoutProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  children?: React.ReactNode;
  onClick(): void;
}

const classes = {
  wrapper: 'flex items-center cursor-pointer',
};

const TextAccordionLayout = ({ title, icon, onClick, children }: ITextAccordionLayoutProps) => {
  return (
    <>
      <div className={classes.wrapper}>
        {icon}

        <span className="text-sm font-medium text-indigo-600 cursor-pointer" onClick={onClick}>
          {title}
        </span>
      </div>
      {children}
    </>
  );
};

export default TextAccordionLayout;
