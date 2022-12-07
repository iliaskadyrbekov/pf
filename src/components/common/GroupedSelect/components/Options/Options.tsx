import React from 'react';
import OptionsLayout from './OptionsLayout';

interface IOptionsProps {
  children: React.ReactNode;
}

const Options = ({ children }: IOptionsProps) => {
  return <OptionsLayout>{children}</OptionsLayout>;
};

export default Options;
