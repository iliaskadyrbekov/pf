import React from 'react';

const classes = {
  wrapper:
    'flex flex-col justify-center shadow lg:shadow-none bg-white rounded-lg sm:rounded p-4 my-4 min-h-[6rem] lg:min-h-[10rem] xl:min-h-[14rem]',
  text: 'text-sm font-normal text-center sm:text-base md:text-xl 2xl:text-2xl sm:font-medium leading-normal text-gray-500',
};

interface IMessageLayoutProps {
  children: React.ReactNode;
}

const MessageLayout = ({ children }: IMessageLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.text}>{children}</p>
    </div>
  );
};

export default MessageLayout;
