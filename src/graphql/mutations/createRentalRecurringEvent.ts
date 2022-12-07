import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { RentalEventFrequencyType } from 'src/shared/enums';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { IRentalRecurringEvent } from 'src/shared/interfaces/RentalEvent';

export interface ICreateRentalRecurringEventsRes {
  createRentalRecurringEvent: IRentalRecurringEvent;
}

export interface ICreateRentalRecurringEventInput {
  product: string;
  quantity: number;
  startTime: string;
  endTime: string;
  freq: RentalEventFrequencyType;
  interval: number;
  byweekday: string[];
  dtstart: string | number | Date;
  until?: Date;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  tzid?: string;
}

export interface ICreateRentalRecurringEventVars {
  shopId?: string;
  input: ICreateRentalRecurringEventInput;
}

export const CREATE_RENTAL_RECURRING_EVENT = gql`
  mutation CreateRentalRecurringEvent($shopId: ObjectId!, $input: CreateRentalRecurringEventDto!) {
    createRentalRecurringEvent(shopId: $shopId, input: $input) {
      id
      type
      quantity
      startTime
      endTime
      freq
      tzid
      interval
      byweekday
      dtstart
      until
    }
  }
`;

export const useCreateRentalRecurringEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<
    ICreateRentalRecurringEventsRes,
    ICreateRentalRecurringEventVars
  >(CREATE_RENTAL_RECURRING_EVENT, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          rentalEvents(exisingItems = []) {
            const newItemRef = cache.writeFragment({
              data: data?.createRentalRecurringEvent,
              fragment: gql`
                fragment RentalRecurringEventFields on RentalEvent {
                  id
                  type
                  quantity
                  startTime
                  endTime

                  ... on RentalRecurringEvent {
                    tzid
                    freq
                    interval
                    byweekday
                    dtstart
                    until
                  }
                }
              `,
            });

            return [...exisingItems, newItemRef];
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
