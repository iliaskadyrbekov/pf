import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';

import { IRentalOneTimeEvent } from 'src/shared/interfaces/RentalEvent';

export interface IEditRentalOneTimeEventsRes {
  editRentalOneTimeEvent: IRentalOneTimeEvent;
}

export interface IEditRentalOneTimeEventVars {
  shopId?: string;
  input: {
    id: string;
    product?: string;
    quantity?: number;
    startTime?: string;
    endTime?: string;
    startDate?: Date;
    endDate?: Date;
    minPurchaseTime?: IOptionalDuration;
    maxPurchaseTime?: IOptionalDuration;
  };
}

export const EDIT_RENTAL_ONE_TIME_EVENT = gql`
  mutation EditRentalOneTimeEvent($shopId: ObjectId!, $input: EditRentalOneTimeEventInput!) {
    editRentalOneTimeEvent(shopId: $shopId, input: $input) {
      id
      type
      quantity
      startTime
      endTime
      startDate
      endDate
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

export const useEditRentalOneTimeEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<IEditRentalOneTimeEventsRes, IEditRentalOneTimeEventVars>(
    EDIT_RENTAL_ONE_TIME_EVENT,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            rentalEvents(exisingItems = []) {
              cache.writeFragment({
                data: data?.editRentalOneTimeEvent,
                fragment: gql`
                  fragment RentalOneTimeEventFields on RentalOneTimeEvent {
                    id
                    quantity
                    startTime
                    endTime
                    startDate
                    endDate
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
