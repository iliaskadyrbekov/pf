import React from 'react';
import { useFormikContext } from 'formik';

import { FlagIcon } from '@components/Icons';
import { Flag } from '@components/common/Flag';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Checkbox } from '@components/common/Checkbox';
import { Combobox } from '@components/common/Combobox';
import { FormField } from '@components/common/FormFields/FormField';
import { PhoneInputSelect } from '@components/common/PhoneInputSelect';
import { IconTextOption } from '@components/common/Combobox/components';
import ShopAddressProfileFormLayout from './ShopAddressProfileFormLayout';

import { mapFromArray } from 'src/helpers';
import { ICountry } from 'src/shared/interfaces/Shop';
import { IOption } from '@components/common/Select/Select';

interface IShopAddressProfileFormProps {
  countriesOptions: ICountry[];
}

interface IFormikValues {
  country?: string;
}

const ShopAddressProfileForm: React.FC<IShopAddressProfileFormProps> = ({
  countriesOptions,
}: IShopAddressProfileFormProps) => {
  const { handleSubmit, values } = useFormikContext<IFormikValues>();

  const onSubmit = React.useCallback(async () => {
    handleSubmit();
  }, []);

  const countries = React.useMemo(() => mapFromArray(countriesOptions, (country) => country.id), [countriesOptions]);

  const options = countriesOptions.map(({ id, native }) => ({ value: id, label: native }));

  return (
    <ShopAddressProfileFormLayout
      title="Add an address so you can get paid"
      subtitle="This will be used as your default business address. You can always change this later."
      legalBusinessName={
        <FormField component={Input} name="profile.legalBusinessName" label="Legal name of business" />
      }
      street={
        <FormField component={Input} name="profile.streetAndHouseNumber" label="Address and number" maxLength="80" />
      }
      postalCode={<FormField component={Input} name="profile.postalCode" label="Postal code" />}
      city={<FormField component={Input} name="profile.city" label="City" />}
      country={
        <FormField
          component={Combobox}
          name="country"
          label="Country / Region"
          options={options}
          renderOption={(option: IOption<string>) => (
            <IconTextOption label={option.label} icon={<Flag countryId={countries[option.value].id} />} />
          )}
        />
      }
      phone={
        <FormField
          id="profile.phone"
          name="profile.phone"
          label="Phone"
          component={PhoneInputSelect}
          options={options}
          country={values.country}
          initialCountry={values.country}
          countries={countriesOptions}
        />
      }
      website={<FormField component={Input} name="profile.website" label="Website (optional)" />}
      isBusiness={
        <FormField component={Checkbox} name="profile.isBusiness" label="This shop is a registered business" />
      }
      button={
        <Button icon={<FlagIcon />} variant="contained" color="primary" className="w-36 h-11" onClick={onSubmit}>
          Finish
        </Button>
      }
    />
  );
};

export default ShopAddressProfileForm;
