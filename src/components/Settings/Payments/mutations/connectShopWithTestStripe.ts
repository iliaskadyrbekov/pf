import { gql, useMutation } from '@apollo/client';

export interface IConnectShopWithTestStripeVars {
  shopId?: string;
  returnUrl: string;
  refreshUrl: string;
}

export interface IConnectShopWithTestStripeRes {
  connectShopWithTestStripe: string;
}

export const CONNECT_SHOP_WITH_TEST_STRIPE = gql`
  mutation ConnectShopWithTestStripe($returnUrl: String!, $refreshUrl: String!, $shopId: String!) {
    connectShopWithTestStripe(shopId: $shopId, returnUrl: $returnUrl, refreshUrl: $refreshUrl)
  }
`;

export const useConnectShopWithTestStripe = () => {
  const [mutate, { data, loading, error }] = useMutation<IConnectShopWithTestStripeRes, IConnectShopWithTestStripeVars>(
    CONNECT_SHOP_WITH_TEST_STRIPE,
  );

  return { mutate, data, loading, error };
};
