import Link from 'next/link';
import React from 'react';

interface IIndigoLinkLayoutProps {
  icon: React.ReactNode;
  text: React.ReactNode;
  link: string;
}

const classes = {
  wrapper: 'flex space-x-3 items-center justify-center px-4 py-2 bg-indigo-50 shadow rounded-full cursor-pointer',
  text: 'text-sm font-medium leading-none text-indigo-600',
  iconWrapper: 'w-3.5 h-3 text-indigo-600',
};

const IndigoLinkLayout = ({ icon, text, link }: IIndigoLinkLayoutProps) => {
  return (
    <Link href={link}>
      <a target="_blank" rel="noreferrer">
        <div className={classes.wrapper}>
          <p className={classes.text}>{text}</p>
          <div className={classes.iconWrapper}>{icon}</div>
        </div>
      </a>
    </Link>
  );
};

export default IndigoLinkLayout;
