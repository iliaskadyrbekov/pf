import React from 'react';

interface IIconWithTextCellLayoutProps {
  text?: string;
  icon: React.ReactNode;
}

const classes = {
  wrapper: 'flex items-center space-x-2 px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900',
};

const IconWithTextCellLayout = ({ icon, text }: IIconWithTextCellLayoutProps) => {
  return (
    <td className={classes.wrapper}>
      {icon}
      <span>{text}</span>
    </td>
  );
};

export default IconWithTextCellLayout;
