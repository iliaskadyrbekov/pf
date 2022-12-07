import React from 'react';
import { UploadIcon } from '@heroicons/react/solid';

export interface IMultipleFileUploadInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  name: string;
  isError?: boolean;
}

const classes = {
  wrapper: (isError?: boolean) =>
    `flex justify-center items-center border-2 border-dashed rounded-md h-16 w-16 ${
      isError ? 'border-red-500' : 'border-gray-300'
    }`,
  boxWrapper: 'space-y-1 text-center',
  inputWrapper: 'flex text-sm text-gray-600',
  input: 'sr-only',
  label: 'relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500',
  uploadIcon: 'h-5 w-5',
};

const MultipleFileUploadInput = React.forwardRef(
  ({ name, isError, className, ...rest }: IMultipleFileUploadInputProps, ref: React.Ref<HTMLInputElement>) => {
    const classname = `${classes.input}${className ? ` ${className}` : ''}`;

    return (
      <div className={classes.wrapper(isError)}>
        <div className={classes.boxWrapper}>
          <div className={classes.inputWrapper}>
            <label htmlFor={name} className={classes.label}>
              <UploadIcon className={classes.uploadIcon} />
              <input
                ref={ref}
                id={name}
                name={name}
                type="file"
                className={classname}
                onClick={(event) => {
                  (event.target as any).value = null;
                }}
                {...rest}
              />
            </label>
          </div>
        </div>
      </div>
    );
  },
);

MultipleFileUploadInput.displayName = 'FileUploadInput';

export default MultipleFileUploadInput;
