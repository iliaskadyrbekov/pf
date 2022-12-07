import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { MultiLanguageField } from 'src/shared/interfaces';
import { ICustomPage } from 'src/shared/interfaces/CustomPage';
import { IImageContent, ITextContent, IVideoContent } from 'src/shared/interfaces/MediaContent';

export interface ICreatePageRes {
  createPage: ICustomPage[];
}

export interface ICreatePageVars {
  shopId: string;
  name: MultiLanguageField[];
  content?: {
    imageContent: IImageContent[];
    textContent: ITextContent[];
    videoContent: IVideoContent[];
  };
  description?: MultiLanguageField[];
  tags?: string[];
  visibility?: string;
  headImage?: string;
}

export const CREATE_PAGE = gql`
  mutation CreatePage(
    $shopId: ObjectId!
    $content: ContentArgs
    $description: [MultiLanguageFieldInput!]
    $name: [PageNameInput!]!
    $tags: [String!]
    $visibility: String
    $headImage: String
  ) {
    createPage(
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

export const useCreatePage = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreatePageRes, ICreatePageVars>(CREATE_PAGE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          listPage(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: data?.createPage,
              fragment: gql`
                fragment ListPageFields on Page {
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
