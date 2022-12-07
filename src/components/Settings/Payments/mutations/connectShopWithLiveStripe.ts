import { gql, useMutation } from '@apollo/client';

export interface IConnectShopWithLiveStripeVars {
  shopId?: string;
  returnUrl: string;
  refreshUrl: string;
}

export interface IConnectShopWithLiveStripeRes {
  connectShopWithLiveStripe: string;
}

export const CONNECT_SHOP_WITH_LIVE_STRIPE = gql`
  mutation ConnectShopWithLiveStripe($returnUrl: String!, $refreshUrl: String!, $shopId: String!) {
    connectShopWithLiveStripe(shopId: $shopId, returnUrl: $returnUrl, refreshUrl: $refreshUrl)
  }
`;

export const useConnectShopWithLiveStripe = () => {
  const [mutate, { data, loading, error }] = useMutation<IConnectShopWithLiveStripeRes, IConnectShopWithLiveStripeVars>(
    CONNECT_SHOP_WITH_LIVE_STRIPE,
  );

  return { mutate, data, loading, error };
};
