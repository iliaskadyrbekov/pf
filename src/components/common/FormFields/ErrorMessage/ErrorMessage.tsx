import React from 'react';

export interface IErrorMessageProps {
  message: string[];
}

const classes = {
  wrapper: 'mt-1',
  text: 'text-xs text-red-500 text-left',
};

const ErrorMessage = ({ message }: IErrorMessageProps) => {
  return (
    <div className={classes.wrapper}>
      {message.map((message, index) => (
        <p key={index} className={classes.text}>
          {message}
        </p>
      ))}
    </div>
  );
};

export default ErrorMessage;
