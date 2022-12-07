import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { MultiLanguageField } from 'src/shared/interfaces';
import { ICustomPage } from 'src/shared/interfaces/CustomPage';
import { IImageContent, ITextContent, IVideoContent } from 'src/shared/interfaces/MediaContent';

export interface IEditPageRes {
  editPage: ICustomPage[];
}

export interface IEditPageVars {
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

export const EDIT_PAGE = gql`
  mutation EditPage(
    $content: ContentArgs
    $description: [MultiLanguageFieldInput!]
    $headImage: String
    $id: ObjectId!
    $shopId: ObjectId!
    $name: [PageNameInput!]
    $tags: [String!]
    $visibility: String
  ) {
    editPage(
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

export const useEditPage = () => {
  const [mutate, { data, loading, error }] = useMutation<IEditPageRes, IEditPageVars>(EDIT_PAGE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          listPage(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: data?.editPage,
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
