import React from 'react';

interface ISettingsLayoutProps {
  children: React.ReactNode[];
}

const classes = {
  wrapper: 'grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4',
};

const SettingsLayout = ({ children }: ISettingsLayoutProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default SettingsLayout;
