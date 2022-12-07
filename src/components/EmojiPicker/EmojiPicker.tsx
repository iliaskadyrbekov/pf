import dynamic from 'next/dynamic';
import React from 'react';
import { IEmojiData } from 'emoji-picker-react';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

import EmojiPickerLayout from './EmojiPickerLayout';
import { Button } from '@components/common/Button';
import useClickOutside from '@hooks/useClickOutside';
import { PlusSmIcon, XIcon } from '@heroicons/react/solid';

interface IEmojiPickerProps {
  value: string;
  onChange(emoji: string | null): string;

  label?: string;
}

const EmojiPicker = ({ value, onChange, label }: IEmojiPickerProps) => {
  const pickerRef = React.useRef<HTMLDivElement>(null);
  const [isPickerVisible, setPickerVisible] = React.useState(false);

  const handleClosePicker = () => {
    setPickerVisible(false);
  };

  const handleEmojiClick = (_: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    onChange(emojiObject.emoji);
    handleClosePicker();
  };

  const handleRemoveEmoji = () => {
    onChange(null);
    handleClosePicker();
  };

  const handleTogglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  useClickOutside(pickerRef, handleClosePicker);

  return (
    <EmojiPickerLayout
      pickerRef={pickerRef}
      label={label}
      button={
        <Button className="w-full" onClick={handleTogglePicker}>
          {value ? (
            <span className="text-3xl leading-5">{value}</span>
          ) : (
            <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      }
      picker={isPickerVisible ? <Picker onEmojiClick={handleEmojiClick} /> : null}
      removeIcon={value && <XIcon onClick={handleRemoveEmoji} className="w-4 cursor-pointer" />}
    />
  );
};

export default EmojiPicker;
