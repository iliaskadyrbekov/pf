import { gql, useMutation } from '@apollo/client';

import { ProductType } from 'src/shared/enums/ProductType';
import { IDuration, MultiLanguageField } from 'src/shared/interfaces';

export interface ICreateGiftCardProductRes {
  createGiftCardProduct: {
    id: string;
    name: MultiLanguageField[];
    type: ProductType;
  };
}

export interface ICreateGiftCardProductVars {
  activityId: string;
  shopId?: string;
  name?: MultiLanguageField[];
  pricing: { name: [MultiLanguageField]; order: number; price: number }[];
  expiresAt: IDuration;
}

export const CREATE_GIFT_CARD_PRODUCT = gql`
  mutation CreateGiftCardProduct(
    $activityId: ObjectId!
    $shopId: ObjectId!
    $name: [ProductNameInput!]!
    $pricing: [TicketPricingVariationInput!]!
    $expiresAt: DurationInput!
  ) {
    createGiftCardProduct(
      activityId: $activityId
      shopId: $shopId
      name: $name
      pricing: $pricing
      expiresAt: $expiresAt
    ) {
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

export const useCreateGiftCardProduct = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateGiftCardProductRes, ICreateGiftCardProductVars>(
    CREATE_GIFT_CARD_PRODUCT,
  );

  return { mutate, data, loading, error };
};
