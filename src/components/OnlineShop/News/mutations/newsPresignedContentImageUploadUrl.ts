import { gql, useMutation } from '@apollo/client';

export interface INewsPresignedContentImageUploadUrlVars {
  fileName: string;
  fileType: string;
  shopId?: string;
}

export interface INewsPresignedContentImageUploadUrlRes {
  newsPresignedContentImageUploadUrl: {
    url: string;
    resourceKey: string;
    fields: { name: string; value: string }[];
  };
}

export const NEWS_CONTENT_IMAGE_UPLOAD_URL = gql`
  mutation NewsPresignedContentImageUploadUrl($fileType: String!, $shopId: ObjectId!, $fileName: String!) {
    newsPresignedContentImageUploadUrl(fileType: $fileType, shopId: $shopId, fileName: $fileName) {
      url
      resourceKey
      fields {
        name
        value
      }
    }
  }
`;

export const useNewsPresignedContentImageUploadUrl = () => {
  const [mutate, { data, loading, error }] = useMutation<
    INewsPresignedContentImageUploadUrlRes,
    INewsPresignedContentImageUploadUrlVars
  >(NEWS_CONTENT_IMAGE_UPLOAD_URL);

  return { mutate, data, loading, error };
};
