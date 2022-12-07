import { gql, useQuery } from '@apollo/client';
import { ICustomer } from 'src/shared/interfaces/Customer';

export interface ICustomersVars {
  shopId?: string;
}

export interface ICustomersRes {
  customers: ICustomer[];
}

export const CUSTOMERS = gql`
  query Customers($shopId: ObjectId!) {
    customers(shopId: $shopId) {
      name
      phone
      email
      country
      lastPurchase
    }
  }
`;

export const useCustomersQuery = (vars: ICustomersVars) => {
  return useQuery<ICustomersRes, ICustomersVars>(CUSTOMERS, { variables: vars });
};
