import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IEditLinkProps {
  item: {
    id: string;
  };
  index: number;
}

const classes = {
  cell: 'px-6 py-4 whitespace-nowrap text-left text-sm font-medium',
  link: 'text-indigo-600 hover:text-indigo-900',
};

const EditLink = ({ item: { id }, index }: IEditLinkProps) => {
  const router = useRouter();

  return (
    <td key={index} className={classes.cell}>
      <Link href={`/products/activity/${router.query.activityId}/product/${id}/edit`}>
        <a className={classes.link}>Edit</a>
      </Link>
    </td>
  );
};

export default EditLink;
