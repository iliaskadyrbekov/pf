import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { Description } from './components';
import { Toggle } from '@components/common/Toggle';
import { Button } from '@components/common/Button';
import PreferencesLayout from './PreferencesLayout';
import { Spinner } from '@components/common/Spinner';
import { MapInput } from '@components/common/MapInput';
import { Accordion } from '@components/common/Accordion';
import { FormField } from '@components/common/FormFields/FormField';
import { PageActionsPortal } from '@components/common/PageActionsPortal';
import ContentWithDescriptionLayout from 'src/layouts/ContentWithDescriptionLayout';

import { ShopContext } from 'src/context/ShopContext';
import { getDefaultLanguageWithCountry } from 'src/helpers';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { useEditShopPreferences } from './mutations/editShopPreferences';
import { IShopPreferencesRes, IShopPreferencesVars, SHOP_PREFERENCES } from 'src/graphql/queries/shopPreferences';

const Preferences = () => {
  const router = useRouter();
  const { availableLangs } = React.useContext(FormLanguageContext);
  const { shop } = React.useContext(ShopContext);

  const { mutate: editShopPreferences, loading } = useEditShopPreferences();
  const { data } = useQuery<IShopPreferencesRes, IShopPreferencesVars>(SHOP_PREFERENCES, {
    variables: {
      shopId: shop?.id,
    },
  });
  const shopPreferences = data?.shopPreferences;

  const defaultLocation = { lat: shop?.country.latLng.lat || 0, lng: shop?.country.latLng.lng || 0 };
  const defaultText = getDefaultLanguageWithCountry(availableLangs);
  const defaultCenter = shopPreferences?.location || { lat: 0, lng: 0 };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: shopPreferences?.id,
        homepageTitle: shopPreferences?.homepageTitle || defaultText,
        homepageDescription: shopPreferences?.homepageDescription || defaultText,
        homepageHeadImage: shopPreferences?.homepageHeadImage || '',
        location: shopPreferences?.location || defaultLocation,
        locationEnabled: !!shopPreferences?.locationEnabled,
        newsEnabled: shopPreferences?.newsEnabled,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await editShopPreferences({ variables: { ...values, shopId: shop?.id } });
          setSubmitting(false);
          await router.push('/online-shop');
        } catch (err) {
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, isSubmitting, values }) => (
        <PreferencesLayout
          items={[
            <ContentWithDescriptionLayout
              key={1}
              title="Title, image and description"
              description="The title, image and description help define how your store shows up on search engines."
              content={<Description />}
            />,
            <ContentWithDescriptionLayout
              key={2}
              title="Location"
              description="This is the location of your business where it will appear on the frontpage of the online shop."
              content={
                <Accordion
                  className="h-auto"
                  expanded={!!values.locationEnabled}
                  title="Location"
                  toggle={
                    <FormField
                      name="locationEnabled"
                      onChange={(val) => val}
                      component={Toggle}
                      label="Enable location"
                    />
                  }
                  content={
                    <FormField
                      name="location"
                      component={MapInput}
                      defaultCenter={defaultCenter}
                      label="Address"
                      placeholder="Type in address..."
                    />
                  }
                />
              }
            />,
            <ContentWithDescriptionLayout
              key={3}
              title="News"
              description="Great way of sharing company or activity news, when enabled you will see a module on the frontpage and ability to link it in the menu."
              content={
                <Accordion
                  className="h-auto"
                  title="News"
                  toggle={
                    <FormField name="newsEnabled" onChange={(val) => val} component={Toggle} label="Enable news" />
                  }
                />
              }
            />,
          ]}
          actions={
            <PageActionsPortal
              actions={[
                <Button
                  disabled={isSubmitting}
                  icon={loading ? <Spinner /> : null}
                  onClick={() => handleSubmit()}
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

export default Preferences;
