import React from 'react';

interface IProfileFormLayoutProps {
  content: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col-reverse lg:grid lg:grid-cols-3 lg:h-full',
};

const ProfileFormLayout: React.FC<IProfileFormLayoutProps> = ({ content }: IProfileFormLayoutProps) => {
  return <div className={classes.wrapper}>{content}</div>;
};

export default ProfileFormLayout;
