import React, { RefObject } from 'react';

import { Spinner } from '../Spinner';
import FileUploadLayout from './FileUploadLayout';
import { FileUploadInput, UploadedImage } from './components';

interface IFileUploadRestProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  isError?: boolean;
}

export interface IFileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  value?: string;
  isError?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  contentClassName?: string;
  renderUploadInput?: (uploadInputRef: RefObject<HTMLInputElement>, rest: IFileUploadRestProps) => React.ReactNode;
  renderUploadedContent?: (value: string, uploadInputRef: RefObject<HTMLInputElement>) => React.ReactNode;
}

const FileUpload = ({
  label,
  value,
  isLoading,
  icon,
  contentClassName,
  renderUploadInput,
  renderUploadedContent,
  ...rest
}: IFileUploadProps) => {
  const uploadInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <FileUploadLayout
      icon={icon}
      label={label}
      spinner={isLoading && <Spinner />}
      contentClassName={contentClassName}
      fileUpload={
        renderUploadInput ? renderUploadInput(uploadInputRef, rest) : <FileUploadInput ref={uploadInputRef} {...rest} />
      }
      image={
        !isLoading && value ? (
          renderUploadedContent ? (
            renderUploadedContent(value, uploadInputRef)
          ) : (
            <UploadedImage url={value} inputRef={uploadInputRef} />
          )
        ) : null
      }
    />
  );
};

export default FileUpload;
