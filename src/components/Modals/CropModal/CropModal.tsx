import React from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';

import { Button } from '@components/common';
import CropModalLayout from './CropModalLayout';
import { blobToFile, getCroppedImg } from './helpers';

interface ICropModalProps {
  aspect?: number;
  image: string;
  imageName: string;
  imageType: string;

  onClose(): void;
  onCompleteFile(file?: File): void;
}

const CropModal = ({ aspect, onClose, onCompleteFile, image, imageType, imageName }: ICropModalProps) => {
  const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(null);

  const onCropComplete = React.useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleComplete = async () => {
    if (croppedAreaPixels) {
      const blob = await getCroppedImg(image, imageType, croppedAreaPixels);

      if (blob) {
        onCompleteFile(blobToFile([blob], imageName));
      }
    }

    onClose();
  };

  return (
    <CropModalLayout
      title="Crop image"
      cropper={
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      }
      actions={[
        <Button variant="contained" color="default" key="1" onClick={onClose}>
          Close
        </Button>,
        <Button variant="contained" color="primary" key="2" onClick={handleComplete}>
          Complete
        </Button>,
      ]}
    />
  );
};

export default CropModal;
