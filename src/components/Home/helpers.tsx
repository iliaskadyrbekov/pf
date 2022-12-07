import moment from 'moment-timezone';
import { ICurrency } from 'src/shared/interfaces/Currency';

export const getStatisticsTimeGaps = () => {
  const startOfToday = moment().startOf('day').toDate();
  const endOfToday = moment().endOf('day').toDate();
  const startOfYesterday = moment().subtract(1, 'day').startOf('day').toDate();
  const endOfYesterday = moment().subtract(1, 'day').endOf('day').toDate();

  const startOfMonth = moment().startOf('month').toDate();
  const endOfMonth = moment().endOf('month').toDate();
  const startOfPrevMonth = moment().subtract(1, 'month').startOf('month').toDate();
  const endOfPrevMonth = moment().subtract(1, 'month').endOf('month').toDate();

  const todayTimeGap = { name: 'today', from: startOfToday, to: endOfToday };
  const yesterdayTimeGap = { name: 'yesterday', from: startOfYesterday, to: endOfYesterday };
  const monthTimeGap = { name: 'month', from: startOfMonth, to: endOfMonth };
  const prevMonthTimeGap = { name: 'prevMonth', from: startOfPrevMonth, to: endOfPrevMonth };

  return {
    todayTimeGap,
    yesterdayTimeGap,
    monthTimeGap,
    prevMonthTimeGap,
  };
};

export const getStatVal = (items: { name: string; value: number }[] = [], period: string, defaultVal: number) =>
  items.find(({ name }) => name === period)?.value || defaultVal;

export const getRevenueVal = (
  items: { name: string; value: { value: number; currency: ICurrency }[] }[] = [],
  period: string,
  defaultVal: number,
) => items.find(({ name }) => name === period)?.value[0]?.value || defaultVal;

export const getRevenueCurrency = (
  items: { name: string; value: { value: number; currency: ICurrency }[] }[] = [],
  period: string,
) => items.find(({ name }) => name === period)?.value[0]?.currency.symbol || '';
