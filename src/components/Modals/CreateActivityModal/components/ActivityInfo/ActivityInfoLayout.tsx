import React from 'react';

export interface IActivityLayoutProps {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col max-w-[578px]',
  infoWrapper: 'flex bg-indigo-600 py-5 pl-4 pr-8 space-x-3',
  descriptionWrapper: 'flex flex-col',
  iconWrapper: 'w-5 h-5 text-white mt-[6px]',
  name: 'text-lg font-medium leading-normal text-white',
  description: 'text-sm leading-normal text-white',
};

const ActivityLayout = ({ icon, name, description }: IActivityLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.infoWrapper}>
        <div className={classes.iconWrapper}>{icon}</div>
        <div className={classes.descriptionWrapper}>
          <p className={classes.name}>{name}</p>
          <p className={classes.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityLayout;
