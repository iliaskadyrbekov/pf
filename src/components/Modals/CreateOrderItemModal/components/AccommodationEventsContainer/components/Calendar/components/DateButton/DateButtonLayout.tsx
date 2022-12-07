import React from 'react';

interface IDateButtonLayoutProps {
  checkInLabel: string;
  checkOutLabel: string;
  value?: string;
  onClick?: () => void;
}

const classes = {
  labelsWrapper: 'text-left space-x-[3.25rem]',
  label: 'text-xs leading-normal text-gray-400',
  date: 'text-sm sm:text-base leading-normal text-indigo-600 text-left',
};

const DateButtonLayout = (
  { value, onClick, checkInLabel, checkOutLabel }: IDateButtonLayoutProps,
  ref: React.Ref<HTMLButtonElement>,
) => (
  <button ref={ref} onClick={onClick}>
    <div className={classes.labelsWrapper}>
      <span className={classes.label}>{checkInLabel}</span>
      <span className={classes.label}>{checkOutLabel}</span>
    </div>
    <p className={classes.date}>{value}</p>
  </button>
);

export default React.forwardRef(DateButtonLayout);
