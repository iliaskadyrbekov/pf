import React from 'react';

interface ITaskLayoutProps {
  icon: React.ReactNode;
  iconText: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  button: React.ReactNode;
}

const classes = {
  wrapper: 'flex w-full p-6 bg-white shadow rounded-md space-y-1 justify-between items-center',
  contenWrapper: 'flex space-x-5 items-center',
  iconTextWrapper: 'flex flex-col items-center w-14',
  iconWrapper: 'text-indigo-600',
  infoWrapper: 'flex flex-col space-y-2',
  iconText: 'text-xs font-bold leading-tight text-justify text-gray-400 mt-1',
  title: 'text-lg font-medium leading-normal text-gray-600',
  description: 'text-sm leading-tight text-gray-500 max-w-[406px]',
};

const TaskLayout = ({ icon, iconText, title, description, button }: ITaskLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.contenWrapper}>
        <div className={classes.iconTextWrapper}>
          <p className={classes.iconWrapper}>{icon}</p>
          <p className={classes.iconText}>{iconText}</p>
        </div>
        <div className={classes.infoWrapper}>
          <p className={classes.title}>{title}</p>
          <p className={classes.description}>{description}</p>
        </div>
      </div>
      {button}
    </div>
  );
};

export default TaskLayout;
