import { gql, useMutation } from '@apollo/client';

import { ILocation, MultiLanguageField } from 'src/shared/interfaces';
import { MediaContentType } from 'src/shared/interfaces/MediaContent';

interface ImageContentInput extends Content {
  url?: string;
}

interface TextContentInput extends Content {
  text?: MultiLanguageField[];
}

interface VideoContentInput extends Content {
  url?: string;
}

interface Content {
  type: MediaContentType;
  order: number;
}

export interface IEditActivityVars {
  id: string;
  shopId?: string;
  name?: MultiLanguageField[];
  description?: MultiLanguageField[];
  content?: {
    imageContent?: ImageContentInput[];
    textContent?: TextContentInput[];
    videoContent?: VideoContentInput[];
  };
  location?: ILocation;
  locationEnabled?: boolean;
  visibility?: string;
}

export interface IEditActivity {
  editActivity: { id: string };
}

export interface ActivityContent {
  imageContent?: ImageContentInput[];
  textContent?: TextContentInput[];
  videoContent?: VideoContentInput[];
}

export const EDIT_ACTIVITY = gql`
  mutation EditActivity(
    $id: String!
    $shopId: String!
    $name: [ActivityNameInput!]
    $description: [MultiLanguageFieldInput!]
    $content: ContentArgs
    $icon: String
    $visibility: String
    $location: LocationInput
    $locationEnabled: Boolean
  ) {
    editActivity(
      id: $id
      shopId: $shopId
      name: $name
      description: $description
      content: $content
      icon: $icon
      visibility: $visibility
      location: $location
      locationEnabled: $locationEnabled
    ) {
      id
      name {
        value
        lang
        country
      }
    }
  }
`;

export const useEditActivity = () => {
  const [mutate, { data, loading, error }] = useMutation<IEditActivity, IEditActivityVars>(EDIT_ACTIVITY, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          activities(existingItems = []) {
            cache.writeFragment({
              data: data?.editActivity,
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
  });

  return { mutate, data, error, loading };
};
