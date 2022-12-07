import { gql, useMutation } from '@apollo/client';

export interface INewsPresignedHeadImageUploadUrlVars {
  fileName: string;
  fileType: string;
  shopId: string;
}

export interface INewsPresignedHeadImageUploadUrlUrlRes {
  newsPresignedHeadImageUploadUrl: {
    url: string;
    resourceKey: string;
    fields: { name: string; value: string }[];
  };
}

export const NEWS_PRESIGNED_HEAD_IMAGE_UPLOAD_URL = gql`
  mutation NewsPresignedHeadImageUploadUrl($fileType: String!, $shopId: ObjectId!, $fileName: String!) {
    newsPresignedHeadImageUploadUrl(fileType: $fileType, shopId: $shopId, fileName: $fileName) {
      url
      resourceKey
      fields {
        name
        value
      }
    }
  }
`;

export const useNewsPresignedHeadImageUploadUrl = () => {
  const [mutate, { data, loading, error }] = useMutation<
    INewsPresignedHeadImageUploadUrlUrlRes,
    INewsPresignedHeadImageUploadUrlVars
  >(NEWS_PRESIGNED_HEAD_IMAGE_UPLOAD_URL);

  return { mutate, data, loading, error };
};
