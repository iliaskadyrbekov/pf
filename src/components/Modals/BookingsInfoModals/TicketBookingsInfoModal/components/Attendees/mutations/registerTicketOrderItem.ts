import { gql, useMutation } from '@apollo/client';
import { IOrderItem } from 'src/shared/interfaces/OrderItem';

export interface IRegisterTickerOrderItemVars {
  id: string;
  isRegistered: boolean;
}

export interface IRegisterTickerOrderItemRes {
  registerTicketOrderItem: IOrderItem;
}

export const REGISTER_TICKET_ORDER_ITEM = gql`
  mutation RegisterTickerOrderItem($isRegistered: Boolean!, $id: ObjectId!) {
    registerTicketOrderItem(isRegistered: $isRegistered, id: $id) {
      orderItem {
        ... on TicketOrderItem {
          isRegistered
          id
        }
      }
    }
  }
`;

export const useRegisterTickerOrderItem = () => {
  const [mutate, { data, error }] = useMutation<IRegisterTickerOrderItemRes, IRegisterTickerOrderItemVars>(
    REGISTER_TICKET_ORDER_ITEM,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            menuItems(exisingItems = []) {
              const newItemRef = cache.writeFragment({
                id: `TicketOrderItem:${data?.registerTicketOrderItem.orderItem.id}`,
                data: data?.registerTicketOrderItem,
                fragment: gql`
                  fragment TickerOrderItemFields on OrderItem {
                    orderItem {
                      ... on TicketOrderItem {
                        isRegistered
                      }
                    }
                  }
                `,
              });

              return [...exisingItems, newItemRef];
            },
          },
        });
      },
    },
  );
  return { mutate, data, error };
};
