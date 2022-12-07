import { gql } from '@apollo/client';

export interface IShopLogoPresignedUploadUrlVars {
  fileName: string;
  fileType: string;
  shopId?: string;
}

export interface IShopLogoPresignedUploadUrl {
  shopLogoPresignedUploadUrl: {
    url: string;
    resourceKey: string;
    fields: { name: string; value: string }[];
  };
}

export const SHOP_LOGO_PRESIGNED_UPLOAD_URL = gql`
  mutation ShopLogoPresignedUploadUrl($fileType: String!, $shopId: String!, $fileName: String!) {
    shopLogoPresignedUploadUrl(fileType: $fileType, shopId: $shopId, fileName: $fileName) {
      url
      resourceKey
      fields {
        name
        value
      }
    }
  }
`;
