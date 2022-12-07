import React from 'react';

interface IFileUploadLayoutProps {
  image: React.ReactNode;
  label?: string;
  fileUpload: React.ReactNode;
  spinner: React.ReactNode;
  icon?: React.ReactNode;
  contentClassName?: string;
}

const classes = {
  wrapper: 'w-full',
  icon: 'mr-2',
  label: 'mb-1 flex items-center text-sm font-medium text-gray-700',
  content: 'relative',
  spinner: 'absolute h-12 w-12 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
};

const FileUploadLayout = ({
  label,
  icon,
  image,
  fileUpload,
  spinner,
  contentClassName = '',
}: IFileUploadLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.label}>
        {icon && <div className={classes.icon}>{icon}</div>}
        {label}
      </div>
      <div className={`${classes.content} ${contentClassName}`}>
        {fileUpload}
        {image}
        {spinner && <div className={classes.spinner}>{spinner}</div>}
      </div>
    </div>
  );
};

export default FileUploadLayout;
