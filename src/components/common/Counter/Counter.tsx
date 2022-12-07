import React from 'react';

interface ICounterProps {
  value: number;
  remain: number;
  minimum: number;
  maximum?: number;
  onChange: (value: number) => void;
}

const classes = {
  wrapper:
    'flex items-center justify-between max-w-[6rem] w-full bg-white border rounded-[5px] border-gray-200 text-base font-medium leading-relaxed text-indigo-600 cursor-default',
  button: (disabled: boolean) => `${disabled ? 'opacity-50 cursor-default' : ''} px-2 py-1`,
};

const Counter = ({ value, maximum, minimum, remain, onChange }: ICounterProps) => {
  const plusCondition = remain <= (maximum || value);
  const minusCondition = value <= minimum;

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChange(value + 1);
  };

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChange(value - 1);
  };

  return (
    <div className={classes.wrapper}>
      <button className={classes.button(minusCondition)} disabled={minusCondition} onClick={handleDecrement}>
        &#8722;
      </button>
      <span>{value}</span>
      <button className={classes.button(plusCondition)} disabled={plusCondition} onClick={handleIncrement}>
        &#43;
      </button>
    </div>
  );
};

export default Counter;
