import React from 'react';

import { classNames } from '@utils/classNames';

interface ISimpleOptionProps {
  value: string | number;
  label: string;
  selected: boolean;
  active: boolean;
  disabled: boolean;
}

const SimpleOption = ({ label, selected }: ISimpleOptionProps) => {
  return <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate pr-4')}>{label}</span>;
};

export default SimpleOption;
