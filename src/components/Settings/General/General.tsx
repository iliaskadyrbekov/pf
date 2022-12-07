import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';

import GeneralLayout from './GeneralLayout';
import { GeneralItemLayout, DescriptionLayout, AddressForm, DetailsForm } from './components';
import { IShop } from 'src/shared/interfaces/Shop';
import { IShopFormMeta } from 'src/api/shopForm';
import { EDIT_SHOP, IEditShop, IEditShopVars } from './mutations';
import { Button } from '@components/common/Button';
import { SpinnerIcon } from '@components/Icons';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { PageActionsPortal } from '@components/common/PageActionsPortal';
import { useRouter } from 'next/router';

interface IGeneralProps {
  data: IShop;
  meta: IShopFormMeta;
}

const General = ({ data, meta }: IGeneralProps) => {
  const router = useRouter();
  const [editShop, { loading }] = useMutation<IEditShop, IEditShopVars>(EDIT_SHOP);

  return (
    <Formik
      initialValues={{
        name: data.name,
        currency: data.currency.id,
        timezone: data.timezone?.id || '',
        logo: data.logo,
        country: data.country?.id,
        profile: {
          VAT: data.profile?.VAT,
          website: data.profile?.website,
          legalBusinessName: data.profile?.legalBusinessName,
          streetAndHouseNumber: data.profile?.streetAndHouseNumber,
          apartment: data.profile?.apartment,
          city: data.profile?.city,
          postalCode: data.profile?.postalCode,
          phone: data.profile?.phone || '',
          contactEmail: data.profile?.contactEmail,
          senderEmail: data.profile?.senderEmail,
        },
      }}
      onSubmit={async (values, { setStatus }) => {
        try {
          await editShop({
            variables: {
              ...values,
              shopId: data.id,
              profile: { ...values.profile },
            },
          });

          router.push('/settings');
        } catch (err) {
          setStatus(getValidationErrors(err as IGraphqlError));
        }
      }}
    >
      {({ handleSubmit }) => (
        <GeneralLayout
          items={[
            <GeneralItemLayout
              key="1"
              description={<DescriptionLayout title="Shop details" description="Description" />}
              form={
                <DetailsForm
                  currencyOptions={meta.fields.currency.options}
                  timezoneOptions={meta.fields.timezone.options}
                />
              }
            />,
            <GeneralItemLayout
              key="2"
              description={<DescriptionLayout title="Shop address" description="Description" />}
              form={<AddressForm countriesOptions={meta.fields.country.options} />}
            />,
          ]}
          actions={
            <PageActionsPortal
              actions={[
                <Button
                  onClick={() => handleSubmit()}
                  icon={loading ? <SpinnerIcon /> : null}
                  key="1"
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>,
              ]}
            />
          }
        />
      )}
    </Formik>
  );
};

export default General;
