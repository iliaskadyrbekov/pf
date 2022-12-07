import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { MultiLanguageField } from 'src/shared/interfaces';
import { IActivity } from 'src/shared/interfaces/Activity';

export interface ICreateRenalCategorysRes {
  createRentalCategory: IActivity;
}

export interface ICreateRenalCategoryVars {
  shopId?: string;
  input: {
    activityId: string;
    name: MultiLanguageField[];
  };
}

export const CREATE_RENTAL_CATEGORY = gql`
  mutation CreateRenalCategory($shopId: String!, $input: CreateRentalCategoryInput!) {
    createRentalCategory(shopId: $shopId, input: $input) {
      id
      categories {
        id
        name {
          lang
          value
          country
        }
      }
    }
  }
`;

export const useCreateRenalCategory = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateRenalCategorysRes, ICreateRenalCategoryVars>(
    CREATE_RENTAL_CATEGORY,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            activity() {
              const newItemRef = cache.writeFragment({
                data: data?.createRentalCategory,
                fragment: gql`
                  fragment ActivityCategory on Activity {
                    id
                    categories {
                      id
                      name {
                        lang
                        value
                        country
                      }
                    }
                  }
                `,
              });

              return newItemRef;
            },
          },
        });
      },
    },
  );

  return { mutate, data, loading, error };
};
