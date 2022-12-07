import React from 'react';

interface IBookingsSubMenuLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'w-full flex-col pt-6',
};

const BookingsSubMenuLayout: React.FC<IBookingsSubMenuLayoutProps> = ({ children }: IBookingsSubMenuLayoutProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default BookingsSubMenuLayout;
