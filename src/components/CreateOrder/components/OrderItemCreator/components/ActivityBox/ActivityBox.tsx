import React from 'react';
import ActivityBoxLayout from './ActivityBoxLayout';

interface IActivityBoxProps {
  id: string;
  name: string;
  imageUrl?: string;
  onClick(id: string): void;
}

const ActivityBox = ({ id, name, imageUrl, onClick }: IActivityBoxProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return <ActivityBoxLayout onClick={handleClick} name={name} imageUrl={imageUrl} />;
};

export default ActivityBox;
