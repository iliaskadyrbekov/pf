import React from 'react';
import { StylesConfig } from 'react-select';

import { BoxLayout } from './components';
import ShopDetailsLayout from './ShopDetailsLayout';
import { SelectNative } from '@components/common/SelectNative';
import { FormField } from '@components/common/FormFields/FormField';
import { CreatableInput } from '@components/common/CreatableInput';

import { IVisibilityOption } from 'src/shared/interfaces';

interface IOption {
  value: string;
  label: string;
}

interface IShopDetailsProps {
  visibilityOptions: IVisibilityOption[];
}

const ShopDetails = ({ visibilityOptions }: IShopDetailsProps) => {
  return (
    <ShopDetailsLayout
      visibility={
        <BoxLayout>
          <FormField
            label="Visibility"
            name="visibility"
            options={visibilityOptions.map(({ id, label }) => ({ value: id, label }))}
            component={SelectNative}
          />
        </BoxLayout>
      }
      tags={
        <BoxLayout>
          <FormField
            label="Tags"
            transform={(value: IOption[]) => value.map((val) => val.value)}
            transformValue={(value: IOption[]) => value.map((val: IOption) => ({ value: val, label: val }))}
            component={CreatableInput}
            name="tags"
            placeholder="Add tags"
            customStyles={{
              placeholder: (defaultStyles: StylesConfig<IOption, true>) => ({
                ...defaultStyles,
                fontSize: 14,
                color: '#0000000',
              }),
              container: () => ({
                width: 288,
              }),
            }}
          />
        </BoxLayout>
      }
    />
  );
};

export default ShopDetails;
