import { gql, useMutation } from '@apollo/client';
import { MultiLanguageField } from 'src/shared/interfaces';
import { IDuration } from 'src/shared/interfaces/Duration';

export interface ICreateRentalProductRes {
  createRentalProduct: {
    id: string;
  };
}

export interface ICreateRentalProductVars {
  shopId?: string;
  input: {
    activityId: string;
    name: MultiLanguageField[];
    pricing: {
      duration: IDuration;
      name: [MultiLanguageField];
      order: number;
      price: number;
    }[];
  };
}

export const CREATE_RENTAL_PRODUCT = gql`
  mutation CreateRentalProduct($shopId: ObjectId!, $input: CreateRentalProductInput!) {
    createRentalProduct(shopId: $shopId, input: $input) {
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

export const useCreateRentalProduct = () => {
  const [mutate, { data, error, loading }] = useMutation<ICreateRentalProductRes, ICreateRentalProductVars>(
    CREATE_RENTAL_PRODUCT,
  );

  return { mutate, data, error, loading };
};
