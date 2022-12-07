import { gql, useMutation } from '@apollo/client';
import { ActivityType } from 'src/shared/enums/ActivityType';
import { MultiLanguageField } from 'src/shared/interfaces';
import { IActivity } from 'src/shared/interfaces/Activity';

export interface ICreateActivityVars {
  name?: MultiLanguageField[];
  type: ActivityType;
  order: number;
  shopId?: string;
}

export interface ICreateActivityRes {
  createActivity: IActivity;
}

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity($name: [ActivityNameInput!]!, $order: Int!, $type: ActivityType!, $shopId: String!) {
    createActivity(name: $name, type: $type, shopId: $shopId, order: $order) {
      id
      order
      name {
        lang
        value
        country
      }
      type
    }
  }
`;

export const useCreateActivity = () => {
  const [mutate, { data, error, loading }] = useMutation<ICreateActivityRes, ICreateActivityVars>(CREATE_ACTIVITY, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          activities(existingItems = []) {
            const newItemsRef = cache.writeFragment({
              data: data?.createActivity,
              fragment: gql`
                fragment ActivityFields on Activity {
                  id
                  order
                  name {
                    lang
                    value
                    country
                  }
                  type
                }
              `,
            });
            return [...existingItems, newItemsRef];
          },
        },
      });
    },
  });

  return { mutate, data, error, loading };
};
