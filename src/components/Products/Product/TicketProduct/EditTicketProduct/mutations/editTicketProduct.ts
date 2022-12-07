import { gql, useMutation } from '@apollo/client';

import { AvailabilityType } from 'src/shared/enums/AvailabilityType';
import { ICheckoutFormRequest, IDuration, ITicketPricingVariation, MultiLanguageField } from 'src/shared/interfaces';

interface IEditTicketProductRes {
  editTicketProduct: {
    product: {
      id: string;
    };
  };
}

interface IEditTicketProductVars {
  id: string;
  checkoutForm: ICheckoutFormRequest;
  availabilityType: AvailabilityType;
  checkoutEnabled: boolean;
  duration: IDuration;
  name?: MultiLanguageField[];
  visibility?: string;
  shopId?: string;
  shortDescription?: MultiLanguageField[];
  pricing: ITicketPricingVariation[];
  VAT?: string;
}

export const EDIT_TICKET_PRODUCT = gql`
  mutation EditTicketProduct(
    $name: [ProductNameInput!]
    $shortDescription: [MultiLanguageFieldInput!]
    $visibility: VisibilityType
    $pricing: [TicketPricingVariationInput!]!
    $id: ObjectId!
    $shopId: String!
    $duration: DurationInput!
    $checkoutEnabled: Boolean!
    $checkoutForm: CreateCheckoutFormDTO
    $availabilityType: AvailabilityType!
    $VAT: ObjectId
  ) {
    editTicketProduct(
      name: $name
      id: $id
      shopId: $shopId
      shortDescription: $shortDescription
      visibility: $visibility
      pricing: $pricing
      duration: $duration
      checkoutForm: $checkoutForm
      checkoutEnabled: $checkoutEnabled
      availabilityType: $availabilityType
      VAT: $VAT
    ) {
      visibility {
        id
      }
    }
  }
`;

export const useEditTicketProduct = () => {
  const [mutate, { data, error, loading }] = useMutation<IEditTicketProductRes, IEditTicketProductVars>(
    EDIT_TICKET_PRODUCT,
  );

  return { mutate, data, error, loading };
};
