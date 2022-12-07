import React from 'react';

import SubMenuLayout from './SubMenuLayout';
import { SubMenuItemLayout, SubMenuGroupLayout } from './components';
import { SUB_MENU_TREE, SUB_MENU_ITEMS } from './constants';
import { MENU_ITEMS } from '@components/Menu';

interface ISubMenuProps {
  menuItem: MENU_ITEMS;
  subMenuItem?: SUB_MENU_ITEMS;
}

const SubMenu: React.FC<ISubMenuProps> = ({ subMenuItem, menuItem }: ISubMenuProps) => {
  return (
    <SubMenuLayout
      group={
        <SubMenuGroupLayout
          title="Groups"
          items={SUB_MENU_TREE[menuItem]?.map(({ Icon, name, link }, index) => (
            <SubMenuItemLayout key={index} link={link} icon={<Icon />} name={name} isActive={subMenuItem === name} />
          ))}
        />
      }
    />
  );
};

export default SubMenu;
