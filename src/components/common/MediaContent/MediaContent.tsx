import React from 'react';
import dynamic from 'next/dynamic';

import { Order } from '../Order';
import { Input } from '../Input';
import { Button } from '../Button';
import { FormField } from '../FormFields/FormField';
import MediaContentLayout from './MediaContentLayout';
import { ImageIcon, TextIcon, VideoIcon } from '@components/Icons';
import { FileUploadFormField } from '../FormFields/FileUploadFormField';
import { FormMultiLanguageField } from '../FormFields/FormMultiLanguageField';
const Editor = dynamic(() => import('../Editor/Editor'), { ssr: false });

import { FormLanguageContext } from 'src/context';
import { useCustomField } from 'src/lib/useCustomField';
import { getDefaultLanguageWithCountry } from 'src/helpers';
import { MediaContentType, TContentMedia } from 'src/shared/interfaces/MediaContent';

interface IUploadPresignedUrl {
  url: string;
  resourceKey: string;
  fields: { name: string; value: string }[];
}

interface IMediaContentProps {
  fieldName: string;
  handleGetUploadImageUrl: (file: File) => Promise<IUploadPresignedUrl | undefined>;
}

const MediaContent = ({ fieldName, handleGetUploadImageUrl }: IMediaContentProps) => {
  const { availableLangs } = React.useContext(FormLanguageContext);
  const [{ value: content }, , { setValue }] = useCustomField<TContentMedia[], string[]>(fieldName);

  const handleUploadImage = React.useCallback((imageKey: string) => {
    return imageKey;
  }, []);

  const getInputByType = React.useCallback(
    ({ type, order: elOrder }: TContentMedia) => {
      const index = content.findIndex(({ order }) => order === elOrder);
      const namePath = `content[${index}]`;

      switch (type) {
        case MediaContentType.IMAGE:
          return (
            <FileUploadFormField
              contentClassName="h-56"
              processImage={handleUploadImage}
              getUploadLink={handleGetUploadImageUrl}
              icon={<ImageIcon />}
              accept="image/jpeg,image/png,image/gif"
              name={`${namePath}.url`}
              label="Image"
            />
          );
        case MediaContentType.TEXT:
          return (
            <FormMultiLanguageField icon={<TextIcon />} name={`${namePath}.text`} component={Editor} label="Text" />
          );
        case MediaContentType.VIDEO:
          return <FormField icon={<VideoIcon />} name={`${namePath}.url`} component={Input} label="Video" />;
      }
    },
    [content],
  );

  const handleOrderChange = React.useCallback((items: TContentMedia[]) => {
    setValue(items.map((i, index) => ({ ...i, order: index })));
  }, []);

  const handleAddContent = React.useCallback(
    (type: MediaContentType) => () => {
      const isText = type === MediaContentType.TEXT;
      const defaultText = getDefaultLanguageWithCountry(availableLangs);
      const newItemValue = isText ? { text: defaultText } : { url: '' };

      const lastOrder = content[content.length - 1]?.order || 0;
      const newItems = [...content, { type, order: lastOrder + 1, ...newItemValue }];

      setValue(newItems);
    },
    [content, setValue, availableLangs],
  );

  const sortedItems = [...content].sort((a, b) => a.order - b.order);

  return (
    <MediaContentLayout
      contentItems={
        <Order<TContentMedia> items={sortedItems} renderItem={getInputByType} onOrderChange={handleOrderChange} />
      }
      actions={[
        <Button
          onClick={handleAddContent(MediaContentType.TEXT)}
          key="1"
          variant="contained"
          color="secondary"
          icon={<TextIcon />}
        >
          Add text
        </Button>,
        <Button
          onClick={handleAddContent(MediaContentType.IMAGE)}
          key="2"
          variant="contained"
          color="secondary"
          icon={<ImageIcon />}
        >
          Add image
        </Button>,
        <Button
          onClick={handleAddContent(MediaContentType.VIDEO)}
          key="3"
          variant="contained"
          color="secondary"
          icon={<VideoIcon />}
        >
          Add video
        </Button>,
      ]}
    />
  );
};

export default MediaContent;
