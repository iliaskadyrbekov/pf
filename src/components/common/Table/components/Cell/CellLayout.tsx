import { classNames } from '@utils/classNames';
import React from 'react';

interface ICellLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const classes = {
  td: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
};

const CellLayout = ({ children, className }: ICellLayoutProps, ref: React.Ref<HTMLTableCellElement>) => {
  return (
    <td ref={ref} className={classNames(classes.td, className)}>
      {children}
    </td>
  );
};

export default React.forwardRef(CellLayout);
