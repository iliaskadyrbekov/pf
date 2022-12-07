import { gql, useMutation } from '@apollo/client';

export interface IActivityPresignedContentImageUploadUrlVars {
  fileName: string;
  fileType: string;
  shopId?: string;
}

export interface IActivityPresignedContentImageUploadUrl {
  activityPresignedContentImageUploadUrl: {
    url: string;
    resourceKey: string;
    fields: { name: string; value: string }[];
  };
}

export const ACTIVITY_CONTENT_IMAGE_UPLOAD_URL = gql`
  mutation ActivityPresignedContentImageUploadUrl($fileType: String!, $shopId: String!, $fileName: String!) {
    activityPresignedContentImageUploadUrl(fileType: $fileType, shopId: $shopId, fileName: $fileName) {
      url
      resourceKey
      fields {
        name
        value
      }
    }
  }
`;

export const useActivityPresignedContentImageUploadUrl = () => {
  return useMutation<IActivityPresignedContentImageUploadUrl, IActivityPresignedContentImageUploadUrlVars>(
    ACTIVITY_CONTENT_IMAGE_UPLOAD_URL,
  );
};
