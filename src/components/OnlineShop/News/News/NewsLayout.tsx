import React from 'react';

interface INewsLayoutProps {
  table: React.ReactNode;
  actions: React.ReactNode;
}

const NewsLayout = ({ actions, table }: INewsLayoutProps) => {
  return (
    <React.Fragment>
      {actions}
      {table}
    </React.Fragment>
  );
};

export default NewsLayout;
