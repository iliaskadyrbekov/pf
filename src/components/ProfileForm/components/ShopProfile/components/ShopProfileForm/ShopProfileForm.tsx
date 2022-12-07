import React from 'react';

import ShopProfileFormLayout from './ShopProfileFormLayout';
import { SelectNative } from '@components/common/SelectNative';
import { Checkbox } from '@components/common/Checkbox';
import { ArrowRightIcon } from '@components/Icons';
import { FormField } from '@components/common/FormFields/FormField';
import { Button } from '@components/common/Button';

interface IOption {
  label: string;
  id: string;
}

interface IShopProfileFormProps {
  onNextStep: () => void;
  sellingOptions: IOption[];
  revenueOptions: IOption[];
  industryOptions: IOption[];
}

const ShopProfileForm: React.FC<IShopProfileFormProps> = ({
  onNextStep,
  sellingOptions,
  revenueOptions,
  industryOptions,
}: IShopProfileFormProps) => {
  const placeholder = 'Please choose one...';

  const getOption = React.useCallback(
    (opt: IOption) =>
      opt.label === ''
        ? { value: opt.id, label: 'Please choose one...', disabled: true }
        : { value: opt.id, label: opt.label },
    [],
  );

  const sellingOpts = React.useMemo(() => sellingOptions.map(getOption), [sellingOptions]);
  const revenueOpts = React.useMemo(() => revenueOptions.map(getOption), [revenueOptions]);
  const industryOpts = React.useMemo(() => industryOptions.map(getOption), [industryOptions]);

  return (
    <ShopProfileFormLayout
      title="Tell us a little about yourself"
      subtitle="We’ll help you get started based on your responses"
      selling={
        <FormField
          name="profile.selling"
          component={SelectNative}
          label="What is your current situation?"
          placeholder={placeholder}
          options={sellingOpts}
        />
      }
      revenue={
        <FormField
          name="profile.revenue"
          component={SelectNative}
          label="What is your current revenue?"
          placeholder={placeholder}
          options={revenueOpts}
        />
      }
      industry={
        <FormField
          name="profile.industry"
          component={SelectNative}
          label="Which industry will you be operating in?"
          placeholder={placeholder}
          options={industryOpts}
        />
      }
      question="Are you setting up a shop for a client?"
      isForClient={
        <FormField
          name="profile.isForClient"
          component={Checkbox}
          label="Yes, I’m designing/developing a shop for a client"
        />
      }
      button={
        <Button
          icon={<ArrowRightIcon stroke="white" />}
          variant="contained"
          color="primary"
          className="w-36 h-11"
          onClick={onNextStep}
        >
          Next
        </Button>
      }
    />
  );
};

export default ShopProfileForm;
