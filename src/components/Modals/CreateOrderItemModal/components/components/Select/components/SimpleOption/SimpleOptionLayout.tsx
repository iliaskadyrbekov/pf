import React from 'react';

interface ISimpleOptionLayoutProps {
  title: React.ReactNode;
  button: React.ReactNode;
}

const SimpleOptionLayout = ({ title, button }: ISimpleOptionLayoutProps) => {
  return (
    <div>
      {title}
      {button}
    </div>
  );
};

export default SimpleOptionLayout;
