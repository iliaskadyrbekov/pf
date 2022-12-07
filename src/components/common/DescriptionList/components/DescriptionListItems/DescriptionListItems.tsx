import React from 'react';

import DescriptionListItemsLayout from './DescriptionListItemsLayout';

type TGirdColsValue = `grid-cols-${number}`;

interface IDescriptionListItemsProps {
  children: React.ReactNode;
  gridCols?: {
    default?: TGirdColsValue;
    sm?: TGirdColsValue;
    md?: TGirdColsValue;
    lg?: TGirdColsValue;
  };
}

const DescriptionListItems = ({
  children,
  gridCols = { default: 'grid-cols-1', sm: 'grid-cols-2' },
}: IDescriptionListItemsProps) => {
  const gridColsClassName = Object.entries(gridCols)
    .map(([key, val]) => (key === 'default' ? val : `${key}:${val}`))
    .join(' ');

  return <DescriptionListItemsLayout className={gridColsClassName}>{children}</DescriptionListItemsLayout>;
};

export default DescriptionListItems;
