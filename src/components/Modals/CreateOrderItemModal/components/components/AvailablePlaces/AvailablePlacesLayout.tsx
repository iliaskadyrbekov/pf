import React from 'react';

interface IAvailablePlacesLayoutProps {
  label: React.ReactNode;
  icon: React.ReactNode;
  color: string;
  total?: number;
  left?: number | string;
}

const classes = {
  wrapper: 'flex items-center pb-[1.125rem] sm:pb-0 lg:pb-[1.125rem] xl:pb-0 sm:pl-3.5 lg:pl-0',
  iconWrapper: 'text-indigo-600 w-5 h-5',
  label: 'pr-2 sm:pr-0 lg:pr-2 xl:pr-0 text-sm sm:text-xs leading-none text-gray-400',
  textWrapper: 'sm:flex lg:block xl:flex flex-col pl-2.5',
  count: (placesTextColor: string) =>
    `${placesTextColor} font-bold sm:font-normal text-sm sm:text-base leading-none uppercase`,
  total: 'font-bold sm:font-normal text-sm sm:text-base leading-none uppercase',
};

const AvailablePlacesLayout = ({ label, icon, color, total, left }: IAvailablePlacesLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.iconWrapper}>{icon}</div>
      <div className={classes.textWrapper}>
        <span className={classes.label}>{label}</span>
        <div>
          <span className={classes.count(color)}>{left}</span>
          {!!total && <span className={classes.total}>/{total}</span>}
        </div>
      </div>
    </div>
  );
};

export default AvailablePlacesLayout;
