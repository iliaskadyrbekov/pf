import React from 'react';

interface IVATReportLayoutProps {
  filters: React.ReactNode;
  widgets: React.ReactNode;
  orderedItemsTable: React.ReactNode;
  paymentMethodTable: React.ReactNode;
  depositTable: React.ReactNode;
  giftCardInfoTable: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-5',
  widgetsWrapper: 'flex',
};

const VATReportLayout = ({
  filters,
  widgets,
  orderedItemsTable,
  paymentMethodTable,
  depositTable,
  giftCardInfoTable,
}: IVATReportLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {filters}
      {widgets}
      {orderedItemsTable}
      {giftCardInfoTable}
      {depositTable}
      {paymentMethodTable}
    </div>
  );
};

export default VATReportLayout;
