import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { RentalEventFrequencyType } from 'src/shared/enums';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { IRentalRecurringEvent } from 'src/shared/interfaces/RentalEvent';

export interface IEditRentalRecurringEventsRes {
  editRentalRecurringEvent: IRentalRecurringEvent;
}

export interface IEditRentalRecurringEventVars {
  shopId?: string;
  input: {
    id: string;
    exdate?: Date[];
    quantity?: number;
    startTime?: string;
    endTime?: string;
    freq?: RentalEventFrequencyType;
    interval?: number;
    byweekday?: string[];
    dtstart?: string | number | Date;
    until?: Date;
    minPurchaseTime?: IOptionalDuration;
    maxPurchaseTime?: IOptionalDuration;
  };
}

export const EDIT_RENTAL_RECURRING_EVENT = gql`
  mutation EditRentalRecurringEvent($shopId: ObjectId!, $input: EditRentalRecurringEventInput!) {
    editRentalRecurringEvent(shopId: $shopId, input: $input) {
      id
      quantity
      startTime
      endTime
      freq
      interval
      byweekday
      dtstart
      until
      exdate
      minPurchaseTime {
        value
        type
      }
      maxPurchaseTime {
        value
        type
      }
    }
  }
`;

export const useEditRentalRecurringEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<IEditRentalRecurringEventsRes, IEditRentalRecurringEventVars>(
    EDIT_RENTAL_RECURRING_EVENT,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            rentalEvents(exisingItems = []) {
              cache.writeFragment({
                data: data?.editRentalRecurringEvent,
                fragment: gql`
                  fragment RentalRecurringEventFields on RentalRecurringEvent {
                    id
                    quantity
                    startTime
                    endTime
                    freq
                    interval
                    byweekday
                    dtstart
                    until
                    exdate
                    minPurchaseTime {
                      value
                      type
                    }
                    maxPurchaseTime {
                      value
                      type
                    }
                  }
                `,
              });

              return exisingItems;
            },
          },
        });
      },
    },
  );

  return { mutate, data, loading, error };
};
