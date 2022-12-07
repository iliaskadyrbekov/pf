import { gql, useMutation } from '@apollo/client';

export interface ICheckInAccommodationOrderItemVars {
  shopId?: string;
  input: {
    id: string;
    isCheckedIn: boolean;
  };
}

export interface ICheckInAccommodationOrderItemRes {
  checkInAccommodationOrderItem: { id: string; checkIn: boolean };
}

export const CHECK_IN_ACCOMMODATION_ORDER_ITEM = gql`
  mutation CheckInAccommodationOrderItem($input: CheckInAccommodationOrderItemInput!, $shopId: ObjectId!) {
    checkInAccommodationOrderItem(input: $input, shopId: $shopId) {
      id
      checkIn
    }
  }
`;

export const useCheckInAccommodationOrderItem = () => {
  const [mutate, { data, error }] = useMutation<ICheckInAccommodationOrderItemRes, ICheckInAccommodationOrderItemVars>(
    CHECK_IN_ACCOMMODATION_ORDER_ITEM,
    {
      update(cache, { data }) {
        cache.modify({
          id: data?.checkInAccommodationOrderItem.id,
          fields: {
            checkIn() {
              return data?.checkInAccommodationOrderItem.checkIn;
            },
          },
        });
      },
    },
  );
  return { mutate, data, error };
};
