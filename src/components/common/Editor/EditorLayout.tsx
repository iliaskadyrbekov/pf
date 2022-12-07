import React from 'react';

interface IEditorLayoutProps {
  label: React.ReactNode;
  name: string;
  icon: React.ReactNode;
  editor: React.ReactNode;
}

const classes = {
  wrapper: 'w-full',
  label: 'flex items-center text-sm font-medium text-gray-700 mb-1',
  icon: 'mr-2',
};

const EditorLayout = ({ label, name, editor, icon }: IEditorLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {label && (
        <label htmlFor={name} className={classes.label}>
          {icon && <div className={classes.icon}>{icon}</div>}
          {label}
        </label>
      )}
      {editor}
    </div>
  );
};

export default EditorLayout;
