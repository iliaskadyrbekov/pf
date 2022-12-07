import { gql, useMutation } from '@apollo/client';

export interface IProductMediaPresignedUploadUrlVars {
  fileName: string;
  fileType: string;
  productId: string;
  shopId?: string;
}

export interface IProductMediaPresignedUploadUrlRes {
  productMediaPresignedUploadUrl: {
    url: string;
    resourceKey: string;
    fields: { name: string; value: string }[];
  };
}

export const PRODUCT_MEDIA_PRESIGNED_UPLOAD_URL = gql`
  mutation ProductMediaPresignedUploadUrl(
    $productId: String!
    $fileType: String!
    $shopId: String!
    $fileName: String!
  ) {
    productMediaPresignedUploadUrl(productId: $productId, fileType: $fileType, shopId: $shopId, fileName: $fileName) {
      url
      resourceKey
      fields {
        name
        value
      }
    }
  }
`;

export const useProductMediaPresignedUploadUrl = () => {
  const [mutate, { data, error, loading }] = useMutation<
    IProductMediaPresignedUploadUrlRes,
    IProductMediaPresignedUploadUrlVars
  >(PRODUCT_MEDIA_PRESIGNED_UPLOAD_URL);

  return { mutate, data, error, loading };
};
