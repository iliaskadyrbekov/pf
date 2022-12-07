import React from 'react';

interface IAccommodationBookingsLayoutProps {
  timeline: React.ReactNode;
  loader: React.ReactNode;
}

const classes = {
  wrapper: 'p-8 w-full h-full relative',
  loader: 'absolute top-1/2 left-1/2 z-10',
};

const AccommodationBookingsLayout = ({ timeline, loader }: IAccommodationBookingsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}>{loader}</div>
      {timeline}
    </div>
  );
};

export default AccommodationBookingsLayout;
