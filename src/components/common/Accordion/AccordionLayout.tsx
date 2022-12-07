import React from 'react';

interface IAccordionLayoutProps {
  title: React.ReactNode;
  toggle: React.ReactNode;
  content: React.ReactNode;
  caption?: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-4',
  title: 'text-lg font-medium leading-normal text-gray-700',
  caption: 'text-sm font-medium leading-tight text-gray-400',
  header: 'flex justify-between',
};

const AccordionLayout = ({ title, toggle, content, caption }: IAccordionLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div>
        <div className={classes.header}>
          <p className={classes.title}>{title}</p>
          <div>{toggle}</div>
        </div>
        {caption && <p className={classes.caption}>{caption}</p>}
      </div>
      {content}
    </div>
  );
};

export default AccordionLayout;
