import React from 'react';

import { Popover } from '@components/common';
import CreateResourceActionLayout from './CreateResourceActionLayout';
import { CreateResourceActionItem, CreateResourceActionButton } from './components';

const RESOURCES = [
  {
    name: 'Thing',
    description:
      'Create a thing that can be a kayak, bike, or a ticket to a festival that can be shared between products.',
    href: '/products/resources/create?type=AVAILABILITY',
  },
  {
    name: 'Area',
    description:
      'Create a space that can be a parking spot or room to lease out, that is a physical area and can be shared between products.',
    href: '/products/resources/create?type=AREA',
  },
];

const CreateResourceAction = () => {
  return (
    <Popover
      key="actions-popover"
      renderLabel={({ isOpen }) => (
        <CreateResourceActionButton isOpen={isOpen}>New resource</CreateResourceActionButton>
      )}
      buttonClassName="h-full"
      panelClassName="w-[344px]"
      placement="bottom-end"
    >
      <CreateResourceActionLayout>
        {RESOURCES.map(({ name, href, description }) => (
          <CreateResourceActionItem key={name} name={name} href={href} description={description} />
        ))}
      </CreateResourceActionLayout>
    </Popover>
  );
};

export default CreateResourceAction;
