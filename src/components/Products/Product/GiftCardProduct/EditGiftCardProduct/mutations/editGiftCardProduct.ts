import { gql, useMutation } from '@apollo/client';

import { ICheckoutFormRequest } from 'src/shared/interfaces/CheckoutForm';
import { IDuration, ITicketPricingVariation, MultiLanguageField } from 'src/shared/interfaces';

export interface IEditGiftCardProductRes {
  editGiftCardProduct: {
    product: {
      id: string;
    };
  };
}

export interface IEditGiftCardProductVars {
  checkoutForm: ICheckoutFormRequest;
  expiresAt: IDuration;
  id: string;
  name: MultiLanguageField[];
  pricing: [ITicketPricingVariation];
  shopId?: string;
  shortDescription: MultiLanguageField[];
  visibility?: string;
  VAT?: string;
}

export const EDIT_GIFT_CARD_PRODUCT = gql`
  mutation EditGiftCardProduct(
    $name: [ProductNameInput!]
    $shortDescription: [MultiLanguageFieldInput!]
    $visibility: VisibilityType
    $id: ObjectId!
    $shopId: String!
    $pricing: [TicketPricingVariationInput!]!
    $checkoutForm: CreateCheckoutFormDTO
    $expiresAt: DurationInput
    $VAT: ObjectId
  ) {
    editGiftCardProduct(
      name: $name
      shortDescription: $shortDescription
      visibility: $visibility
      id: $id
      shopId: $shopId
      checkoutForm: $checkoutForm
      pricing: $pricing
      expiresAt: $expiresAt
      VAT: $VAT
    ) {
      visibility {
        id
      }
    }
  }
`;

export const useEditGiftCardProduct = () => {
  const [mutate, { data, error, loading }] = useMutation<IEditGiftCardProductRes, IEditGiftCardProductVars>(
    EDIT_GIFT_CARD_PRODUCT,
  );

  return { mutate, data, error, loading };
};
