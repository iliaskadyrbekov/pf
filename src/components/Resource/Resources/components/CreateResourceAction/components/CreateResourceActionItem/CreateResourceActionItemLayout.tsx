import React from 'react';

interface ICreateResourceActionItemLayoutProps {
  name: string;
  description: string;
}

const classes = {
  wrapper: 'cursor-pointer px-5 py-6 block group hover:bg-indigo-600 transition ease-in-out duration-150',
  name: 'text-base font-medium group-hover:text-white text-gray-900',
  description: 'mt-1 text-sm group-hover:text-purple-400 text-gray-500',
};

const CreateResourceActionItemLayout = ({ name, description }: ICreateResourceActionItemLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.name}>{name}</p>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default CreateResourceActionItemLayout;
