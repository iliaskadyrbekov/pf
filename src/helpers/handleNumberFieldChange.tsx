import React from 'react';

export const handleNumberFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value && parseInt(e.target.value);
  return !value || isNaN(value as number) ? 0 : value;
};
