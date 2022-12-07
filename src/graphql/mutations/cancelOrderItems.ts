import { isReference, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

export interface ICancelOrderItemsRes {
  cancelOrderItems: boolean;
}

export interface ICancelOrderItemsVars {
  shopId?: string;
  input: string[];
  notRemoveOrder?: boolean;
}

export const CANCEL_ORDER_ITEMS = gql`
  mutation CancelOrderItems($input: [ObjectId!]!, $notRemoveOrder: Boolean, $shopId: ObjectId) {
    cancelOrderItems(input: $input, notRemoveOrder: $notRemoveOrder, shopId: $shopId)
  }
`;

export const useCancelOrderItems = () => {
  const [mutate, { data, loading, error }] = useMutation<ICancelOrderItemsRes, ICancelOrderItemsVars>(
    CANCEL_ORDER_ITEMS,
    {
      update(cache, _, { variables, context }) {
        cache.modify({
          id: `Order:${context?.orderId}`,
          fields: {
            orderItems(existingItemsRefs: { __ref: string }[], { readField }) {
              existingItemsRefs.forEach((orderItem) => {
                const id = readField('orderItem', orderItem);

                if (isReference(id) && variables?.input.includes(id.__ref)) {
                  cache.evict({ id: id.__ref });
                }
              });
            },
          },
        });
      },
    },
  );

  return { mutate, data, loading, error };
};
