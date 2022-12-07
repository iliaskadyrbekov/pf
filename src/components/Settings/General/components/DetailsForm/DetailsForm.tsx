import React from 'react';
import { useMutation } from '@apollo/client';

import DetailsFormLayout from './DetailsFormLayout';
import { Input } from '@components/common/Input';
import { FormField } from '@components/common/FormFields/FormField';
import { FileUploadFormField } from '@components/common/FormFields/FileUploadFormField';
import {
  IShopLogoPresignedUploadUrl,
  IShopLogoPresignedUploadUrlVars,
  SHOP_LOGO_PRESIGNED_UPLOAD_URL,
} from './mutations/shopLogoPresignedUploadUrl';
import { ShopContext } from 'src/context/ShopContext';
import { Combobox } from '@components/common/Combobox';

interface IDetailsFormProps {
  currencyOptions: { id: string; name: string }[];
  timezoneOptions: { id: string; rawFormat: string; rawOffsetInMinutes: number }[];
}

const DetailsForm = ({ currencyOptions, timezoneOptions }: IDetailsFormProps) => {
  const { shop } = React.useContext(ShopContext);

  const currencyTransformedOptions = currencyOptions.map(({ id, name }) => ({
    value: id,
    label: `${name} (${id})`,
  }));

  const timezoneTransformedOptions = timezoneOptions
    .sort((a, b) => a.rawOffsetInMinutes - b.rawOffsetInMinutes)
    .map(({ id, rawFormat }) => ({
      value: id,
      label: rawFormat,
    }));

  const [getUploadImageUrl] = useMutation<IShopLogoPresignedUploadUrl, IShopLogoPresignedUploadUrlVars>(
    SHOP_LOGO_PRESIGNED_UPLOAD_URL,
  );

  const handleGetUploadImageUrl = React.useCallback(
    async (file: File) => {
      const { data } = await getUploadImageUrl({
        variables: { shopId: shop?.id, fileType: file.type, fileName: file.name },
      });

      return data?.shopLogoPresignedUploadUrl;
    },
    [shop],
  );

  const handleUploadImage = React.useCallback((imageKey: string) => {
    return imageKey;
  }, []);

  return (
    <DetailsFormLayout
      shopName={<FormField name="name" label="Shop name" component={Input} />}
      logo={
        <FileUploadFormField
          contentClassName="h-full"
          processImage={handleUploadImage}
          getUploadLink={handleGetUploadImageUrl}
          accept="image/jpeg,image/png,image/gif"
          name="logo"
          label="Logo"
        />
      }
      contactEmail={<FormField name="profile.contactEmail" label="Contact email" component={Input} />}
      senderEmail={
        <FormField name="profile.senderEmail" label="Notification for order confirmations" component={Input} />
      }
      timeZone={
        <FormField name="timezone" label="Timezone" options={timezoneTransformedOptions} component={Combobox} />
      }
      currency={
        <FormField name="currency" label="Currency" options={currencyTransformedOptions} component={Combobox} />
      }
      website={<FormField name="profile.website" label="Company website" component={Input} />}
    />
  );
};

export default DetailsForm;
