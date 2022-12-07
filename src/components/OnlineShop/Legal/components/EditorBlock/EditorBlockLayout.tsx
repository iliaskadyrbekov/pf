import React from 'react';

interface IEditorBlockLayoutProps {
  title: React.ReactNode;
  description: React.ReactNode;
  editor: React.ReactNode;
  langSwitcher: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-8',
  contentWrapper: 'flex flex-col space-y-5',
  textWrapper: 'flex flex-col space-y-2',
  title: 'text-sm font-medium leading-tight text-gray-700',
  description: 'text-sm leading-tight text-gray-700',
};

const EditorBlockLayout = ({ title, description, editor, langSwitcher }: IEditorBlockLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {langSwitcher}
      <div className={classes.contentWrapper}>
        <div className={classes.textWrapper}>
          <p className={classes.title}>{title}</p>
          <p className={classes.description}>{description}</p>
        </div>
        {editor}
      </div>
    </div>
  );
};

export default EditorBlockLayout;
