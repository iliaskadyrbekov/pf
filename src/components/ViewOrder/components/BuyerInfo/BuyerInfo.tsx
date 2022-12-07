import React from 'react';
import { useRouter } from 'next/router';

import { BlockLayout } from '@components/common/Block';
import BuyerInfoLayout from './BuyerInfoLayout';
import { useOrderQuery } from 'src/graphql/queries/order';

const BuyerInfo = () => {
  const router = useRouter();

  const orderId = router.query.orderId as string;
  const { data } = useOrderQuery({ id: orderId });

  const buyer = data?.order?.buyer;

  return (
    <BlockLayout>
      <BuyerInfoLayout
        title="Buyer information"
        avatar={undefined}
        fullName={buyer?.fullName}
        email={buyer?.email}
        phone={buyer?.phone}
        postalAddress={buyer?.address}
        companyName={buyer?.companyName}
      />
    </BlockLayout>
  );
};

export default BuyerInfo;
