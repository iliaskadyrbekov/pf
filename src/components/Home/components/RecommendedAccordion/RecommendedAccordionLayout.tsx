import React from 'react';

interface IRecommendedAccordionLayoutProps {
  items: React.ReactNode;
}

const classses = {
  wrapper: 'divide-y divide-fuchsia-300 w-full bg-white shadow rounded-md',
};

const RecommendedAccordionLayout = ({ items }: IRecommendedAccordionLayoutProps) => {
  return <div className={classses.wrapper}>{items}</div>;
};

export default RecommendedAccordionLayout;
