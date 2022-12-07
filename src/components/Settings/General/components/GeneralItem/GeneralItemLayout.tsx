import React from 'react';

interface IGeneralItemLayoutProps {
  description: React.ReactNode;
  form: React.ReactNode;
}

const classes = {
  wrapper: 'xl:flex xl:space-x-8 space-y-6 xl:space-y-0',
  descWrapper: 'flex-1',
  formWrapper: 'flex-2',
};

const GeneralItemLayout = ({ description, form }: IGeneralItemLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.descWrapper}>{description}</div>
      <div className={classes.formWrapper}>{form}</div>
    </div>
  );
};

export default GeneralItemLayout;
