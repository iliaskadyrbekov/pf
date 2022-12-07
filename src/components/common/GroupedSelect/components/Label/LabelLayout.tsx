import React from 'react';

interface ILabelLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'block text-sm leading-5 font-medium text-gray-700',
};

const LabelLayout = ({ children }: ILabelLayoutProps) => {
  return <label className={classes.wrapper}>{children}</label>;
};

export default LabelLayout;
