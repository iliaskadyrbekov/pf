import React from 'react';

import MainInfoLayout from './MainInfoLayout';
import { ImageIcon } from '@components/Icons';
import { EmojiPicker } from '@components/EmojiPicker';
import {
  Input,
  FormField,
  MediaContent,
  FileUploadFormField,
  FormLangSwitcherField,
  FormMultiLanguageField,
} from '@components/common';

import { ShopContext } from 'src/context/ShopContext';
import {
  useActivityPresignedContentImageUploadUrl,
  useActivityPresignedHeadImageUploadUrl,
  useSetActivityHeadImage,
} from '../../mutations';

interface IMainInfoProps {
  activityId: string;
}

const MainInfo = ({ activityId }: IMainInfoProps) => {
  const { shop } = React.useContext(ShopContext);

  const [uploadActivityHeadImage] = useSetActivityHeadImage();
  const [getUploadHeadImageUrl] = useActivityPresignedHeadImageUploadUrl();
  const [getUploadContentImageUrl] = useActivityPresignedContentImageUploadUrl();

  const handleGetUploadHeadImageUrl = React.useCallback(
    async (file: File) => {
      const { data } = await getUploadHeadImageUrl({
        variables: { shopId: shop?.id, fileType: file.type, fileName: file.name },
      });

      return data?.activityPresignedHeadImageUploadUrl;
    },
    [shop],
  );

  const handleUploadHeadImage = React.useCallback(
    async (imageKey: string) => {
      const { data } = await uploadActivityHeadImage({
        variables: { shopId: shop?.id, activityId, imageKey },
      });

      return data?.setActivityHeadImage;
    },
    [activityId],
  );

  const handleGetUploadContentImageUrl = React.useCallback(
    async (file: File) => {
      const { data } = await getUploadContentImageUrl({
        variables: { shopId: shop?.id, fileType: file.type, fileName: file.name },
      });

      return data?.activityPresignedContentImageUploadUrl;
    },
    [shop],
  );

  return (
    <MainInfoLayout
      name={<FormMultiLanguageField component={Input} label="Activity name" name="name" />}
      icon={<FormField name="icon" label="Choose icon" component={EmojiPicker} />}
      description={<FormMultiLanguageField name="description" component={Input} label="Short description" />}
      headImage={
        <FileUploadFormField
          icon={<ImageIcon />}
          withCrop={true}
          contentClassName="h-56"
          processImage={handleUploadHeadImage}
          getUploadLink={handleGetUploadHeadImageUrl}
          accept="image/jpeg,image/png,image/gif"
          name="headImage"
          label="Head image"
        />
      }
      langSwitcher={<FormLangSwitcherField />}
      content={<MediaContent fieldName="content" handleGetUploadImageUrl={handleGetUploadContentImageUrl} />}
    />
  );
};

export default MainInfo;
