import React from 'react';

interface ISpecificationItemLayoutProps {
  value: string;
}

const classes = {
  wrapper: 'list-disc list-inside text-gray-400',
  value: 'relative left-[-0.625rem] text-sm xl:text-base leading-snug',
};

const SpecificationItemLayout = ({ value }: ISpecificationItemLayoutProps) => {
  return (
    <li className={classes.wrapper}>
      <span className={classes.value}>{value}</span>
    </li>
  );
};

export default SpecificationItemLayout;
