import React from 'react';

import { classNames } from '@utils/classNames';

const NewVATOption = ({ active, label }: { active: boolean; label: string }) => {
  return (
    <span className={classNames(active ? 'text-white' : 'text-indigo-600', 'text-sm leading-tight')}>{label}</span>
  );
};

export default NewVATOption;
