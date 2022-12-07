import React from 'react';

interface ICreateOrderLayoutProps {
  buyerInfo: React.ReactNode;
  note: React.ReactNode;
  orderItemCreator: React.ReactNode;
  orderItems: React.ReactNode;
  history: React.ReactNode;
  paymentBar: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-8',
  buyerInfoAndNoteLayout: 'flex space-x-5',
};

const CreateOrderLayout = ({
  buyerInfo,
  note,
  orderItemCreator,
  orderItems,
  history,
  paymentBar,
  actions,
}: ICreateOrderLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.buyerInfoAndNoteLayout}>
        <div className="flex-1">{buyerInfo}</div>
        <div className="flex-1">{note}</div>
      </div>
      {orderItemCreator}
      {orderItems}
      {history}
      {paymentBar}
      {actions}
    </div>
  );
};

export default CreateOrderLayout;
