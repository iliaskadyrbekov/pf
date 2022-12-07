import { gql, useMutation } from '@apollo/client';

import { IAccommodationPricing, MultiLanguageField } from 'src/shared/interfaces';

export interface ICreateAccommodationProductRes {
  createAccommodationProduct: {
    id: string;
  };
}

export interface ICreateAccommodationProductVars {
  input: {
    activityId: string;
    name: MultiLanguageField[];
    pricing: IAccommodationPricing;
  };
  shopId?: string;
}

export const CREATE_ACCOMMODATION_PRODUCT = gql`
  mutation CreateAccommodationProduct($input: CreateAccommodationProductInput!, $shopId: ObjectId!) {
    createAccommodationProduct(input: $input, shopId: $shopId) {
      id
      type
      name {
        value
        lang
        country
      }
    }
  }
`;

export const useCreateAccommodationProduct = () => {
  const [mutate, { data, loading, error }] = useMutation<
    ICreateAccommodationProductRes,
    ICreateAccommodationProductVars
  >(CREATE_ACCOMMODATION_PRODUCT);

  return { mutate, data, loading, error };
};
