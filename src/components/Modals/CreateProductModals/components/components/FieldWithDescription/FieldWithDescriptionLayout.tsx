import React from 'react';

interface IFieldWithDescriptionLayoutProps {
  field: React.ReactNode;
  description: React.ReactNode;
}

const classes = {
  wrapper: 'flex items-end space-x-10',
  fieldWrapper: 'flex-1',
  description: 'flex-1 text-sm font-medium leading-tight text-gray-500',
};

const FieldWithDescriptionLayout = ({ field, description }: IFieldWithDescriptionLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.fieldWrapper}>{field}</div>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default FieldWithDescriptionLayout;
