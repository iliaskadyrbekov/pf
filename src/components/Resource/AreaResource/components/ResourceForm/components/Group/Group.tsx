import React from 'react';

import { BlockLayout } from '@components/common/Block';
import { CreatableCombobox, FormField } from '@components/common';

interface IGroupProps {
  options: { name: string }[];
}

const Group = ({ options }: IGroupProps) => {
  return (
    <BlockLayout title="Group" caption="Group areas together for easier managing connection areas to products.">
      <FormField
        placeholder="Type to search or create"
        label="Group"
        name="group"
        component={CreatableCombobox}
        additionalLabel="Create new group: "
        options={options.map(({ name }) => ({ value: name, label: name }))}
      />
    </BlockLayout>
  );
};

export default Group;
