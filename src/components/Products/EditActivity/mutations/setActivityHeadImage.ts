import { gql, useMutation } from '@apollo/client';

export interface ISetActivityHeadImagedUrlVars {
  imageKey: string;
  activityId: string;
  shopId?: string;
}

export interface ISetActivityHeadImagedUrl {
  setActivityHeadImage: string;
}

export const SET_ACTIVITY_HEAD_IMAGE = gql`
  mutation SetActivityHeadImage($activityId: String!, $shopId: String!, $imageKey: String!) {
    setActivityHeadImage(activityId: $activityId, shopId: $shopId, imageKey: $imageKey)
  }
`;

export const useSetActivityHeadImage = () => {
  return useMutation<ISetActivityHeadImagedUrl, ISetActivityHeadImagedUrlVars>(SET_ACTIVITY_HEAD_IMAGE);
};
