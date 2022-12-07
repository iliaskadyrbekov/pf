import React from 'react';

import { MenuItemLayout, MenuGroupLayout } from './components';
import MenuLayout from './MenuLayout';
import { MENU_ITEMS, MENU_TREE } from './constants';

interface IMenuProps {
  menuItem?: MENU_ITEMS;
}

const Menu = ({ menuItem }: IMenuProps) => {
  return (
    <MenuLayout
      menuItems={MENU_TREE.map(({ items }, index) => (
        <MenuGroupLayout
          key={index}
          groupItems={items.map(({ name, OutlineIcon, SolidIcon, link }, index) => (
            <MenuItemLayout
              key={index}
              link={link}
              icon={menuItem === name ? <SolidIcon /> : <OutlineIcon />}
              name={name}
              isActive={menuItem === name}
            />
          ))}
        />
      ))}
    />
  );
};

export default Menu;
