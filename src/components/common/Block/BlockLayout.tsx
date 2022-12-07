import { classNames } from '@utils/classNames';
import React from 'react';

interface IBlockLayoutProps {
  title?: React.ReactNode;
  caption?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  error?: string[];
  previewRef?: any;
}

const classes = {
  wrapper: 'flex flex-col h-full bg-white rounded-md p-8 justify-between',
  header: 'mb-4',
  title: 'text-lg font-medium leading-normal text-gray-700',
  caption: 'text-sm font-medium leading-tight text-gray-400',
  error: 'border border-red-500',
};

const BlockLayout = ({ title, caption, children, className, error, previewRef }: IBlockLayoutProps) => {
  return (
    <>
      <div ref={previewRef} className={classNames(classes.wrapper, className, error && classes.error)}>
        {(title || caption) && (
          <div className={classes.header}>
            {title && <p className={classes.title}>{title}</p>}
            {caption && <p className={classes.caption}>{caption}</p>}
          </div>
        )}
        {children}
      </div>
      {!!error &&
        error.map((err, index) => (
          <div key={err + index} className="mt-1">
            <p className="text-xs text-red-500 text-left">{err}</p>
          </div>
        ))}
    </>
  );
};

export default BlockLayout;
