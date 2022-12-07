import React from 'react';

interface IPlaceholderProps {
  children: React.ReactNode;
}

const Placeholder = ({ children }: IPlaceholderProps) => {
  return <span className="opacity-50">{children}</span>;
};

export default Placeholder;
