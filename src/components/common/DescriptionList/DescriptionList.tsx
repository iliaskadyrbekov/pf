import React from 'react';
import DescriptionListLayout from './DescriptionListLayout';

interface IDescriptionListProps {
  children: React.ReactNode;
  className?: string;
}

const DescriptionList = ({ children, className }: IDescriptionListProps) => {
  return <DescriptionListLayout className={className}>{children}</DescriptionListLayout>;
};

export default DescriptionList;
