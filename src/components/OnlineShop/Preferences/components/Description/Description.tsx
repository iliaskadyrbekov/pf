import React from 'react';

import { BlockLayout } from '@components/common/Block';
import DescriptionLayout from './DescriptionLayout';
import { Input } from '@components/common/Input';
import { FileUploadFormField } from '@components/common/FormFields/FileUploadFormField';
import { ImageIcon } from '@components/Icons';
import { useShopPreferencesHeadImagePresignedUploadUrl } from './mutations/shopPreferencesHeadImagePresignedUploadUrl';
import { ShopContext } from 'src/context/ShopContext';
import { FormLangSwitcherField } from '@components/common/FormFields/FormLangSwitcherField';
import { FormLanguageContext, FormLanguageProvider } from 'src/context/FormLanguageContext';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';

const Description = () => {
  const { shop } = React.useContext(ShopContext);
  const { defaultLang, availableLangs } = React.useContext(FormLanguageContext);

  const { mutate: getPresignedUploadUrl } = useShopPreferencesHeadImagePresignedUploadUrl();

  const handleGetUploadImageUrl = React.useCallback(
    async (file: File) => {
      const { data } = await getPresignedUploadUrl({
        variables: { shopId: shop?.id, fileType: file.type, fileName: file.name },
      });

      return data?.shopPreferencesHeadImagePresignedUploadUrl;
    },
    [shop],
  );

  const handleUploadImage = React.useCallback((imageKey: string) => {
    return imageKey;
  }, []);

  return (
    <FormLanguageProvider availableLanguages={availableLangs} defaultLanguage={defaultLang}>
      <BlockLayout>
        <DescriptionLayout
          homepageTitle={
            <FormMultiLanguageField
              component={Input}
              label="Homepage title"
              name="homepageTitle"
              placeholder="Type here"
            />
          }
          homepageDescription={
            <FormMultiLanguageField
              component={Input}
              label="Homepage description"
              name="homepageDescription"
              placeholder="Type here"
            />
          }
          homepageHeadImage={
            <FileUploadFormField
              icon={<ImageIcon />}
              contentClassName="h-56"
              withCrop={true}
              processImage={handleUploadImage}
              getUploadLink={handleGetUploadImageUrl}
              accept="image/jpeg,image/png,image/gif"
              name="homepageHeadImage"
              label="Head image"
            />
          }
          langSwitcher={<FormLangSwitcherField />}
        />
      </BlockLayout>
    </FormLanguageProvider>
  );
};

export default Description;
