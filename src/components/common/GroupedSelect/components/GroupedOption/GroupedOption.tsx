import React from 'react';
import GroupedOptionLayout from './GroupedOptionLayout';

type TValueType = string | number;
type TValue = TValueType[];

interface IGroupedOptionProps {
  children: React.ReactNode;
  onClick(value: TValue): void;
  value: TValue;
}

const GroupedOption = ({ children, onClick, value }: IGroupedOptionProps) => {
  const handleClick = () => {
    onClick(value);
  };

  return <GroupedOptionLayout onClick={handleClick}>{children}</GroupedOptionLayout>;
};

export default GroupedOption;
