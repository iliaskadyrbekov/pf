import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Button } from '@components/common/Button';

interface IDetailsCellProps {
  item: { id: string };
  index: number;
}

const classes = {
  wrapper: 'px-6 py-4',
  amount: 'text-sm font-bold leading-tight text-gray-500',
};

const DetailsCell = ({ item, index }: IDetailsCellProps) => {
  const router = useRouter();

  return (
    <td className={classes.wrapper} key={index}>
      <Link href={`${router.pathname}/${item.id}`}>
        <a>
          <Button>Details</Button>
        </a>
      </Link>
    </td>
  );
};

export default DetailsCell;
