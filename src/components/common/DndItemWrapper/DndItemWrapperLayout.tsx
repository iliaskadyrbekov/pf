import React from 'react';

interface IDndItemWrapperLayoutProps {
  children: React.ReactNode;
  isOver: boolean;
}

const DndItemWrapperLayout = ({ children, isOver }: IDndItemWrapperLayoutProps) => {
  return (
    <div className="relative">
      {isOver && <div className="absolute -top-1 border-dashed w-full border-t border-gray-400" />}
      {children}
      {isOver && <div className="absolute -bottom-1 border-dashed mt-2 w-full border-t border-gray-400" />}
    </div>
  );
};

export default DndItemWrapperLayout;
