import React from 'react';
import { Formik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import ProfileFormLayout from './ProfileFormLayout';
import { ShopAddressProfile, ShopProfile } from './components';

import { SHOP_PROFILE_OPTIONS, IShopProfileOptions, COUNTRIES_OPTIONS, ICountriesOptions } from './queries';
import { CREATE_SHOP_PROFILE, ICreateShopProfileVars } from './mutations';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';

import { ShopContext } from 'src/context/ShopContext';

const ProfileForm = () => {
  const router = useRouter();

  const { shop } = React.useContext(ShopContext);

  const { data: shopProfileData } = useQuery<IShopProfileOptions>(SHOP_PROFILE_OPTIONS);
  const { data: countriesData } = useQuery<ICountriesOptions>(COUNTRIES_OPTIONS);

  const [createShopProfile] = useMutation<boolean, ICreateShopProfileVars>(CREATE_SHOP_PROFILE);

  const [activeStep, setActiveStep] = React.useState(0);

  const { sellingOptions = [], revenueOptions = [], industryOptions = [] } = shopProfileData?.shopProfileOptions || {};
  const { countriesOptions = [] } = countriesData || {};

  const initialValues = {
    profile: {
      selling: sellingOptions[0]?.id,
      revenue: revenueOptions[0]?.id,
      industry: industryOptions[0]?.id,
      isForClient: false,

      legalBusinessName: '',
      streetAndHouseNumber: '',
      apartment: '',
      postalCode: '',
      city: '',
      phone: '',
      website: '',
      isBusiness: false,
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    country: shop?.country?.id || countriesOptions[0]?.id,
  };

  const handleNextStep = React.useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep]);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ShopProfile
            onNextStep={handleNextStep}
            sellingOptions={sellingOptions}
            revenueOptions={revenueOptions}
            industryOptions={industryOptions}
          />
        );
      case 1:
        return <ShopAddressProfile countriesOptions={countriesOptions} />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <ProfileFormLayout
      content={
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values, helpers) => {
            const { setStatus } = helpers;

            try {
              await createShopProfile({
                variables: {
                  input: { ...values, profile: { ...values.profile } },
                  shopId: shop?.id,
                },
              });
            } catch (err) {
              setStatus(getValidationErrors(err as IGraphqlError));
              return;
            }

            await router.push('/');
          }}
        >
          {renderStepContent(activeStep)}
        </Formik>
      }
    />
  );
};

export default ProfileForm;
