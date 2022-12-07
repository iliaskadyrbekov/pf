import React from 'react';

interface ITagLayoutProps {
  tag: string;
}

const classes = {
  wrapper: 'inline-flex items-center justify-center px-2.5 py-0.5 bg-blue-100 rounded mr-1.5',
  tag: 'text-xs font-medium text-center text-blue-800',
};

const TagLayout = ({ tag }: ITagLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <span className={classes.tag}>{tag}</span>
    </div>
  );
};

export default TagLayout;
