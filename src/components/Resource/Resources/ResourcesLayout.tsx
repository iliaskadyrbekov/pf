import React from 'react';

interface IResourcesLayoutProps {
  actions: React.ReactNode;
  children?: React.ReactNode;
}

const ResourcesLayout = ({ actions, children }: IResourcesLayoutProps) => {
  return (
    <div>
      {actions}
      {children}
    </div>
  );
};

export default ResourcesLayout;
