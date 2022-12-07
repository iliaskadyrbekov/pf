import React from 'react';

import { UploadFileIcon } from '@components/Icons';

export interface IFileUploadInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  name: string;
  isError?: boolean;
}

const classes = {
  wrapper: (isError?: boolean) =>
    `flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md h-full ${
      isError ? 'border-red-500' : 'border-gray-300'
    }`,
  boxWrapper: 'space-y-1 text-center',
  inputWrapper: 'flex text-sm text-gray-600',
  input: 'sr-only',
  label:
    'relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500',
  text: 'pl-1',
  caption: 'text-xs text-gray-500',
};

const FileUploadInput = React.forwardRef(
  ({ name, isError, className, ...rest }: IFileUploadInputProps, ref: React.Ref<HTMLInputElement>) => {
    const classname = `${classes.input}${className ? ` ${className}` : ''}`;

    return (
      <div className={classes.wrapper(isError)}>
        <div className={classes.boxWrapper}>
          <UploadFileIcon />
          <div className={classes.inputWrapper}>
            <label htmlFor={name} className={classes.label}>
              <span>Upload a file</span>
              <input
                ref={ref}
                id={name}
                name={name}
                type="file"
                className={classname}
                onClick={(event) => {
                  // allows get get same image without caching
                  (event.target as any).value = null;
                }}
                {...rest}
              />
            </label>
            <p className={classes.text}>or drag and drop</p>
          </div>
          <p className={classes.caption}>PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    );
  },
);

FileUploadInput.displayName = 'FileUploadInput';

export default FileUploadInput;
