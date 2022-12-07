import { gql, useMutation } from '@apollo/client';

export interface IActivityPresignedHeadImageUploadUrlVars {
  fileName: string;
  fileType: string;
  shopId?: string;
}

export interface IActivityPresignedHeadImageUploadUrl {
  activityPresignedHeadImageUploadUrl: {
    url: string;
    resourceKey: string;
    fields: { name: string; value: string }[];
  };
}

export const ACTIVITY_HEAD_IMAGE_UPLOAD_URL = gql`
  mutation ActivityPresignedHeadImageUploadUrl($fileType: String!, $shopId: String!, $fileName: String!) {
    activityPresignedHeadImageUploadUrl(fileType: $fileType, shopId: $shopId, fileName: $fileName) {
      url
      resourceKey
      fields {
        name
        value
      }
    }
  }
`;

export const useActivityPresignedHeadImageUploadUrl = () => {
  return useMutation<IActivityPresignedHeadImageUploadUrl, IActivityPresignedHeadImageUploadUrlVars>(
    ACTIVITY_HEAD_IMAGE_UPLOAD_URL,
  );
};
