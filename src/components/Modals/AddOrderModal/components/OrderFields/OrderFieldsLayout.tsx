import React from 'react';

interface IOrderFieldsLayoutProps {
  renderedFields: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-4 sm:space-y-5 pt-4 sm:px-4',
};

const OrderFieldsLayout = ({ renderedFields }: IOrderFieldsLayoutProps) => {
  return <div className={classes.wrapper}>{renderedFields}</div>;
};

export default OrderFieldsLayout;
