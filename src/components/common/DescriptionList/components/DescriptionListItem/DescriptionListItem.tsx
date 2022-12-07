import React from 'react';
import DescriptionListItemLayout from './DescriptionListItemLayout';

type TGirdColsValue = `col-span-${number}`;

interface IDescriptionListItemProps {
  label: React.ReactNode;
  item: React.ReactNode;
  colSpan?: {
    default?: TGirdColsValue;
    sm?: TGirdColsValue;
    md?: TGirdColsValue;
    lg?: TGirdColsValue;
  };
}

const DescriptionListItem = ({ item, label, colSpan = { sm: 'col-span-1' } }: IDescriptionListItemProps) => {
  const colSpanClassName = Object.entries(colSpan)
    .map(([key, val]) => (key === 'default' ? val : `${key}:${val}`))
    .join(' ');

  return <DescriptionListItemLayout item={item} label={label} className={colSpanClassName} />;
};

export default DescriptionListItem;
