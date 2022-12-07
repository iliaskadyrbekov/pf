import React from 'react';

import { ImageIcon } from '@components/Icons';
import MainInfoLayout from './MainInfoLayout';
import { Input } from '@components/common/Input';
import { MediaContent } from '@components/common/MediaContent';
import { FileUploadFormField } from '@components/common/FormFields/FileUploadFormField';
import { FormLangSwitcherField } from '@components/common/FormFields/FormLangSwitcherField';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';

import { ShopContext } from 'src/context/ShopContext';
import { usePagePresignedContentImageUploadUrl, usePagePresignedHeadImageUploadUrl } from '../../mutations';

const MainInfo = () => {
  const { shop } = React.useContext(ShopContext);

  const { mutate: getUploadHeadImageUrl } = usePagePresignedHeadImageUploadUrl();
  const { mutate: getUploadContentImageUrl } = usePagePresignedContentImageUploadUrl();

  if (!shop) {
    return null;
  }

  const handleGetUploadHeadImageUrl = React.useCallback(
    async (file: File) => {
      const { data } = await getUploadHeadImageUrl({
        variables: { shopId: shop.id, fileType: file.type, fileName: file.name },
      });

      return data?.pagePresignedHeadImageUploadUrl;
    },
    [shop],
  );

  const handleUploadImage = React.useCallback((imageKey: string) => {
    return imageKey;
  }, []);

  const handleGetUploadContentImageUrl = React.useCallback(
    async (file: File) => {
      const { data } = await getUploadContentImageUrl({
        variables: { shopId: shop?.id, fileType: file.type, fileName: file.name },
      });

      return data?.pagePresignedContentImageUploadUrl;
    },
    [shop],
  );

  return (
    <MainInfoLayout
      name={<FormMultiLanguageField component={Input} label="Page name" name="name" />}
      description={<FormMultiLanguageField name="description" component={Input} label="Short description" />}
      headImage={
        <FileUploadFormField
          icon={<ImageIcon />}
          contentClassName="h-56"
          processImage={handleUploadImage}
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
