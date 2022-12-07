import React from 'react';
import { GetServerSideProps } from 'next';
import moment from 'moment-timezone';

import { withUserCheck } from 'src/lib/withUserCheck';
import { AppLayout } from 'src/layouts';
import { MENU_ITEMS } from '@components/Menu';
import { Home } from '@components/Home';
import { initializeApollo } from 'src/lib/apolloClient';
import { STATISTICS } from 'src/graphql/queries/statistics';
import { getStatisticsTimeGaps } from '@components/Home/helpers';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ user, shop, req }) => {
  const client = initializeApollo(null, req);

  moment.tz.setDefault(shop?.timezone.id);

  const { todayTimeGap, yesterdayTimeGap, monthTimeGap, prevMonthTimeGap } = getStatisticsTimeGaps();

  await client.query({
    query: STATISTICS,
    variables: {
      shopId: shop?.id,
      bookingsTimeGap: [todayTimeGap, yesterdayTimeGap],
      salesTimeGap: [todayTimeGap, yesterdayTimeGap],
      revenueTimeGap: [monthTimeGap, prevMonthTimeGap],
    },
  });

  return { props: { user, shop, initialApolloState: client.cache.extract() } };
});

const MainPage = () => {
  return <Home />;
};

const MainPageLayout = (page: React.ReactNode) => <AppLayout menuItem={MENU_ITEMS['HOME']}>{page}</AppLayout>;

MainPage.getLayout = MainPageLayout;

export default MainPage;
