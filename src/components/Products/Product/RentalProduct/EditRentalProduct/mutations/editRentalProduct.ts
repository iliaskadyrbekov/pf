import { gql, useMutation } from '@apollo/client';

import { ICheckoutFormRequest } from 'src/shared/interfaces/CheckoutForm';
import { IRentalPricingVariation, MultiLanguageField } from 'src/shared/interfaces';

export interface IEditRentalProductRes {
  editRentalProduct: {
    id: string;
  };
}

export interface IEditRentalProductVars {
  shopId?: string;
  input: {
    name: MultiLanguageField[];
    shortDescription: MultiLanguageField[];
    visibility?: string;
    media?: string;
    id: string;
    pricing: [IRentalPricingVariation];
    checkoutForm: ICheckoutFormRequest;
    category?: string;
    shopId?: string;
    VAT?: string;
  };
}

export const EDIT_RENTAL_PRODUCT = gql`
  mutation EditRentalProduct($input: EditRentalProductInput!, $shopId: ObjectId!) {
    editRentalProduct(input: $input, shopId: $shopId) {
      visibility {
        id
      }
    }
  }
`;

export const useEditRentalProduct = () => {
  const [mutate, { data, error, loading }] = useMutation<IEditRentalProductRes, IEditRentalProductVars>(
    EDIT_RENTAL_PRODUCT,
  );

  return { mutate, data, error, loading };
};
