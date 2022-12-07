import React from 'react';
import moment from 'moment-timezone';

import VATReportLayout from './VATReportLayout';
import { DepositInfoTable, Filters, GiftCardInfoTable, PaymentMethodTable, VATTable, Widgets } from './components';
import { useVATReportQuery } from 'src/graphql/queries/vatReport';
import { ShopContext } from 'src/context/ShopContext';
import { getActivitiesOptions } from './helpers';
import { useActivitiesWithArchivedQuery } from 'src/graphql/queries/activitiesWithArchived';

interface IFilters {
  activity?: string;
  date: {
    from: Date;
    to: Date;
  };
}

const VATReport = () => {
  const { shop } = React.useContext(ShopContext);

  const [filters, setFilters] = React.useState<IFilters>({
    date: {
      from: moment().startOf('month').toDate(),
      to: moment().endOf('month').toDate(),
    },
  });

  const handleFiltersChange = (newFilters: Partial<IFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const { data: activitiesData } = useActivitiesWithArchivedQuery({ shopId: shop?.id });
  const activities = activitiesData?.activitiesWithArchived || [];

  const { data: VATReportData } = useVATReportQuery({ shopId: shop?.id, filters }, { fetchPolicy: 'network-only' });
  const orderedItems = VATReportData?.VATReport[0]?.orderedProducts || [];
  const paymentInfoByPaymentMethod = VATReportData?.VATReport[0]?.paymentInfoByPaymentMethod || [];
  const giftCardCollectedInfo = VATReportData?.VATReport[0]?.giftCardCollectedInfo || [];
  const giftCardRedeemedInfo = VATReportData?.VATReport[0]?.giftCardRedeemedInfo || [];
  const depositInfo = VATReportData?.VATReport[0]?.depositInfo || [];

  const activitiesOpts = getActivitiesOptions(activities);

  return (
    <VATReportLayout
      filters={<Filters activitiesOptions={activitiesOpts} filters={filters} onChange={handleFiltersChange} />}
      widgets={
        <Widgets
          items={orderedItems}
          amount={paymentInfoByPaymentMethod?.[0]?.collected}
          applicationFees={paymentInfoByPaymentMethod?.[0]?.applicationFees}
          processingFees={paymentInfoByPaymentMethod?.[0]?.processingFees}
        />
      }
      orderedItemsTable={<VATTable items={orderedItems} />}
      giftCardInfoTable={
        <GiftCardInfoTable giftCardCollectedInfo={giftCardCollectedInfo} giftCardRedeemedInfo={giftCardRedeemedInfo} />
      }
      depositTable={<DepositInfoTable depositInfo={depositInfo} />}
      paymentMethodTable={<PaymentMethodTable items={paymentInfoByPaymentMethod} />}
    />
  );
};

export default VATReport;
