import { gql, useMutation } from '@apollo/client';

interface IArchiveTicketProductVars {
  id: string;
  shopId?: string;
}

interface IArchiveTicketProductRes {
  archiveProduct: string | null;
}

const ARCHIVE_TICKET_PRODUCT = gql`
  mutation ArchiveTicketProduct($shopId: ObjectId!, $id: ObjectId!) {
    archiveProduct(id: $id, shopId: $shopId)
  }
`;

export const useArchiveTicketProduct = () => {
  const [mutate, { data, error, loading }] = useMutation<IArchiveTicketProductRes, IArchiveTicketProductVars>(
    ARCHIVE_TICKET_PRODUCT,
    {
      update(cache, { data }) {
        cache.evict({ id: `TicketProduct:${data?.archiveProduct}` });
      },
    },
  );

  return { mutate, data, error, loading };
};
