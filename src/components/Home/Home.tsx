import React from 'react';

import { ShopContext } from 'src/context/ShopContext';
import { useStatisticsQuery } from 'src/graphql/queries/statistics';
import { Card, Task } from './components';
import { RecommendedAccordion } from './components/RecommendedAccordion';
import { RECOMMENDED, TASKS } from './constants';
import { getRevenueCurrency, getRevenueVal, getStatisticsTimeGaps, getStatVal } from './helpers';
import HomeLayout from './HomeLayout';

const Home = () => {
  const { shop } = React.useContext(ShopContext);

  const { todayTimeGap, yesterdayTimeGap, monthTimeGap, prevMonthTimeGap } = getStatisticsTimeGaps();

  const { data } = useStatisticsQuery({
    shopId: shop?.id,
    bookingsTimeGap: [todayTimeGap, yesterdayTimeGap],
    salesTimeGap: [todayTimeGap, yesterdayTimeGap],
    revenueTimeGap: [monthTimeGap, prevMonthTimeGap],
  });

  const renderCards = () => {
    if (!data) {
      return null;
    }

    const { sales, bookings, revenue } = data.statistics;

    const salesTodayCount = getStatVal(sales, 'today', 0);
    const salesYesterdayCount = getStatVal(sales, 'yesterday', 0);
    const bookingsTodayCount = getStatVal(bookings, 'today', 0);
    const bookingsYesterdayCount = getStatVal(bookings, 'yesterday', 0);

    const revenueMonthCount = getRevenueVal(revenue, 'month', 0);
    const revenuePrevMonthCount = getRevenueVal(revenue, 'prevMonth', 0);
    const revenueCurrency = getRevenueCurrency(revenue, 'month');

    return [
      <Card
        key={0}
        date="Today"
        title="Sales"
        count={salesTodayCount}
        secondDate="yesterday"
        prevCount={salesYesterdayCount}
      />,
      <Card
        key={1}
        date="Today"
        title="Bookings"
        count={bookingsTodayCount}
        secondDate="yesterday"
        prevCount={bookingsYesterdayCount}
      />,
      <Card
        key={2}
        date="This month so far"
        title="Revenue"
        count={`${revenueCurrency} ${revenueMonthCount}`}
        secondDate="last month"
        prevCount={revenuePrevMonthCount}
      />,
    ];
  };

  return (
    <HomeLayout
      cards={renderCards()}
      tasks={TASKS.map(({ icon, iconText, title, description, button }, index) => (
        <Task key={index} icon={icon} iconText={iconText} title={title} description={description} button={button} />
      ))}
      recommended={<RecommendedAccordion items={RECOMMENDED} />}
    />
  );
};

export default Home;
