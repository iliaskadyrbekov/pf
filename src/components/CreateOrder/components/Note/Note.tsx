import React from 'react';

import { BlockLayout } from '@components/common/Block';
import NoteLayout from './NoteLayout';
import { FormField } from '@components/common/FormFields/FormField';
import { TextArea } from '@components/common/TextArea';

const Note = () => {
  return (
    <BlockLayout>
      <NoteLayout
        title="Note"
        note={
          <FormField name="note" component={TextArea} fieldWrapperClassName="h-full" className="h-full resize-none" />
        }
      />
    </BlockLayout>
  );
};

export default Note;
