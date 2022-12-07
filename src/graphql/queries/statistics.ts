import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { IStatistics } from 'src/shared/interfaces/Statistics';

export interface IStatisticsRes {
  statistics: IStatistics;
}

export interface IStatisticsVars {
  shopId?: string;
  bookingsTimeGap: { name: string; from: Date; to: Date }[];
  salesTimeGap: { name: string; from: Date; to: Date }[];
  revenueTimeGap: { name: string; from: Date; to: Date }[];
}

export const STATISTICS = gql`
  query Statistics(
    $shopId: ObjectId!
    $bookingsTimeGap: [TimeGapInput!]!
    $salesTimeGap: [TimeGapInput!]!
    $revenueTimeGap: [TimeGapInput!]!
  ) {
    statistics(shopId: $shopId) {
      bookings(timeGap: $bookingsTimeGap) {
        name
        value
      }

      sales(timeGap: $salesTimeGap) {
        name
        value
      }

      revenue(timeGap: $revenueTimeGap) {
        name
        value {
          value
          currency {
            symbol
          }
        }
      }
    }
  }
`;

export const useStatisticsQuery = (vars: IStatisticsVars) => {
  return useQuery<IStatisticsRes, IStatisticsVars>(STATISTICS, { variables: vars });
};
