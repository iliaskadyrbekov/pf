import React from 'react';
import DescriptionListTitleLayout from './DescriptionListTitleLayout';

interface IDescriptionListTitleProps {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
}

const DescriptionListTitle = ({ title, subTitle }: IDescriptionListTitleProps) => {
  return <DescriptionListTitleLayout title={title} subTitle={subTitle} />;
};

export default DescriptionListTitle;
