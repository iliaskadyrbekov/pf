import React from 'react';

interface IEmojiPickerLayoutProps {
  button: React.ReactNode;
  picker: React.ReactNode | null;
  label?: string;
  pickerRef: React.Ref<HTMLDivElement>;
  removeIcon?: React.ReactNode;
}

const classes = {
  wrapper: 'w-full h-full',
  content: 'relative',
  label: 'text-sm font-medium text-gray-700 mb-1',
  picker: 'absolute z-10',
  removeIcon: 'absolute z-10 top-1 right-1',
};

const EmojiPickerLayout = ({ button, picker, label, pickerRef, removeIcon }: IEmojiPickerLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {label && <div className={classes.label}>{label}</div>}
      <div ref={pickerRef} className={classes.content}>
        {button}
        <div className={classes.picker}>{picker}</div>
        {removeIcon && <div className={classes.removeIcon}>{removeIcon}</div>}
      </div>
    </div>
  );
};

export default EmojiPickerLayout;
