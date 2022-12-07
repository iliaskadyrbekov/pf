import React from 'react';

interface IMultipleMediaItemLayoutProps {
  uploadForm: React.ReactNode;
  removeIcon: React.ReactNode;
  dropRef?: React.RefObject<HTMLDivElement>;
  dragRef?: React.RefObject<HTMLDivElement>;
}

const classes = {
  wrapper: 'flex flex-col items-center',
  removeIcon: 'w-6 h-6 text-gray-400 mt-4 cursor-pointer',
};

const MultipleMediaItemLayout = ({ uploadForm, removeIcon, dropRef, dragRef }: IMultipleMediaItemLayoutProps) => {
  return (
    <div ref={dropRef}>
      <div className={classes.wrapper} ref={dragRef}>
        {uploadForm}
        {removeIcon ? <div className={classes.removeIcon}>{removeIcon}</div> : null}
      </div>
    </div>
  );
};

export default MultipleMediaItemLayout;
