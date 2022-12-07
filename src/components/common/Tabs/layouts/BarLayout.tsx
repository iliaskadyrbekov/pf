import React from 'react';

interface IBarLayoutProps {
  children: React.ReactNode;
}

const BarLayout = ({ children }: IBarLayoutProps) => {
  return <nav className="relative z-10 rounded-lg shadow flex divide-x divide-gray-200">{children}</nav>;
};

export default BarLayout;
