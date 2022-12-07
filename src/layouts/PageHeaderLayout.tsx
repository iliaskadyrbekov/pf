import React from 'react';

interface IPageHeaderLayoutProps {
  title: React.ReactNode;
  caption?: React.ReactNode;
  actions?: React.ReactNode;
  goBack?: React.ReactNode;
  status?: React.ReactNode | null;
}

const classes = {
  wrapper: 'bg-white shadow sticky top-0 z-[80] p-4',
  border: 'my-7 border border-dashed border-opacity-10',
  textWrapper: 'flex flex-col space-y-2',
  titleWrapper: 'flex items-center space-x-4',
  goBackWrapper: 'cursor-pointer',
  caption: 'text-xs font-medium leading-none text-gray-400',
  title: 'text-2xl font-bold leading-7 text-gray-900',
  headerWrapper: 'flex items-center justify-between',
  actionsWrapper: 'flex space-x-4 items-center',
};

const PageHeaderLayout = ({ goBack, title, status, caption, actions }: IPageHeaderLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.headerWrapper}>
        <div className={classes.textWrapper}>
          <div className={classes.titleWrapper}>
            {goBack && <div className={classes.goBackWrapper}>{goBack}</div>}
            <p className={classes.title}>{title}</p>
            {status}
          </div>
          {caption && <p className={classes.caption}>{caption}</p>}
        </div>
        <div className={classes.actionsWrapper} id="page-actions">
          {actions}
        </div>
      </div>
    </div>
  );
};

export default PageHeaderLayout;
