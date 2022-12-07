import React from 'react';

type TVariant = 'contained' | 'link';
type TColor = 'primary' | 'secondary' | 'default' | 'delete';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TVariant;
  color?: TColor;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const defaultClasses = {
  iconWrapper: '-ml-1 mr-3 h-5 w-5',
  contained:
    'disabled:opacity-50 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none',
  link: 'inline-flex items-center justify-center text-sm font-medium leading-tight',
};

const colorClasses: Record<TVariant, Record<TColor, string>> = {
  contained: {
    primary: 'text-white bg-indigo-600 hover:bg-indigo-700',
    secondary: 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200',
    default: 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300',
    delete: 'text-white bg-red-600 hover:bg-red-500',
  },
  link: {
    primary: 'text-indigo-600 hover:text-indigo-500',
    secondary: 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200',
    default: 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300',
    delete: 'text-red-600 hover:bg-red-200',
  },
};

const classes: Record<TVariant, (color: TColor) => string> = {
  contained: (color) => `${defaultClasses.contained} ${colorClasses['contained'][color]}`,
  link: (color) => `${defaultClasses.link} ${colorClasses['link'][color]}`,
};

const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'contained',
  color = 'default',
  className,
  icon,
  disabled,
  rightElement,
  ...rest
}: IButtonProps) => {
  const classname = `${classes[variant](color)}${className ? ` ${className}` : ''}`;

  return (
    <button className={classname} disabled={disabled} {...rest}>
      {icon && <div className={defaultClasses.iconWrapper}>{icon}</div>}
      {children}
      {rightElement}
    </button>
  );
};

export default Button;
