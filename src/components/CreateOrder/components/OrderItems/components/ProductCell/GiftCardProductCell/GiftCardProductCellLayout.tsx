import React from 'react';

interface IGiftCardProductCellLayoutProps {
  name: React.ReactNode;
  variation: React.ReactNode;
  buyer: React.ReactNode;
  activityTypeIcon: React.ReactNode;
  activity: React.ReactNode;
  dateIcon: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col items-start space-y-2',
  header: 'flex items-center space-x-4',
  name: 'text-base leading-tight text-gray-800',
  variation: 'text-sm leading-tight text-gray-500',
  info: 'flex items-center space-x-3',
  buyer: 'text-sm leading-tight text-gray-800',
  iconWrapper: 'flex space-x-1',
  activityTypeIcon: 'w-[18px] h-[18px] text-gray-400',
  activity: 'text-sm leading-tight text-gray-800',
  dateIcon: 'w-4 h-4 text-gray-400',
  date: 'text-sm font-medium leading-tight text-gray-800',
  time: 'text-sm leading-tight text-gray-800',
};

const GiftCardProductCellLayout = ({
  name,
  variation,
  buyer,
  activityTypeIcon,
  activity,
}: IGiftCardProductCellLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <p className={classes.name}>{name}</p>
        <p className={classes.variation}>{variation}</p>
      </div>
      {buyer && <p className={classes.buyer}>{buyer}</p>}
      <div className={classes.info}>
        <div className={classes.iconWrapper}>
          <p className={classes.activityTypeIcon}>{activityTypeIcon}</p>
          <p className={classes.activity}>{activity}</p>
        </div>
      </div>
    </div>
  );
};

export default GiftCardProductCellLayout;
