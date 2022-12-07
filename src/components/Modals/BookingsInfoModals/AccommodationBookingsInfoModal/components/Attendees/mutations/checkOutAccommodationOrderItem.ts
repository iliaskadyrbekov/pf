import { gql, useMutation } from '@apollo/client';

export interface ICheckOutAccommodationOrderItemVars {
  shopId?: string;
  input: {
    id: string;
    isCheckedOut: boolean;
  };
}

export interface ICheckOutAccommodationOrderItemRes {
  checkOutAccommodationOrderItem: { id: string; checkOut: boolean };
}

export const CHECK_OUT_ACCOMMODATION_ORDER_ITEM = gql`
  mutation CheckOutAccommodationOrderItem($input: CheckOutAccommodationOrderItemInput!, $shopId: ObjectId!) {
    checkOutAccommodationOrderItem(input: $input, shopId: $shopId) {
      id
      checkOut
    }
  }
`;

export const useCheckOutAccommodationOrderItem = () => {
  const [mutate, { data, error }] = useMutation<
    ICheckOutAccommodationOrderItemRes,
    ICheckOutAccommodationOrderItemVars
  >(CHECK_OUT_ACCOMMODATION_ORDER_ITEM, {
    update(cache, { data }) {
      cache.modify({
        id: data?.checkOutAccommodationOrderItem.id,
        fields: {
          checkOut() {
            return data?.checkOutAccommodationOrderItem.checkOut;
          },
        },
      });
    },
  });
  return { mutate, data, error };
};
