import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const CLOUD_FRONT_URL = publicRuntimeConfig?.CLOUD_FRONT_URL;

export const getS3FileUrl = (fileKey?: string) => {
  return fileKey ? `${CLOUD_FRONT_URL}${fileKey}` : '';
};
