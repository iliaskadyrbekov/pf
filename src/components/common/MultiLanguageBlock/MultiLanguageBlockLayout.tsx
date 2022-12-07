import React from 'react';

interface IMultiLanguageBlockProps {
  langSwitcher: React.ReactNode;
  children: React.ReactNode;
}

const classes = {
  wrapper: 'bg-white rounded-md p-8 space-y-8',
  contentWrapper: 'pr-16 w-full',
};

const MultiLanguageBlock = ({ children, langSwitcher }: IMultiLanguageBlockProps) => {
  return (
    <div className={classes.wrapper}>
      {langSwitcher}
      <div className={classes.contentWrapper}>{children}</div>
    </div>
  );
};

export default MultiLanguageBlock;
