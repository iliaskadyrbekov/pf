import React from 'react';
import { RefreshIcon } from '@components/Icons';

import { getS3FileUrl } from '@utils/getS3FileUrl';

interface IMultipleUploadedImageProps {
  url: string;
  ref: React.RefObject<HTMLInputElement>;
  onChangeMainImage: () => void;
  classNames: string;
}

const classes = {
  wrapper: 'absolute top-0 w-16 h-16 cursor-pointer',
  button: 'flex justify-center items-center absolute top-1 left-1 h-4 w-4 bg-gray-100 p-0.5 rounded',
  image: (classNames: string) => `${classNames} rounded-lg h-full w-full object-center object-cover`,
};

const MultipleUploadedImage = React.forwardRef(
  ({ url, onChangeMainImage, classNames }: IMultipleUploadedImageProps, ref: React.Ref<HTMLInputElement>) => {
    const handleClick = React.useCallback(
      (event) => {
        event.stopPropagation();

        (ref as React.RefObject<HTMLInputElement>).current?.click();
      },
      [ref],
    );

    return (
      <div className={classes.wrapper} onClick={onChangeMainImage}>
        <div className={classes.button} onClick={handleClick}>
          <RefreshIcon />
        </div>
        <img className={classes.image(classNames)} src={getS3FileUrl(url)} />
      </div>
    );
  },
);

MultipleUploadedImage.displayName = 'MultipleUploadedImage';

export default MultipleUploadedImage;
