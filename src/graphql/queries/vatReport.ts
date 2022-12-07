import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { IVATReport } from 'src/shared/interfaces/VATReport';

interface IVATReportDateFilterInput {
  from: Date;
  to: Date;
}

interface IVATReportFilterInput {
  date: IVATReportDateFilterInput;
  activity?: string;
}

export interface IVATReportVars {
  shopId?: string;
  filters: IVATReportFilterInput;
}

export interface IVATReportRes {
  VATReport: [IVATReport];
}

export const VAT_REPORT = gql`
  query VATReport($shopId: ObjectId!, $filters: VATReportFilterInput!) {
    VATReport(shopId: $shopId, filters: $filters) {
      orderedProducts {
        id
        VATRate
        currency
        activityId
        activityName {
          value
          lang
          country
        }
        name {
          value
          lang
          country
        }
        units
        amount
        VATFee
        incomeAfterVAT
      }
      paymentInfoByPaymentMethod {
        type
        times
        applicationFees
        processingFees
        currency
        collected
      }
      giftCardCollectedInfo {
        currency
        value
      }
      depositInfo {
        currency
        value
      }
      giftCardRedeemedInfo {
        currency
        value
      }
    }
  }
`;

export const useVATReportQuery = (
  vars: IVATReportVars,
  options: QueryHookOptions<IVATReportRes, IVATReportVars> = {},
) => {
  return useQuery<IVATReportRes, IVATReportVars>(VAT_REPORT, { variables: vars, ...options });
};
