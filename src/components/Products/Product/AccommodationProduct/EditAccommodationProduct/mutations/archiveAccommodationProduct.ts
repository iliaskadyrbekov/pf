import { gql, useMutation } from '@apollo/client';

interface IArchiveAccommodationProductVars {
  id: string;
  shopId?: string;
}

interface IArchiveAccommodationProductRes {
  archiveProduct: string | null;
}

const ARCHIVE_ACCOMMODATION_PRODUCT = gql`
  mutation ArchiveAccommodationProduct($shopId: ObjectId!, $id: ObjectId!) {
    archiveProduct(id: $id, shopId: $shopId)
  }
`;

export const useArchiveAccommodationProduct = () => {
  const [mutate, { data, error, loading }] = useMutation<
    IArchiveAccommodationProductRes,
    IArchiveAccommodationProductVars
  >(ARCHIVE_ACCOMMODATION_PRODUCT, {
    update(cache, { data }) {
      cache.evict({ id: `AccommodationProduct:${data?.archiveProduct}` });
    },
  });

  return { mutate, data, error, loading };
};
