import React from 'react';
import { classNames } from '@utils/classNames';
import { Button } from '@components/common/Button';

interface IButtonCellProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  onClick: (id: string) => void;
}

const ButtonCell = ({ id, children, onClick, className }: IButtonCellProps) => {
  const handleClick = React.useCallback(() => {
    onClick(id);
  }, [id]);

  return (
    <td className={classNames(className)}>
      <Button onClick={handleClick}>{children}</Button>
    </td>
  );
};

export default ButtonCell;
