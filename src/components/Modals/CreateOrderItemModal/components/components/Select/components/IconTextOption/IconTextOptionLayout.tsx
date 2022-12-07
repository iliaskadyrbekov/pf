import React from 'react';

interface IIconTextOptionLayoutProps {
  title: React.ReactNode;
  button: React.ReactNode;
}

const IconTextOptionLayout = ({ title, button }: IIconTextOptionLayoutProps) => {
  return (
    <div>
      {title}
      {button}
    </div>
  );
};

export default IconTextOptionLayout;
