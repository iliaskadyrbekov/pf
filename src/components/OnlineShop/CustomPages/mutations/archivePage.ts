import { gql, useMutation } from '@apollo/client';

export type IArchivePageRes = {
  deleteCustomPage: string;
};

export interface IArchivePageVars {
  id: string;
  shopId: string;
}

export const ARCHIVE_PAGE = gql`
  mutation ArchivePage($shopId: ObjectId!, $id: ObjectId!) {
    deleteCustomPage(shopId: $shopId, id: $id)
  }
`;

export const useArchivePage = () => {
  const [mutate, { data, loading, error }] = useMutation<IArchivePageRes, IArchivePageVars>(ARCHIVE_PAGE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          listPage(exisingItems: { __ref: string }[] = []) {
            const item = cache.identify({ __ref: `Page:${data?.deleteCustomPage}` });
            return exisingItems.filter(({ __ref }) => __ref !== item);
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
