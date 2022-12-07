import React from 'react';
import ButtonLayout from './ButtonLayout';

interface IButtonProps {
  children: React.ReactNode;
  onClick(): void;
}

const Button = ({ children, onClick }: IButtonProps) => {
  return <ButtonLayout onClick={onClick}>{children}</ButtonLayout>;
};

export default Button;
