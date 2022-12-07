import { PaymentType } from '../enums';
import { MultiLanguageField } from './MultiLanguageField';

export interface IVATReport {
  giftCardCollectedInfo: IVATReportGiftCardInfo[];
  giftCardRedeemedInfo: IVATReportGiftCardInfo[];
  depositInfo: IVATReportDepositInfo[];
  orderedProducts: IVATReportOrderedProduct[];
  paymentInfoByPaymentMethod: IVATReportPaymentInfoByPymentMethod[];
}

export interface IVATReportGiftCardInfo {
  currency: string;
  value: number;
}

export interface IVATReportDepositInfo {
  currency: string;
  value: number;
}

export interface IVATReportPaymentInfoByPymentMethod {
  type: PaymentType;
  currency: string;
  times: number;
  collected: number;
  processingFees: number;
  applicationFees: number;
}

export interface IVATReportOrderedProduct {
  id: string;
  VATRate: number;
  currency: string;
  activityName: MultiLanguageField[];
  activityId: string;
  name: MultiLanguageField[];
  units: number;
  amount: number;
  VATFee: number;
  incomeAfterVAT: number;
}
