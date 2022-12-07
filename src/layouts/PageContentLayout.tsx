import React from 'react';

interface IPageContentLayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

const classes = {
  wrapper: 'w-full overflow-auto bg-gray-50 shadow',
  contentWrapper: 'p-8 pb-32',
  footerWrapper: 'sticky bottom-0 w-full z-[100]',
};

const PageContentLayout = ({ header, content }: IPageContentLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {header}
      <div className={classes.contentWrapper}>{content}</div>
      <div id="page-footer" className={classes.footerWrapper} />
    </div>
  );
};

export default PageContentLayout;
