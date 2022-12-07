import { gql, useMutation } from '@apollo/client';

export interface IArchiveActivityVars {
  id: string;
  shopId?: string;
}

export interface IArchiveActivityRes {
  archiveActivity: string | null;
}

export const ARCHIVE_ACTIVITY = gql`
  mutation ArchiveActivity($shopId: ObjectId!, $id: ObjectId!) {
    archiveActivity(id: $id, shopId: $shopId)
  }
`;

export const useArchiveActivity = () => {
  const [mutate, { data, error, loading }] = useMutation<IArchiveActivityRes, IArchiveActivityVars>(ARCHIVE_ACTIVITY, {
    update(cache, { data }) {
      cache.evict({ id: `Activity:${data?.archiveActivity}` });
    },
  });

  return { mutate, data, error, loading };
};
