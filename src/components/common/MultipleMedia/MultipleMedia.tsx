import React from 'react';
import { DndProvider } from 'react-dnd';
import { TrashIcon } from '@heroicons/react/outline';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { MultipleMediaItem } from './components';
import MultipleMediaLayout from './MultipleMediaLayout';
import { BlockLayout, FileUploadFormField } from '@components/common';
import { MultipleFileUploadInput, MultipleUploadedImage } from '@components/common/FileUpload/components';

import { IMultipleMedia } from 'src/shared/interfaces';
import { IUploadPresignedUrl } from '../FormFields/FileUploadFormField/FileUploadFormField';

interface IMultipleMediaProps {
  value: IMultipleMedia[];
  maxCountMedia: number;
  onChange: (media: IMultipleMedia[]) => void;
  handleUploadImage: (imageKey: string) => string | Promise<string | undefined>;
  handleGetUploadImageUrl: (file: File) => Promise<IUploadPresignedUrl | undefined>;
}

const MultipleMedia = ({
  onChange,
  value: media,
  maxCountMedia,
  handleUploadImage,
  handleGetUploadImageUrl,
}: IMultipleMediaProps) => {
  const removeMedia = React.useCallback(
    (removeIndex: number) => {
      const isMain = media.find((item) => item.order === removeIndex)?.isMain;

      const result = Array.from(media);
      result.splice(removeIndex, 1);

      const orderedResult = result.map((el, index) => ({ ...el, order: index }));

      if (isMain) {
        orderedResult[0].isMain = true;
      }

      onChange(orderedResult);
    },
    [media, onChange],
  );

  const handleChangeMainImage = React.useCallback(
    (currentOrder: number) => {
      const result = media.map((item) => ({ ...item, isMain: item.order === currentOrder }));

      onChange(result);
    },
    [media, onChange],
  );

  const handleMoveColumn = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const result = Array.from(media);
      const [removed] = result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, removed);

      const orderedResult = result.map((el, index) => ({ ...el, order: index }));

      onChange(orderedResult);
    },
    [media, onChange],
  );

  React.useEffect(() => {
    const isNotUploadedMedia = media.find((item) => !item.key);
    if (isNotUploadedMedia || media.length >= maxCountMedia) {
      return;
    }

    onChange([...media, { isMain: !media.length, order: media.length, key: '' }]);
  }, [media]);

  return (
    <BlockLayout title="Media" className="w-full">
      <DndProvider backend={HTML5Backend}>
        <MultipleMediaLayout>
          {media.map((item, index) => (
            <MultipleMediaItem
              index={index}
              isDND={Boolean(item.key)}
              moveColumn={handleMoveColumn}
              removeIcon={item.key ? <TrashIcon onClick={() => removeMedia(item.order)} /> : null}
              uploadForm={
                <FileUploadFormField
                  name={`media[${item.order}].key`}
                  processImage={handleUploadImage}
                  getUploadLink={handleGetUploadImageUrl}
                  accept="image/jpeg,image/png,image/gif"
                  renderUploadedContent={(value, ref) => (
                    <MultipleUploadedImage
                      ref={ref}
                      url={value}
                      onChangeMainImage={() => handleChangeMainImage(item.order)}
                      classNames={item.isMain ? 'rounded-lg border-[#4F49F5] border-[0.2rem]' : ''}
                    />
                  )}
                  renderUploadInput={(ref, restProps) => <MultipleFileUploadInput ref={ref} {...restProps} />}
                />
              }
              key={item.order}
            />
          ))}
        </MultipleMediaLayout>
      </DndProvider>
    </BlockLayout>
  );
};

export default MultipleMedia;
