import React from 'react';

import { BlockLayout } from '@components/common/Block';
import BuyerInfoLayout from './BuyerInfoLayout';
import { FormField } from '@components/common/FormFields/FormField';
import { Input } from '@components/common/Input';
import InputWithoutBordersLayout from '@components/common/Input/InputWithoutBordersLayout';
import { Popover } from '@components/common/Popover';
import { IndigoTextLabel } from '@components/common/Dropdown/components/IndigoTextLabel';
import { ShopContext } from 'src/context';
import { DefaultMenuItem } from '@components/common/Dropdown/components/DefaultMenuItem';

interface IBuyerInfoProps {
  onCustomerSelect(id: string): void;
}

const BuyerInfo = ({ onCustomerSelect }: IBuyerInfoProps) => {
  const { shop } = React.useContext(ShopContext);

  if (!shop) {
    return null;
  }

  return (
    <BlockLayout>
      <BuyerInfoLayout
        title="Buyer information"
        avatar={undefined}
        existingCustomer={
          <Popover
            renderLabel={({ isOpen }) => <IndigoTextLabel isOpen={isOpen}>Existing customer</IndigoTextLabel>}
            buttonClassName="h-full"
            panelClassName="w-max"
          >
            {({ close }) => (
              <BlockLayout className="shadow-lg p-0">
                {shop.customers.map(({ name, email, phone, id }) => (
                  <DefaultMenuItem
                    key={id}
                    value={id}
                    onClick={(id) => {
                      close();
                      onCustomerSelect(id);
                    }}
                  >
                    {name}, {email}, {phone}
                  </DefaultMenuItem>
                ))}
              </BlockLayout>
            )}
          </Popover>
        }
        fullName={
          <FormField name="fullName" component={Input} Layout={InputWithoutBordersLayout} placeholder="Full name" />
        }
        email={<FormField name="email" component={Input} Layout={InputWithoutBordersLayout} placeholder="Email" />}
        phone={<FormField name="phone" component={Input} Layout={InputWithoutBordersLayout} placeholder="Phone" />}
        postalAddress={
          <FormField
            name="postalAddress"
            component={Input}
            Layout={InputWithoutBordersLayout}
            placeholder="Postal address"
          />
        }
        companyName={
          <FormField
            name="companyName"
            component={Input}
            Layout={InputWithoutBordersLayout}
            placeholder="Company name"
          />
        }
      />
    </BlockLayout>
  );
};

export default BuyerInfo;
