import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { TOrderItem } from 'src/shared/interfaces';
import { TEvent } from 'src/shared/interfaces/TicketEvent';
import { CONFIRM_ORDER_ITEMS_FIELDS } from '../fragments/confirmOrderItems';

export interface IConfirmOrderItemsRes {
  confirmOrderItems: { event: TEvent; orderItem: TOrderItem }[];
}

export interface IOrderItemCheckoutFormInput {
  fields: { id: string; value: string }[];
  calendarFields: { id: string; value: Date }[];
  numberFields: { id: string; value: number }[];
  termsFields: { id: string; value: boolean }[];
}

export interface IConfirmOrderItemsInput {
  itemId: string;
  checkoutForm: IOrderItemCheckoutFormInput;
}

export interface IConfirmOrderItemsVars {
  input: IConfirmOrderItemsInput[];
}

const CONFIRM_ORDER_ITEMS = gql`
  ${CONFIRM_ORDER_ITEMS_FIELDS}
  mutation ConfirmOrderItems($input: [ConfirmOrderItemInput!]!) {
    confirmOrderItems(input: $input) {
      ...ConfirmOrderItemsFields
    }
  }
`;

export const useConfirmOrderItems = () => {
  const [mutate, { data, loading, error }] = useMutation<IConfirmOrderItemsRes, IConfirmOrderItemsVars>(
    CONFIRM_ORDER_ITEMS,
    {
      update(cache, { data }) {
        data?.confirmOrderItems.forEach(({ orderItem }) => {
          try {
            cache.modify({
              id: `${(orderItem as any).__typename}:${orderItem.id}`,
              fields: {
                checkoutForm() {
                  const newItemRef = cache.writeFragment({
                    data: orderItem?.checkoutForm,
                    fragment: CONFIRM_ORDER_ITEMS_FIELDS,
                  });

                  return newItemRef;
                },
              },
            });
          } catch (err) {}
        });
      },
    },
  );

  return { mutate, data, loading, error };
};
