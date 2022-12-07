import React from 'react';

interface IContentWithDescriptionLayoutProps {
  title: string;
  description: string;
  content: React.ReactNode;
}

const classes = {
  wrapper: 'xl:flex xl:space-x-12 space-y-6 xl:space-y-0',
  descriptionBlock: 'flex flex-col w-72 2xl:w-80 space-y-2',
  contentBlock: 'flex-1',
  title: 'text-lg font-medium leading-tight text-gray-700',
  description: 'text-sm font-medium leading-tight text-gray-700',
};

const ContentWithDescriptionLayout = ({ title, description, content }: IContentWithDescriptionLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.descriptionBlock}>
        <p className={classes.title}>{title}</p>
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes.contentBlock}>{content}</div>
    </div>
  );
};

export default ContentWithDescriptionLayout;
