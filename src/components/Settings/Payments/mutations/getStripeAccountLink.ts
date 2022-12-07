import { gql } from '@apollo/client';

export interface IGetStripeAccountLinkVars {
  shopId?: string;
  returnUrl: string;
  refreshUrl: string;
}

export interface IGetStripeAccountLink {
  getStripeAccountLink: string;
}

export const GET_STRIPE_ACCOUNT_LINK = gql`
  mutation GetStripeAccountLink($returnUrl: String!, $refreshUrl: String!, $shopId: String!) {
    getStripeAccountLink(shopId: $shopId, returnUrl: $returnUrl, refreshUrl: $refreshUrl)
  }
`;
