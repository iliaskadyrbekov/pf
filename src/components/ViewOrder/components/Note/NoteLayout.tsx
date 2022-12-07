import React from 'react';

interface INoteLayoutProps {
  title: React.ReactNode;
  note: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-5 h-full',
  title: 'text-xl font-bold leading-normal text-gray-800',
};

const NoteLayout = ({ title, note }: INoteLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      {note}
    </div>
  );
};

export default NoteLayout;
