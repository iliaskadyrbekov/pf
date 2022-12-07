import { gql, useMutation } from '@apollo/client';

export interface IPagePresignedHeadImageUploadUrlVars {
  fileName: string;
  fileType: string;
  shopId: string;
}

export interface IPagePresignedHeadImageUploadUrlUrlRes {
  pagePresignedHeadImageUploadUrl: {
    url: string;
    resourceKey: string;
    fields: { name: string; value: string }[];
  };
}

export const PAGE_PRESIGNED_HEAD_IMAGE_UPLOAD_URL = gql`
  mutation PagePresignedHeadImageUploadUrl($fileType: String!, $shopId: ObjectId!, $fileName: String!) {
    pagePresignedHeadImageUploadUrl(fileType: $fileType, shopId: $shopId, fileName: $fileName) {
      url
      resourceKey
      fields {
        name
        value
      }
    }
  }
`;

export const usePagePresignedHeadImageUploadUrl = () => {
  const [mutate, { data, loading, error }] = useMutation<
    IPagePresignedHeadImageUploadUrlUrlRes,
    IPagePresignedHeadImageUploadUrlVars
  >(PAGE_PRESIGNED_HEAD_IMAGE_UPLOAD_URL);

  return { mutate, data, loading, error };
};
