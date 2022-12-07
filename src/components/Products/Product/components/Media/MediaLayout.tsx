import React from 'react';

interface IMediaLayoutProps {
  media: React.ReactNode;
}

const MediaLayout = ({ media }: IMediaLayoutProps) => {
  return <div>{media}</div>;
};

export default MediaLayout;
