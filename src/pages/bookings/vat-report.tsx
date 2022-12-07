import React from 'react';
import { GetServerSideProps } from 'next';
import moment from 'moment-timezone';

import { MENU_ITEMS } from '@components/Menu/';
import { AppWithHorizontalSubMenuLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { IHandlerProps, THandler, withUserCheck } from 'src/lib/withUserCheck';
import { BookingsSubMenu } from '@components/Menu/BookingsSubMenu';
import { VATReport } from '@components/Bookings';
import { IVATReportRes, IVATReportVars, VAT_REPORT } from 'src/graphql/queries/vatReport';
import {
  ACTIVITIES_WITH_ARCHIVED,
  IActivitiesWithArchivedRes,
  IActivitiesWithArchivedVars,
} from 'src/graphql/queries/activitiesWithArchived';
import { TWithApolloClientHandlerProps, withApolloClient } from 'src/lib/withApolloClient';

const withErrorCatch = (handler: THandler) => async (props: IHandlerProps) => {
  const { user, shop } = props;

  try {
    return handler(props);
  } catch (err) {
    return {
      redirect: { destination: `/`, permanent: false },
      props: { user, shop },
    };
  }
};

const resolveFn = async ({ user, shop, client }: TWithApolloClientHandlerProps) => {
  await client.query<IActivitiesWithArchivedRes, IActivitiesWithArchivedVars>({
    query: ACTIVITIES_WITH_ARCHIVED,
    variables: { shopId: shop?.id },
  });

  const now = moment.tz(shop?.timezone.id || '');

  await client.query<IVATReportRes, IVATReportVars>({
    query: VAT_REPORT,
    variables: {
      shopId: shop?.id,
      filters: { date: { from: now.startOf('month').toDate(), to: now.endOf('month').toDate() } },
    },
  });
  return { props: { user, shop, initialApolloState: client.cache.extract() } };
};

export const getServerSideProps: GetServerSideProps = withUserCheck(withErrorCatch(withApolloClient(resolveFn)));

const VATReportPage = () => {
  return <PageContentLayout header={<PageHeaderLayout title="VAT Report" />} content={<VATReport />} />;
};

const VATReportPageLayout = (page: React.ReactNode) => (
  <AppWithHorizontalSubMenuLayout menuItem={MENU_ITEMS['BOOKINGS']} SubMenu={<BookingsSubMenu />}>
    {page}
  </AppWithHorizontalSubMenuLayout>
);
VATReportPage.getLayout = VATReportPageLayout;

export default VATReportPage;
