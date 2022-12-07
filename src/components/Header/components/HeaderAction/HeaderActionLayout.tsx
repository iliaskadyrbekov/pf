import React from 'react';

const classes = {
  wrapper: 'group flex items-center justify-center space-x-3 cursor-pointer',
  text: 'text-sm font-medium leading-tight text-gray-900 group-hover:text-indigo-600',
  iconWrapper: 'w-6 h-6 text-gray-400 group-hover:text-indigo-600',
};

interface IHeaderActionLayoutProps {
  icon: React.ReactNode;
  text?: React.ReactNode;
}

const HeaderActionLayout = ({ icon, text }: IHeaderActionLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.iconWrapper}>{icon}</div>
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
};

export default HeaderActionLayout;
