import React from 'react';

interface ICreateResourceActionLayoutProps {
  children: React.ReactNode;
}

const CreateResourceActionLayout = ({ children }: ICreateResourceActionLayoutProps) => {
  return (
    <div className="mt-4 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="relative bg-white">{children}</div>
    </div>
  );
};

export default CreateResourceActionLayout;
