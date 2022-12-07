import React from 'react';

type TIconVariant = 'default' | 'buyers';

interface IIconWithTextLayoutProps {
  text: string;
  icon?: React.ReactNode;
  iconVariant?: TIconVariant;
  classNames?: string;
}

const iconVariantClasses: Record<TIconVariant, string> = {
  default: 'mr-1.5',
  buyers: 'text-[#4A4D61] mr-4',
};

const commonClasses = {
  icon: 'h-5 w-5',
};

const IconWithTextLayout = ({ icon, text, iconVariant = 'default', classNames = '' }: IIconWithTextLayoutProps) => {
  const className = `${commonClasses.icon} ${iconVariantClasses[iconVariant]} ${classNames}`;
  return (
    <>
      {icon && <div className={className}>{icon}</div>}
      {text}
    </>
  );
};

export default IconWithTextLayout;
