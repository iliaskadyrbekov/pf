import React from 'react';

import { Flag } from '../Flag';
import { Input } from '../Input';
import Select, { IOption } from '../Select/Select';
import { IconTextOption } from '../Select/components';
import PhoneInputSelectLayout from './PhoneInputSelectLayout';
import FlagDefaultLayout from '../Flag/components/FlagDefaultLayout';

import { ICountry } from 'src/shared/interfaces/Shop';

interface IPhoneInputSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  isError: boolean;
  countries: ICountry[];
  options: IOption<string>[];
  onChange: (val: string) => void;
  initialCountry?: string;
  country: string;
}

const PhoneInputSelect = ({
  id,
  name,
  value,
  onChange,
  label,
  options,
  countries,
  isError,
  country,
  initialCountry = '',
}: IPhoneInputSelectProps) => {
  const [countryId, setCountryId] = React.useState<string>(initialCountry);

  React.useEffect(() => {
    if (country && country !== countryId) {
      onSelectChange(country);
    }
  }, [country]);

  const getCountryId = (option?: IOption<string>) => getCountry(countries, option)?.id || '';

  const getCountry = (countries: ICountry[], option?: IOption<string>) => {
    return countries.find((country) => country.id === option?.value);
  };

  const onSelectChange = React.useCallback(
    (newCountryId) => {
      const prevCountryById = countries.find(({ id }) => countryId === id);
      const newCountryById = countries.find(({ id }) => newCountryId === id);

      const prevCountryPhone = prevCountryById?.phone && `+${prevCountryById?.phone}`;
      const newCountryPhone = newCountryById?.phone && `+${newCountryById?.phone}`;

      const valueWithoutPrevCountryPhone =
        prevCountryPhone && value.startsWith(prevCountryPhone) ? value.slice(prevCountryPhone.length) : value;

      onChange(newCountryPhone ? `${newCountryPhone}${valueWithoutPrevCountryPhone}` : valueWithoutPrevCountryPhone);
      setCountryId(newCountryId);

      return newCountryId;
    },
    [countryId, setCountryId, value],
  );

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const eventValue = e.target.value && parseInt(e.target.value);
      const strValue = String(eventValue);
      const isNan = isNaN(eventValue as number);

      if (strValue.length > 16) {
        return value;
      }

      if (isNan) {
        onChange('');
        setCountryId('');
        return '';
      }

      const countryId = countries.find((country) => strValue.slice(0, country.phone.length) === country.phone)?.id;

      const result = strValue ? `+${strValue}` : strValue;

      if (countryId) {
        onChange(result);
        setCountryId(countryId);
      } else {
        onChange(result);
        setCountryId('');
      }

      return result;
    },
    [countryId, setCountryId],
  );

  return (
    <Input
      id={id}
      value={value}
      name={name}
      label={label}
      className="pl-[7rem]"
      onChange={onInputChange}
      isError={isError}
      leftElement={
        <PhoneInputSelectLayout>
          <Select
            value={countryId}
            wrapperClassName="w-[6rem] border-none focus:ring-2 ml-[1px] h-[2.375rem]"
            dropdownClassName="w-72"
            options={options}
            renderSelectedOption={(option?: IOption<string>) => (
              <IconTextOption icon={<Flag countryId={getCountryId(option)} />} />
            )}
            renderOption={(option) => (
              <IconTextOption
                label={`${getCountry(countries, option)?.native} +${getCountry(countries, option)?.phone}`}
                icon={<Flag countryId={getCountryId(option)} />}
                selected={getCountryId(option) === countryId}
              />
            )}
            onChange={onSelectChange}
            renderDefaultOption={<FlagDefaultLayout />}
          />
        </PhoneInputSelectLayout>
      }
    />
  );
};

export default PhoneInputSelect;
