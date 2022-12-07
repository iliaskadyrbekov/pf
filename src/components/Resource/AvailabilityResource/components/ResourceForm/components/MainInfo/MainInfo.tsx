import React from 'react';

import MainInfoLayout from './MainInfoLayout';
import { FormField } from '@components/common/FormFields/FormField';
import { Input } from '@components/common/Input';
import { SelectWithGrouping } from '@components/common/SelectWithGrouping';
import { MultiLanguageBlock } from '@components/common/MultiLanguageBlock';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';

interface IMainInfoProps {
  categoryOptions: { name: string; id: string; group: string; groupName: string }[];
}

interface ITypeOption {
  value: string;
  label: string;
}

const MainInfo = ({ categoryOptions }: IMainInfoProps) => {
  const categoryOptionsGrouped = categoryOptions.reduce<{ value: ITypeOption[]; label: string; group: string }[]>(
    (acc, cur) => {
      const index = acc.findIndex(({ group }) => group === cur.group);

      if (index === -1) {
        acc.push({
          group: cur.group,
          value: [{ value: cur.id, label: cur.name }],
          label: cur.groupName,
        });
      } else {
        acc[index].value.push({ value: cur.id, label: cur.name });
      }

      return acc;
    },
    [],
  );

  return (
    <MultiLanguageBlock>
      <MainInfoLayout>
        <FormMultiLanguageField component={Input} placeholder="Enter name" label="Name" name="name" />
        <FormField
          component={SelectWithGrouping}
          placeholder="Select category"
          label="Resource category"
          name="category"
          options={categoryOptionsGrouped}
        />
      </MainInfoLayout>
    </MultiLanguageBlock>
  );
};

export default MainInfo;
