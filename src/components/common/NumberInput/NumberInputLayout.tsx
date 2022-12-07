import React from 'react';

interface INumberInputLayoutProps {
  title: React.ReactNode;
  button: React.ReactNode;
}

const NumberInputLayout = ({ title, button }: INumberInputLayoutProps) => {
  return (
    <div>
      {title}
      {button}
    </div>
  );
};

export default NumberInputLayout;
