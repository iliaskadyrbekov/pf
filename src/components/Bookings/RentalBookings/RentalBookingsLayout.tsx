import React from 'react';

interface IRentalBookingsLayoutProps {
  timeline: React.ReactNode;
  loader: React.ReactNode;
}

const classes = {
  wrapper: 'p-8 w-full h-full relative',
  loader: 'absolute top-1/2 left-1/2 z-10',
};

const RentalBookingsLayout = ({ timeline, loader }: IRentalBookingsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}>{loader}</div>
      {timeline}
    </div>
  );
};

export default RentalBookingsLayout;
