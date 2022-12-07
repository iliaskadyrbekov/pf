import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { MultiLanguageField } from 'src/shared/interfaces';
import { INews } from 'src/shared/interfaces/News';
import { IImageContent, ITextContent, IVideoContent } from 'src/shared/interfaces/MediaContent';

export interface IEditNewsRes {
  editNews: INews[];
}

export interface IEditNewsVars {
  id: string;
  shopId: string;
  name?: MultiLanguageField[];
  content?: {
    imageContent: IImageContent[];
    textContent: ITextContent[];
    videoContent: IVideoContent[];
  };
  headImage?: string;
  description?: MultiLanguageField[];
  tags?: string[];
  visibility?: string;
}

export const EDIT_NEWS = gql`
  mutation EditNews(
    $content: ContentArgs
    $description: [MultiLanguageFieldInput!]
    $headImage: String
    $id: ObjectId!
    $shopId: ObjectId!
    $name: [NewsNameInput!]
    $tags: [String!]
    $visibility: String
  ) {
    editNews(
      id: $id
      headImage: $headImage
      shopId: $shopId
      name: $name
      content: $content
      description: $description
      tags: $tags
      visibility: $visibility
    ) {
      id
      name {
        value
        lang
        country
      }
      headImage
      tags
      createdAt
      visibility {
        id
        label
      }
    }
  }
`;

export const useEditNews = () => {
  const [mutate, { data, loading, error }] = useMutation<IEditNewsRes, IEditNewsVars>(EDIT_NEWS, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          listNews(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: data?.editNews,
              fragment: gql`
                fragment ListNewsFields on News {
                  id
                  name {
                    value
                    lang
                    country
                  }
                  headImage
                  tags
                  createdAt
                  visibility {
                    id
                    label
                  }
                }
              `,
            });

            return [...existingItems, newItemRef];
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
