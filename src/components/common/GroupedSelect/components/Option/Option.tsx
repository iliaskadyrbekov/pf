import React from 'react';
import OptionLayout from './OptionLayout';

type TValueType = string | number;
type TValue = TValueType;

interface IOptionProps {
  children: React.ReactNode;
  onClick(value: TValue): void;
  value: TValue;
}

const Option = ({ children, onClick, value }: IOptionProps) => {
  const handleClick = () => {
    onClick(value);
  };

  return <OptionLayout onClick={handleClick}>{children}</OptionLayout>;
};

export default Option;
