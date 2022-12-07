import React from 'react';

import { Header } from '@components/Header';
import { Menu, MENU_ITEMS } from '@components/Menu';
import { LogoIcon } from '@components/Icons';
import { HeadTag } from '@components/common/Head';

interface ICustomSubMenuProps {
  onMenuClick: (menuItem: string, path?: string) => void;
  currentSubMenuItem: string;
}

interface IAppLayoutProps {
  CustomSubMenu?: (props: ICustomSubMenuProps) => JSX.Element;
  SubMenu?: React.ReactNode;
  menuItem?: MENU_ITEMS;
  children: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-row h-full',
  mainMenuWrapper: 'flex flex-col',
  logoWrapper: 'flex items-center justify-center bg-indigo-500 w-full h-16',
  content: 'flex flex-col w-full',
  headerWrapper: 'z-[90] shadow',
  componentsWrapper: 'flex h-full overflow-hidden',
  navigationWrapper: 'flex',
};

const AppLayout = ({ children, menuItem, SubMenu }: IAppLayoutProps) => {
  return (
    <React.Fragment>
      <HeadTag />
      <div className={classes.wrapper}>
        <div className={classes.mainMenuWrapper}>
          <div className={classes.logoWrapper}>
            <LogoIcon />
          </div>
          <Menu menuItem={menuItem} />
        </div>
        <div className={classes.content}>
          <div className={classes.headerWrapper}>
            <Header />
          </div>
          <div className={classes.componentsWrapper}>
            {SubMenu && <div className={classes.navigationWrapper}>{SubMenu}</div>}
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppLayout;
