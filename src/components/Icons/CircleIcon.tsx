import React from 'react';

interface ICircleIconProps {
  fill: string;
}

const CircleIcon = ({ fill }: ICircleIconProps) => {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="27" cy="27" r="27" fill={fill} />
    </svg>
  );
};

export default CircleIcon;
