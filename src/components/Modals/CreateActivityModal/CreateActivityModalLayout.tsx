import React from 'react';
interface ICreateActivityModalLayoutProps {
  activityInfo: React.ReactNode;
  activities: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'flex max-w-[850px]',
  infoWrapper: 'flex flex-col shadow-2xl justify-between',
};

const CreateActivityModalLayout = ({ activityInfo, activities, actions }: ICreateActivityModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {activities}
      <div className={classes.infoWrapper}>
        {activityInfo}
        {actions}
      </div>
    </div>
  );
};

export default CreateActivityModalLayout;
