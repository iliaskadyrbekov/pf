import React from 'react';

import { BlockLayout } from '@components/common/Block';
import NoteLayout from './NoteLayout';
import { TextArea } from '@components/common/TextArea';
import { useRouter } from 'next/router';
import { useOrderQuery } from 'src/graphql/queries/order';

const Note = () => {
  const router = useRouter();

  const orderId = router.query.orderId as string;
  const { data } = useOrderQuery({ id: orderId });

  return (
    <BlockLayout>
      <NoteLayout
        title="Note"
        note={<TextArea disabled={true} value={data?.order.note || ''} className="h-full resize-none" />}
      />
    </BlockLayout>
  );
};

export default Note;
