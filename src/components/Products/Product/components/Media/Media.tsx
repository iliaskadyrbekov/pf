import React from 'react';
import { useRouter } from 'next/router';

import MediaLayout from './MediaLayout';
import { ImageIcon } from '@components/Icons';
import { BlockLayout, FileUploadFormField } from '@components/common';

import { ShopContext } from 'src/context/ShopContext';
import { useProductMediaPresignedUploadUrl } from './mutations';

const Media = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);

  const { mutate: getPresignedUploadUrl } = useProductMediaPresignedUploadUrl();

  const handleGetUploadImageUrl = React.useCallback(
    async (file: File) => {
      const { data } = await getPresignedUploadUrl({
        variables: {
          productId: router.query.productId as string,
          shopId: shop?.id,
          fileType: file.type,
          fileName: file.name,
        },
      });

      return data?.productMediaPresignedUploadUrl;
    },
    [shop],
  );

  const handleUploadImage = React.useCallback((imageKey: string) => {
    return imageKey;
  }, []);

  return (
    <BlockLayout>
      <MediaLayout
        media={
          <FileUploadFormField
            icon={<ImageIcon />}
            contentClassName="h-56"
            processImage={handleUploadImage}
            getUploadLink={handleGetUploadImageUrl}
            accept="image/jpeg,image/png,image/gif"
            name="media"
            label="Media"
          />
        }
      />
    </BlockLayout>
  );
};

export default Media;
