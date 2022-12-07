import { gql, useMutation } from '@apollo/client';

export interface IShopPreferencesHeadImagePresignedUploadUrlVars {
  fileName: string;
  fileType: string;
  shopId?: string;
}

export interface IShopPreferencesHeadImagePresignedUploadUrlRes {
  shopPreferencesHeadImagePresignedUploadUrl: {
    url: string;
    resourceKey: string;
    fields: { name: string; value: string }[];
  };
}

export const SHOP_PREFERENCES_HEAD_IMAGE_PRESIGNED_UPLOAD_URL = gql`
  mutation ShopPreferencesHeadImagePresignedUploadUrl($fileType: String!, $shopId: String!, $fileName: String!) {
    shopPreferencesHeadImagePresignedUploadUrl(fileType: $fileType, shopId: $shopId, fileName: $fileName) {
      url
      resourceKey
      fields {
        name
        value
      }
    }
  }
`;

export const useShopPreferencesHeadImagePresignedUploadUrl = () => {
  const [mutate, { data, error, loading }] = useMutation<
    IShopPreferencesHeadImagePresignedUploadUrlRes,
    IShopPreferencesHeadImagePresignedUploadUrlVars
  >(SHOP_PREFERENCES_HEAD_IMAGE_PRESIGNED_UPLOAD_URL);

  return { mutate, data, error, loading };
};
