import { gql, useMutation } from '@apollo/client';

import {
  IImageContent,
  ILocation,
  ITextContent,
  IVideoContent,
  MultiLanguageField,
  IAccommodationActivitySpecification,
} from 'src/shared/interfaces';

export interface IEditAccommodationActivityVars {
  input: {
    id: string;
    shopId?: string;
    name?: MultiLanguageField[];
    description?: MultiLanguageField[];
    content?: {
      imageContent?: IImageContent[];
      textContent?: ITextContent[];
      videoContent?: IVideoContent[];
    };
    location?: ILocation;
    locationEnabled?: boolean;
    specificationFilter?: IAccommodationActivitySpecification[];
    specificationFilterEnabled?: boolean;
    visibility?: string;
    icon?: string;
  };
  shopId?: string;
}

export interface IEditAccommodationActivityRes {
  editAccommodationActivity: { id: string };
}

export const EDIT_ACCOMMODATION_ACTIVITY = gql`
  mutation EditAccommodationActivity($shopId: ObjectId!, $input: EditAccommodationActivityInput!) {
    editAccommodationActivity(input: $input, shopId: $shopId) {
      id
      name {
        value
        lang
        country
      }
    }
  }
`;

export const useEditAccommodationActivity = () => {
  const [mutate, { data, loading, error }] = useMutation<IEditAccommodationActivityRes, IEditAccommodationActivityVars>(
    EDIT_ACCOMMODATION_ACTIVITY,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            activities(existingItems = []) {
              cache.writeFragment({
                data: data?.editAccommodationActivity,
                fragment: gql`
                  fragment ActivityFields on Activity {
                    id
                    name {
                      lang
                      value
                      country
                    }
                  }
                `,
              });
              return [...existingItems];
            },
          },
        });
      },
    },
  );

  return { mutate, data, error, loading };
};
