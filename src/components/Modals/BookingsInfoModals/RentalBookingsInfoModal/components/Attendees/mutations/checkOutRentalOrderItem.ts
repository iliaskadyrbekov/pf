import { gql, useMutation } from '@apollo/client';

export interface ICheckOutRentalOrderItemVars {
  input: {
    id: string;
    isCheckedOut: boolean;
  };
}

export interface ICheckOutRentalOrderItemRes {
  checkOutRentalOrderItem: { id: string; checkOut: boolean };
}

export const CHECK_OUT_RENTAL_ORDER_ITEM = gql`
  mutation CheckOutRentalOrderItem($input: CheckOutRentalOrderItem!) {
    checkOutRentalOrderItem(input: $input) {
      id
      checkOut
    }
  }
`;

export const useCheckOutRentalOrderItem = () => {
  const [mutate, { data, error }] = useMutation<ICheckOutRentalOrderItemRes, ICheckOutRentalOrderItemVars>(
    CHECK_OUT_RENTAL_ORDER_ITEM,
    {
      update(cache, { data }) {
        cache.modify({
          id: data?.checkOutRentalOrderItem.id,
          fields: {
            checkOut() {
              return data?.checkOutRentalOrderItem.checkOut;
            },
          },
        });
      },
    },
  );
  return { mutate, data, error };
};
