import React from 'react';
import Link from 'next/link';

import CreateResourceActionItemLayout from './CreateResourceActionItemLayout';

interface ICreateResourceActionItemProps {
  name: string;
  href: string;
  description: string;
}

const CreateResourceActionItem = ({ name, href, description }: ICreateResourceActionItemProps) => {
  return (
    <Link href={href}>
      <a>
        <CreateResourceActionItemLayout name={name} description={description} />
      </a>
    </Link>
  );
};

export default CreateResourceActionItem;
