import React from 'react';

interface IViewOrderLayoutProps {
  buyerInfo: React.ReactNode;
  note: React.ReactNode;
  orderItems: React.ReactNode;
  history: React.ReactNode;
  paymentBar: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-5',
  buyerInfoAndNoteLayout: 'flex space-x-5',
};

const ViewOrderLayout = ({ buyerInfo, note, orderItems, history, paymentBar, actions }: IViewOrderLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.buyerInfoAndNoteLayout}>
        <div className="flex-1">{buyerInfo}</div>
        <div className="flex-1">{note}</div>
      </div>
      {orderItems}
      {history}
      {paymentBar}
      {actions}
    </div>
  );
};

export default ViewOrderLayout;
