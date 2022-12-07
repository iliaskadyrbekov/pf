import { ICurrency } from './Currency';

export interface IStatistics {
  bookings: IStatisticsReportResult[];
  sales: IStatisticsReportResult[];
  revenue: IRevenueReport[];
}

export interface IStatisticsReportResult {
  name: string;
  value: number;
}

export interface IRevenueReportValue {
  currency: ICurrency;
  value: number;
}

export interface IRevenueReport {
  name: string;
  value: IRevenueReportValue[];
}
