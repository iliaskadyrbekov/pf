import React from 'react';

interface ISettingsItemLayoutProps {
  description: React.ReactNode;
  form: React.ReactNode;
}

const classes = {
  wrapper: 'flex space-x-8',
  itemWrapper: 'flex-1',
};

const SettingsItemLayout = ({ description, form }: ISettingsItemLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.itemWrapper}>{description}</div>
      <div className={classes.itemWrapper}>{form}</div>
    </div>
  );
};

export default SettingsItemLayout;
