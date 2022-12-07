import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { INews } from 'src/shared/interfaces/News';
import { MultiLanguageField } from 'src/shared/interfaces';
import { IImageContent, ITextContent, IVideoContent } from 'src/shared/interfaces/MediaContent';

export interface ICreateNewsRes {
  createNews: INews[];
}

export interface ICreateNewsVars {
  shopId: string;
  name: MultiLanguageField[];
  content?: {
    imageContent: IImageContent[];
    textContent: ITextContent[];
    videoContent: IVideoContent[];
  };
  description?: MultiLanguageField[];
  tags?: string[];
  headImage?: string;
  visibility?: string;
}

export const CREATE_NEWS = gql`
  mutation CreateNews(
    $shopId: ObjectId!
    $content: ContentArgs
    $description: [MultiLanguageFieldInput!]
    $name: [NewsNameInput!]!
    $tags: [String!]
    $visibility: String
    $headImage: String
  ) {
    createNews(
      shopId: $shopId
      name: $name
      content: $content
      description: $description
      tags: $tags
      visibility: $visibility
      headImage: $headImage
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

export const useCreateNews = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateNewsRes, ICreateNewsVars>(CREATE_NEWS, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          listNews(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: data?.createNews,
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
