import React from 'react';

import { Tooltip } from '../Tooltip';
import InputLayout from './InputLayout';
import InputWithoutBordersLayout from './InputWithoutBordersLayout';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  tooltipContent?: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  Layout?: typeof InputLayout | typeof InputWithoutBordersLayout;
  wrapperClassName?: string;
  isError?: boolean;
}

const Input = (
  {
    name,
    id,
    label,
    type = 'text',
    icon,
    isError,
    className,
    leftElement,
    rightElement,
    wrapperClassName,
    tooltipContent,
    Layout = InputLayout,
    ...rest
  }: IInputProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <Layout
      disabled={rest.disabled}
      icon={icon}
      label={label}
      name={name}
      tooltipContent={tooltipContent && <Tooltip>{tooltipContent}</Tooltip>}
      leftElement={leftElement}
      rightElement={rightElement}
      isError={isError}
      input={(className: string) => (
        <input ref={ref} type={type} name={name} id={id || name} className={className} {...rest} />
      )}
      wrapperClassName={wrapperClassName}
      inputClassName={className}
    />
  );
};

export default React.forwardRef(Input);
