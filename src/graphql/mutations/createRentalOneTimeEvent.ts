import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';

import { IRentalOneTimeEvent } from 'src/shared/interfaces/RentalEvent';

export interface ICreateRentalOneTimeEventsRes {
  createRentalOneTimeEvent: IRentalOneTimeEvent;
}

export interface ICreateRentalOneTimeEventInput {
  product: string;
  quantity: number;
  startTime: string;
  endTime: string;
  startDate: Date;
  endDate?: Date;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
}

export interface ICreateRentalOneTimeEventVars {
  shopId?: string;
  input: ICreateRentalOneTimeEventInput;
}

export const CREATE_RENTAL_ONE_TIME_EVENT = gql`
  mutation CreateRentalOneTimeEvent($shopId: ObjectId!, $input: CreateRentalOneTimeEventDto!) {
    createRentalOneTimeEvent(shopId: $shopId, input: $input) {
      id
      type
      quantity
      startTime
      endTime
      startDate
      endDate
    }
  }
`;

export const useCreateRentalOneTimeEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateRentalOneTimeEventsRes, ICreateRentalOneTimeEventVars>(
    CREATE_RENTAL_ONE_TIME_EVENT,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            rentalEvents(exisingItems = []) {
              const newItemRef = cache.writeFragment({
                data: data?.createRentalOneTimeEvent,
                fragment: gql`
                  fragment RentalOneTimeEventFields on RentalEvent {
                    id
                    type
                    quantity
                    startTime
                    endTime

                    ... on RentalOneTimeEvent {
                      startDate
                      endDate
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

  return { mutate, data, loading, error };
};
