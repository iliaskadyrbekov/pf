import { gql, useMutation } from '@apollo/client';

export type IArchiveNewsRes = {
  deleteNews: string;
};

export interface IArchiveNewsVars {
  id: string;
  shopId: string;
}

export const ARCHIVE_NEWS = gql`
  mutation ArchiveNews($shopId: ObjectId!, $id: ObjectId!) {
    deleteNews(shopId: $shopId, id: $id)
  }
`;

export const useArchiveNews = () => {
  const [mutate, { data, loading, error }] = useMutation<IArchiveNewsRes, IArchiveNewsVars>(ARCHIVE_NEWS, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          listNews(exisingItems: { __ref: string }[] = []) {
            const item = cache.identify({ __ref: `News:${data?.deleteNews}` });
            return exisingItems.filter(({ __ref }) => __ref !== item);
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
