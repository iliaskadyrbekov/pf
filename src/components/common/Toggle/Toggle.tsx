import { Switch } from '@headlessui/react';
import React from 'react';

import { classNames } from '@utils/classNames';

interface IToggleProps {
  label?: React.ReactNode;
  wrapperClassName?: string;
  value?: boolean;
  disabled?: boolean;
  onChange: (val: boolean) => void;
  withIcon?: boolean;
}

const classes = {
  wrapper: 'flex items-center',
  switch: (isActive?: boolean) =>
    `${
      isActive ? 'bg-indigo-600' : 'bg-gray-200'
    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
  circle: (isActive?: boolean) =>
    `${
      isActive ? 'translate-x-5' : 'translate-x-0'
    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`,
  crossIconWrapper: (isActive?: boolean) =>
    `${
      isActive ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
    } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`,
  crossIcon: 'h-3 w-3 text-gray-400',
  okIconWrapper: (isActive?: boolean) =>
    `${
      isActive ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
    } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`,
  okIcon: 'h-3 w-3 text-indigo-600',
  label: 'mr-3 text-sm font-medium leading-tight text-gray-900',
};

const Toggle = ({ label, onChange, withIcon, value = false, disabled, wrapperClassName }: IToggleProps) => {
  return (
    <Switch.Group as="div" className={classNames(classes.wrapper, wrapperClassName)}>
      {label && (
        <Switch.Label as="span" className="mr-3">
          {typeof label === 'function' ? label(value) : label}
        </Switch.Label>
      )}
      <Switch disabled={disabled} checked={value} onChange={onChange} className={classes.switch(value)}>
        <span className="sr-only">Use setting</span>
        <span className={classes.circle(value)}>
          {withIcon && (
            <>
              <span className={classes.crossIconWrapper(value)} aria-hidden="true">
                <svg className={classes.crossIcon} fill="none" viewBox="0 0 12 12">
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={classes.okIconWrapper(value)} aria-hidden="true">
                <svg className={classes.okIcon} fill="currentColor" viewBox="0 0 12 12">
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </>
          )}
        </span>
      </Switch>
    </Switch.Group>
  );
};

export default Toggle;
