import { Button } from '@components/common/Button';
import { RefreshIcon } from '@components/Icons';
import React from 'react';
import { getS3FileUrl } from '@utils/getS3FileUrl';

interface IUploadedImageProps {
  url: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

const classes = {
  wrapper: 'absolute top-0 w-full h-full bg-gray-100',
  button: 'absolute top-4	left-4',
  image: 'w-full h-full object-contain',
};

const UploadedImage = ({ url, inputRef }: IUploadedImageProps) => {
  const handleClick = React.useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  return (
    <div className={classes.wrapper}>
      <Button className={classes.button} onClick={handleClick} icon={<RefreshIcon />}>
        Replace image
      </Button>
      <img className={classes.image} src={getS3FileUrl(url)} />
    </div>
  );
};

export default UploadedImage;
