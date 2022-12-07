import React from 'react';

interface IActivityBoxLayoutProps {
  name: React.ReactNode;
  imageUrl?: string;
  onClick(): void;
}

const classes = {
  wrapper:
    'flex items-center justify-center w-40 h-40 bg-opacity-25 rounded-2xl bg-black bg-no-repeat bg-cover bg-center cursor-pointer m-2',
  name: 'text-lg font-bold leading-10 text-center text-white uppercase',
};

const styles = {
  wrapper: (imageUrl: string) => ({ backgroundImage: `url("${imageUrl}")` }),
};

const ActivityBoxLayout = ({ name, imageUrl, onClick }: IActivityBoxLayoutProps) => {
  return (
    <div onClick={onClick} className={classes.wrapper} style={imageUrl ? styles.wrapper(imageUrl) : {}}>
      <p className={classes.name}>{name}</p>
    </div>
  );
};

export default ActivityBoxLayout;
