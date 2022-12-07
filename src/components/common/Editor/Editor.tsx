import React from 'react';
import QuillEmoji from 'quill-emoji';
import { DeltaStatic, Sources } from 'quill';
import ReactQuill, { Quill } from 'react-quill';

import EditorLayout from './EditorLayout';

interface IEditorProps {
  value: string;
  label?: string;
  name: string;
  icon?: React.ReactNode;
  onChange(val: string): void;
}

Quill.register(
  {
    'formats/emoji': QuillEmoji.EmojiBlot,
    'modules/emoji-shortname': QuillEmoji.ShortNameEmoji,
    'modules/emoji-toolbar': QuillEmoji.ToolbarEmoji,
  },
  true,
);

const Editor = ({ value, label, icon, name, onChange }: IEditorProps) => {
  const handleChange = (val: string, _: DeltaStatic, source: Sources) => {
    if (source !== 'user') {
      return;
    }

    onChange(val);
  };

  const modules = React.useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link'],
        ['emoji'],
        ['clean'],
      ],
      'emoji-toolbar': true,
      'emoji-shortname': true,
    }),
    [],
  );

  return (
    <EditorLayout
      label={label}
      icon={icon}
      name={name}
      editor={<ReactQuill id={name} modules={modules} theme="snow" value={value} onChange={handleChange} />}
    />
  );
};

export default Editor;
