import { gql, useMutation } from '@apollo/client';

interface IArchiveRentalProductVars {
  id: string;
  shopId?: string;
}

interface IArchiveRentalProductRes {
  archiveProduct: string | null;
}

const ARCHIVE_RENTAL_PRODUCT = gql`
  mutation ArchiveRentalProduct($shopId: ObjectId!, $id: ObjectId!) {
    archiveProduct(id: $id, shopId: $shopId)
  }
`;

export const useArchiveRentalProduct = () => {
  const [mutate, { data, error, loading }] = useMutation<IArchiveRentalProductRes, IArchiveRentalProductVars>(
    ARCHIVE_RENTAL_PRODUCT,
    {
      update(cache, { data }) {
        cache.evict({ id: `RentalProduct:${data?.archiveProduct}` });
      },
    },
  );

  return { mutate, data, error, loading };
};
