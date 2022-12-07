import { gql, useMutation } from '@apollo/client';

interface IArchiveGiftCardProductVars {
  id: string;
  shopId?: string;
}

interface IArchiveGiftCardProductRes {
  archiveProduct: string | null;
}

const ARCHIVE_GIFT_CARD_PRODUCT = gql`
  mutation ArchiveGiftCardProduct($shopId: ObjectId!, $id: ObjectId!) {
    archiveProduct(id: $id, shopId: $shopId)
  }
`;

export const useArchiveGiftCardProduct = () => {
  const [mutate, { data, error, loading }] = useMutation<IArchiveGiftCardProductRes, IArchiveGiftCardProductVars>(
    ARCHIVE_GIFT_CARD_PRODUCT,
    {
      update(cache, { data }) {
        cache.evict({ id: `GiftCardProduct:${data?.archiveProduct}` });
      },
    },
  );

  return { mutate, data, error, loading };
};
