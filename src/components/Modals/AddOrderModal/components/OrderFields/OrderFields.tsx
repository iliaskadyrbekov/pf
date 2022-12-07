import React from 'react';
import Link from 'next/link';

import { FormLanguageContext } from 'src/context';
import { Checkbox } from '@components/common/Checkbox';
import { DateInput } from '@components/common/DateInput';
import { FormField } from '@components/common/FormFields/FormField';
import { Input } from '@components/common/Input';
import { Select } from '@components/common/Select';
import { TextArea } from '@components/common/TextArea';
import { TCheckoutFormField } from 'src/shared/interfaces/CheckoutForm';
import OrderFieldsLayout from './OrderFieldsLayout';
import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';

interface IOrderFormProps {
  checkoutForm: TCheckoutFormField[];
  orderId: string;
}

const OrderFields = ({ checkoutForm, orderId }: IOrderFormProps) => {
  const { getMultiLanguageValue, getMultiLanguageArrayValue } = React.useContext(FormLanguageContext);

  const checkoutFormByOrder = [...checkoutForm].sort((a, b) => a.order - b.order);

  const handleNumberFieldChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value && parseInt(e.target.value);
    const isNan = isNaN(value as number);

    if (isNan) {
      return '';
    }

    return value;
  }, []);

  const renderedFields = checkoutFormByOrder.map((field) => {
    const fieldName = `${orderId}.${field.id}.value`;

    const restProps = {
      id: fieldName,
      name: fieldName,
      label: getMultiLanguageValue(field.name),
      required: field.isRequired,
      key: fieldName,
    };

    switch (field.type) {
      case CHECKOUT_FORM_FIELD_TYPE.NAME:
        return <FormField component={Input} {...restProps} />;
      case CHECKOUT_FORM_FIELD_TYPE.NUMBER:
        return <FormField component={Input} onChange={handleNumberFieldChange} {...restProps} />;
      case CHECKOUT_FORM_FIELD_TYPE.OPTIONS:
        return (
          <FormField
            options={getMultiLanguageArrayValue(field.options).map((v) => ({ value: v, label: v }))}
            component={Select}
            placeholder="&zwnj;"
            {...restProps}
          />
        );
      case CHECKOUT_FORM_FIELD_TYPE.TERMS_CHECKBOX:
        return (
          <FormField
            name={fieldName}
            component={Checkbox}
            label={
              <Link href={getMultiLanguageValue(field.url)}>
                <a className="text-[#4F49F5]" target="_blank">
                  {getMultiLanguageValue(field.name)}
                </a>
              </Link>
            }
            required={field.isRequired}
            key={fieldName}
          />
        );
      case CHECKOUT_FORM_FIELD_TYPE.CALENDAR:
        return <FormField component={DateInput} valueName="selected" {...restProps} />;
      case CHECKOUT_FORM_FIELD_TYPE.FREE_TEXT:
        return <FormField component={TextArea} {...restProps} />;
      case CHECKOUT_FORM_FIELD_TYPE.EXTRA_INFO:
        return (
          <div key={fieldName}>
            <span className="font-bold">{getMultiLanguageValue(field.name)}</span>
            <p>{getMultiLanguageValue(field.text)}</p>
          </div>
        );
      default:
        return;
    }
  });

  return <OrderFieldsLayout renderedFields={renderedFields} />;
};

export default OrderFields;
