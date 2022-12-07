import React from 'react';
import { useFormikContext } from 'formik';

import { Input } from '@components/common/Input';
import { Flag } from '@components/common/Flag';
import AddressFormLayout from './AddressFormLayout';
import { FormField } from '@components/common/FormFields/FormField';
import { PhoneInputSelect } from '@components/common/PhoneInputSelect';
import { Combobox } from '@components/common/Combobox';
import { IOption } from '@components/common/Select/Select';
import { IconTextOption } from '@components/common/Combobox/components';

import { mapFromArray } from 'src/helpers';
import { ICountry } from 'src/shared/interfaces/Shop';

interface IAddressFormProps {
  countriesOptions: ICountry[];
}

interface IFormikValues {
  country?: string;
}

const AddressForm = ({ countriesOptions }: IAddressFormProps) => {
  const { values } = useFormikContext<IFormikValues>();

  const countries = React.useMemo(() => mapFromArray(countriesOptions, (country) => country.id), [countriesOptions]);

  const options = countriesOptions.map(({ id, native }) => ({ value: id, label: native }));

  return (
    <AddressFormLayout
      businessName={<FormField name="profile.legalBusinessName" label="Legal name of business" component={Input} />}
      VAT={<FormField name="profile.VAT" label="VAT Number" component={Input} />}
      phone={
        <FormField
          id="profile.phone"
          name="profile.phone"
          label="Phone"
          component={PhoneInputSelect}
          options={options}
          countries={countriesOptions}
          country={values.country}
          initialCountry={values.country}
        />
      }
      street={<FormField name="profile.streetAndHouseNumber" label="Street" component={Input} />}
      apartment={<FormField name="profile.apartment" label="Apartment, suite (optinal)" component={Input} />}
      city={<FormField name="profile.city" label="City" component={Input} />}
      postalCode={<FormField name="profile.postalCode" label="Postal / ZIP code" component={Input} />}
      country={
        <FormField
          name="country"
          label="Country"
          options={options}
          component={Combobox}
          renderOption={(option: IOption<string>) => (
            <IconTextOption label={option.label} icon={<Flag countryId={countries[option.value].id} />} />
          )}
        />
      }
    />
  );
};

export default AddressForm;
