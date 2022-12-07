import React from 'react';

interface ITicketBookingsInfoModalLayoutProps {
  mainInfo: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: '',
  actionsWrapper: 'px-6 pb-6 w-full flex justify-end flex-row space-x-4',
};

const TicketBookingsInfoModalLayout = ({ mainInfo, actions }: ITicketBookingsInfoModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {mainInfo}
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default TicketBookingsInfoModalLayout;
