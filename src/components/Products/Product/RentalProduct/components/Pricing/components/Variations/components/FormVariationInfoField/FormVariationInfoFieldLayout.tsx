import React from 'react';

interface IFormVariationInfoFieldProps {
  variationName: React.ReactNode;
  duration: React.ReactNode;
}

const classes = {
  wrapper: 'flex space-x-6',
};

const FormVariationInfoField = ({ variationName, duration }: IFormVariationInfoFieldProps) => {
  return (
    <div className={classes.wrapper}>
      {variationName}
      {duration}
    </div>
  );
};

export default FormVariationInfoField;
