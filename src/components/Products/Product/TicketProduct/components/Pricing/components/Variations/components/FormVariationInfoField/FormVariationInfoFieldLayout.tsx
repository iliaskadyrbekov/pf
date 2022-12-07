import React from 'react';

interface IFormVariationInfoFieldProps {
  variationName: React.ReactNode;
}

const classes = {
  wrapper: 'flex space-x-6',
};

const FormVariationInfoField = ({ variationName }: IFormVariationInfoFieldProps) => {
  return <div className={classes.wrapper}>{variationName}</div>;
};

export default FormVariationInfoField;
