import React from 'react';

interface ICustomPagesLayoutProps {
  table: React.ReactNode;
  actions: React.ReactNode;
}

const CustomPagesLayout = ({ actions, table }: ICustomPagesLayoutProps) => {
  return (
    <React.Fragment>
      {actions}
      {table}
    </React.Fragment>
  );
};

export default CustomPagesLayout;
