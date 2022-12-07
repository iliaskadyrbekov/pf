import React from 'react';

interface IHeadCellLayoutProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const HeadCellLayout = ({ children, style }: IHeadCellLayoutProps) => {
  return (
    <th
      scope="col"
      style={style}
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {children}
    </th>
  );
};

export default HeadCellLayout;
