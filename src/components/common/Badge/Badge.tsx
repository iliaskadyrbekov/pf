import { classNames } from '@utils/classNames';
import React from 'react';

export type TColor = 'gray' | 'red' | 'blue' | 'indigo' | 'purple' | 'pink' | 'yellow' | 'green';
type TVariant = 'contained' | 'text';

interface IBadgeProps {
  children: React.ReactNode;
  color: TColor;
  variant?: TVariant;
  className?: string;
}

const classes = {
  contained: (color: TColor) => `items-center px-3 py-0.5 rounded-full text-sm font-medium ${containedClasses[color]}`,
  text: (color: TColor) => `text-sm leading-tight ${textClasses[color]}`,
};

const containedClasses: Record<TColor, string> = {
  gray: 'text-gray-800 bg-gray-100',
  red: 'text-red-800 bg-red-100',
  blue: 'text-blue-800 bg-blue-100',
  indigo: 'text-indigo-800 bg-indigo-100',
  purple: 'text-purple-800 bg-purple-100',
  pink: 'text-pink-800 bg-pink-100',
  yellow: 'text-yellow-800 bg-yellow-100',
  green: 'text-green-800 bg-green-100',
};

const textClasses: Record<TColor, string> = {
  gray: 'text-gray-500',
  red: 'text-red-500',
  blue: 'text-blue-500',
  indigo: 'text-indigo-500',
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  yellow: 'text-yellow-500',
  green: 'text-green-500',
};

const Badge = ({ children, color, variant = 'text', className }: IBadgeProps) => {
  return <span className={classNames(classes[variant](color), className)}>{children}</span>;
};

export default Badge;
