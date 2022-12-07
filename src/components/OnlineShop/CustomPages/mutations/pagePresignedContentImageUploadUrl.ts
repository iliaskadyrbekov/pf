import { gql, useMutation } from '@apollo/client';

export interface IPagePresignedContentImageUploadUrlVars {
  fileName: string;
  fileType: string;
  shopId?: string;
}

export interface IPagePresignedContentImageUploadUrlRes {
  pagePresignedContentImageUploadUrl: {
    url: string;
    resourceKey: string;
    fields: { name: string; value: string }[];
  };
}

export const PAGE_CONTENT_IMAGE_UPLOAD_URL = gql`
  mutation PagePresignedContentImageUploadUrl($fileType: String!, $shopId: ObjectId!, $fileName: String!) {
    pagePresignedContentImageUploadUrl(fileType: $fileType, shopId: $shopId, fileName: $fileName) {
      url
      resourceKey
      fields {
        name
        value
      }
    }
  }
`;

export const usePagePresignedContentImageUploadUrl = () => {
  const [mutate, { data, loading, error }] = useMutation<
    IPagePresignedContentImageUploadUrlRes,
    IPagePresignedContentImageUploadUrlVars
  >(PAGE_CONTENT_IMAGE_UPLOAD_URL);

  return { mutate, data, loading, error };
};
