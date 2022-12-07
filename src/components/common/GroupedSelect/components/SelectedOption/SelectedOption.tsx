import React from 'react';

interface ISelectedOptionProps {
  children: React.ReactNode;
}

const SelectedOption = ({ children }: ISelectedOptionProps) => {
  return <span className="block truncate">{children}</span>;
};

export default SelectedOption;
