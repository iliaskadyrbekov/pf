import React from 'react';

interface IVariationsLayoutProps {
  variationForm: React.ReactNode;
  table: React.ReactNode;
  addVariation: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-4',
};

const VariationsLayout = ({ variationForm, table, addVariation }: IVariationsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {variationForm}
      {table}
      {addVariation}
    </div>
  );
};

export default VariationsLayout;
