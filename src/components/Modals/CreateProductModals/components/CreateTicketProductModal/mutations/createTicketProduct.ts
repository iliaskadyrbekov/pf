import { gql, useMutation } from '@apollo/client';

import { AvailabilityType } from 'src/shared/enums/AvailabilityType';
import { IDuration, MultiLanguageField } from 'src/shared/interfaces';

export interface ICreateTicketProductRes {
  createTicketProduct: {
    id: string;
  };
}

export interface ICreateTicketProductVars {
  activityId: string;
  shopId?: string;
  name?: MultiLanguageField[];
  pricing: { name: [MultiLanguageField]; order: number; price: number }[];
  duration: IDuration;
  availabilityType: AvailabilityType;
}

export const CREATE_TICKET_PRODUCT = gql`
  mutation CreateTicketProduct(
    $activityId: ObjectId!
    $shopId: String!
    $name: [ProductNameInput!]!
    $pricing: [TicketPricingVariationInput!]!
    $duration: DurationInput!
    $availabilityType: AvailabilityType!
  ) {
    createTicketProduct(
      activityId: $activityId
      shopId: $shopId
      name: $name
      pricing: $pricing
      duration: $duration
      availabilityType: $availabilityType
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

export const useCreateTicketProduct = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateTicketProductRes, ICreateTicketProductVars>(
    CREATE_TICKET_PRODUCT,
  );

  return { mutate, data, loading, error };
};
