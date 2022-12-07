import React from 'react';
import { ModalContext, ModalType } from 'src/context';

import { uploadS3 } from 'src/helpers';
import { useCustomField } from 'src/lib/useCustomField';
import { FileUpload } from '../../FileUpload';
import { IFileUploadProps } from '../../FileUpload/FileUpload';
import { ErrorMessage } from '../ErrorMessage';
import { fileToDataUrl } from './helpers';

export interface IUploadPresignedUrl {
  url: string;
  resourceKey: string;
  fields: { name: string; value: string }[];
}

interface IFileUploadFormFieldProps {
  withCrop?: boolean;
  getUploadLink: (file: File) => Promise<IUploadPresignedUrl | undefined>;
  processImage: (imageKey: string) => string | Promise<string | undefined>;
}

const NOT_CROPPABLE_TYPES = ['image/gif'];

const FileUploadFormField = (props: IFileUploadProps & IFileUploadFormFieldProps) => {
  const { handleOpenModal } = React.useContext(ModalContext);

  const [isLoading, setLoading] = React.useState(false);
  const [field, meta, { setValue, setError }] = useCustomField<string, string[]>(props.name);

  const { getUploadLink, processImage, withCrop, ...restProps } = props;
  const { apiError } = meta;

  const errors = [...(apiError || []), ...(meta.error || [])];

  const uploadFile = async (file?: File | null) => {
    field.onChange(file);

    if (file) {
      try {
        // TODO simplify logic
        setLoading(true);

        const uploadLink = await getUploadLink(file);

        if (uploadLink) {
          const { fields, url, resourceKey } = uploadLink;

          await uploadS3(url, fields, file);

          const imageUrl = await processImage(resourceKey);

          if (imageUrl) {
            setValue(imageUrl);
          }

          setLoading(false);

          return;
        }

        setValue('');
      } catch (err) {
        setLoading(false);
        setValue(field.value);
        setError('Something went wrong');
      }
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];

    if (!file) {
      return;
    }

    if (withCrop && !NOT_CROPPABLE_TYPES.includes(file.type)) {
      const image = await fileToDataUrl(file);

      handleOpenModal({
        type: ModalType.CROP,
        props: {
          aspect: 16 / 9,
          image,
          imageType: file.type,
          imageName: file.name,
          onCompleteFile: uploadFile,
        },
      });

      return;
    }

    return uploadFile(file);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <div className="items-start w-full">
      <FileUpload
        isLoading={isLoading}
        {...restProps}
        {...field}
        onChange={handleChange}
        isError={!!meta.error || !!meta.apiError}
      />
      {!!errors.length && <ErrorMessage message={errors} />}
    </div>
  );
};

export default FileUploadFormField;
