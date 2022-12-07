import React from 'react';
import LabelLayout from './LabelLayout';

interface ILabelProps {
  children: React.ReactNode;
}

const Label = ({ children }: ILabelProps) => {
  return <LabelLayout>{children}</LabelLayout>;
};

export default Label;
