import { gql, useMutation } from '@apollo/client';

export interface ICheckInRentalOrderItemVars {
  input: {
    id: string;
    isCheckedIn: boolean;
  };
}

export interface ICheckInRentalOrderItemRes {
  checkInRentalOrderItem: { id: string; checkIn: boolean };
}

export const CHECK_IN_RENTAL_ORDER_ITEM = gql`
  mutation CheckInRentalOrderItem($input: CheckInRentalOrderItem!) {
    checkInRentalOrderItem(input: $input) {
      id
      checkIn
    }
  }
`;

export const useCheckInRentalOrderItem = () => {
  const [mutate, { data, error }] = useMutation<ICheckInRentalOrderItemRes, ICheckInRentalOrderItemVars>(
    CHECK_IN_RENTAL_ORDER_ITEM,
    {
      update(cache, { data }) {
        cache.modify({
          id: data?.checkInRentalOrderItem.id,
          fields: {
            checkIn() {
              return data?.checkInRentalOrderItem.checkIn;
            },
          },
        });
      },
    },
  );
  return { mutate, data, error };
};
