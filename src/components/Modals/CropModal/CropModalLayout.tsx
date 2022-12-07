import React from 'react';

interface ICropModalLayoutProps {
  title: React.ReactNode;
  cropper: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 flex flex-col items-center space-y-8',
  title: 'text-lg font-medium leading-normal text-gray-900',
  cropper: 'relative w-[70vw] h-[70vh]',
  actionsWrapper: 'w-full flex justify-end flex-row space-x-4',
};

const CropModalLayout = ({ title, cropper, actions }: ICropModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.cropper}>{cropper}</div>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default CropModalLayout;
