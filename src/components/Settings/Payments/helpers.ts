import { IPayment, EPaymentProviders, IStripe } from 'src/shared/interfaces/Shop';

export enum EPaymentStatus {
  INCOMPLETE = 'Incomplete',
  COMPLETED = 'Completed',
}

export enum EChargesEnabled {
  ENABLED = 'Enabled',
  DISABLED = 'Disabled',
}

export const parseShopPayment = (payment?: IPayment) => {
  if (!payment) {
    return [];
  }

  return Object.entries(payment).map(([paymentProvider, value]) => {
    switch (paymentProvider) {
      case EPaymentProviders.STRIPE:
        const stripeValue = value as IStripe;

        return {
          accountId: stripeValue.id,
          name: stripeValue.settings.dashboard.displayName || undefined,
          provider: EPaymentProviders.STRIPE,
          mode: stripeValue.mode,
          chargesEnabled: stripeValue.chargesEnabled ? EChargesEnabled.ENABLED : EChargesEnabled.DISABLED,
          status: stripeValue.detailsSubmitted ? EPaymentStatus.COMPLETED : EPaymentStatus.INCOMPLETE,
        };

      default:
        return {};
    }
  });
};
