import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { IActivity } from 'src/shared/interfaces/Activity';

export interface IReorderActivitiesRes {
  reorderActivities: IActivity[];
}

export interface IReorderActivitiesVars {
  shopId?: string;
  input: {
    id: string;
    order: number;
  }[];
}

export const REORDER_ACTIVITIES = gql`
  mutation ReorderActivities($shopId: ObjectId!, $input: [ReorderActivityInput!]!) {
    reorderActivities(shopId: $shopId, input: $input) {
      order
      id
    }
  }
`;

export const useReorderActivities = () => {
  const [mutate, { data, loading, error }] = useMutation<IReorderActivitiesRes, IReorderActivitiesVars>(
    REORDER_ACTIVITIES,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            activities() {
              const newItemsRef = data?.reorderActivities.map((act) =>
                cache.writeFragment({
                  data: act,
                  fragment: gql`
                    fragment ActivityFields on Activity {
                      order
                    }
                  `,
                }),
              );

              return newItemsRef;
            },
          },
        });
      },
    },
  );

  return { mutate, data, loading, error };
};
