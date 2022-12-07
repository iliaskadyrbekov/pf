import React from 'react';

interface IComingSoonLayoutProps {
  title: React.ReactNode;
  icon: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col items-center justify-center w-full h-full bg-gray-50',
  title: 'text-2xl font-bold leading-7 text-center text-gray-300',
};

const ComingSoonLayout = ({ title, icon }: IComingSoonLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {icon}
      <p className={classes.title}>{title}</p>
    </div>
  );
};

export default ComingSoonLayout;
