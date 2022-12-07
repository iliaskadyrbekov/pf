import { gql, useMutation } from '@apollo/client';

import {
  IMultipleMedia,
  IAccommodationPricing,
  IAccommodationSpecification,
  ICheckoutFormRequest,
  MultiLanguageField,
} from 'src/shared/interfaces';

interface IEditAccommodationProductRes {
  editAccommodationProduct: {
    visibility: {
      id: string;
    };
  };
}

interface IEditAccommodationProductVars {
  input: {
    id: string;
    shopId?: string;
    checkoutForm?: ICheckoutFormRequest;
    checkoutEnabled?: boolean;
    media?: IMultipleMedia[];
    name?: MultiLanguageField[];
    pricing?: IAccommodationPricing;
    shortDescription?: MultiLanguageField[];
    visibility?: string;
    specificationsEnabled?: boolean;
    specifications?: IAccommodationSpecification[];
    VAT?: string;
  };
  shopId?: string;
}

export const EDIT_ACCOMMODATION_PRODUCT = gql`
  mutation EditAccommodationProduct($input: EditAccommodationProductInput!, $shopId: ObjectId!) {
    editAccommodationProduct(input: $input, shopId: $shopId) {
      visibility {
        id
      }
    }
  }
`;

export const useEditAccommodationProduct = () => {
  const [mutate, { data, error, loading }] = useMutation<IEditAccommodationProductRes, IEditAccommodationProductVars>(
    EDIT_ACCOMMODATION_PRODUCT,
  );

  return { mutate, data, error, loading };
};
