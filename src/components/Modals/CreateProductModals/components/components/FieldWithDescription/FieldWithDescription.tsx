import React from 'react';
import FieldWithDescriptionLayout from './FieldWithDescriptionLayout';

interface IFieldWithDescriptionProps {
  field: React.ReactNode;
  description: React.ReactNode;
}

const FieldWithDescription = ({ field, description }: IFieldWithDescriptionProps) => {
  return <FieldWithDescriptionLayout field={field} description={description} />;
};

export default FieldWithDescription;
