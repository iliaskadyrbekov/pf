import React from 'react';
import { classNames } from '@utils/classNames';

interface ICellLayoutProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  className?: string;
}

const CellLayout = ({ children, className, align = 'left' }: ICellLayoutProps) => {
  return (
    <td className={classNames('py-2 pr-4', className)} align={align}>
      {children}
    </td>
  );
};

export default CellLayout;
