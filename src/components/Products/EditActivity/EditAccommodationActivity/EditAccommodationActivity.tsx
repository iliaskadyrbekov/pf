import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { FilterSpecification } from './components';
import { BoxLayout, MainInfo } from '../components';
import { Accordion, Button, FormField, MapInput, SelectNative, Spinner, Toggle } from '@components/common';

import { useArchiveActivity } from '../mutations';
import { ShopContext } from 'src/context/ShopContext';
import { useEditAccommodationActivity } from './mutations';
import { ModalContext, ModalType } from 'src/context/ModalContext';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { useActivityFormQuery } from 'src/graphql/queries/activityForm';
import { getDefaultLanguageWithCountry, getFilteredMediaContent } from 'src/helpers';
import { FormLanguageContext, FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { CreateEntityLayout, SettingsLayout } from 'src/layouts';

const EditAccommodationActivity = () => {
  const router = useRouter();
  const id = router.query.activityId as string;

  const { handleOpenModal } = React.useContext(ModalContext);

  const { mutate: archiveActivity } = useArchiveActivity();
  const { mutate: editAccommodationActivity, loading } = useEditAccommodationActivity();

  const handleArchiveClick = () => {
    handleOpenModal({
      type: ModalType.CONFIRM_MODAL,
      props: {
        title: 'Archive activity',
        message: 'Are you sure you want to archive this activity?',
        onConfirm: async () => {
          await archiveActivity({ variables: { shopId: shop?.id, id: router.query.activityId as string } });
          await router.push('/products');
        },
      },
    });
  };

  const { shop } = React.useContext(ShopContext);
  const { availableLangs } = React.useContext(FormLanguageContext);

  const { data } = useActivityFormQuery({ shopId: shop?.id, id: router.query.activityId as string });
  const activity = data?.activityForm.data;
  const meta = data?.activityForm.meta;

  const defaultText = getDefaultLanguageWithCountry(availableLangs);
  const defaultVisibility = meta?.fields.visibility.options && meta.fields.visibility.options[0]?.id;

  const defaultCenter = activity?.location || { lat: 0, lng: 0 };
  const defaultLocation = { lat: shop?.country.latLng.lat || 0, lng: shop?.country.latLng.lng || 0 };

  return (
    <FormLanguageSwitcherProviderComponent>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: activity?.name || defaultText,
          description: activity?.description || defaultText,
          headImage: activity?.headImage || '',
          content: activity?.content || [],
          visibility: activity?.visibility.id || defaultVisibility,
          location: activity?.location || defaultLocation || defaultCenter,
          locationEnabled: !!activity?.locationEnabled,
          icon: activity?.icon,
          specificationFilter: activity?.specificationFilter,
          specificationFilterEnabled: activity?.specificationFilterEnabled,
        }}
        onSubmit={async (values, { setStatus }) => {
          try {
            const { headImage: _, ...input } = values;

            await editAccommodationActivity({
              variables: {
                shopId: shop?.id,
                input: { id, ...input, content: getFilteredMediaContent(values.content), shopId: shop?.id },
              },
            });

            await router.push(`/products/activity/${id}`);
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError));
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <CreateEntityLayout
            actions={[
              <Button variant="contained" color="default" key="1" onClick={handleArchiveClick}>
                Archive
              </Button>,
              <Button
                variant="contained"
                icon={loading ? <Spinner /> : null}
                color="primary"
                key="2"
                onClick={() => handleSubmit()}
              >
                Save
              </Button>,
            ]}
            infoBlocks={[
              <MainInfo key="main-info" activityId={id} />,
              <Accordion
                key="location"
                className="h-auto"
                expanded={values.locationEnabled}
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
              />,
              <Accordion
                key="filter"
                expanded={values.specificationFilterEnabled}
                title="Filter"
                toggle={
                  <FormField
                    name="specificationFilterEnabled"
                    onChange={(val) => val}
                    component={Toggle}
                    label="Enable filter"
                  />
                }
                content={
                  <FilterSpecification
                    name="specificationFilter"
                    specificationFilter={values.specificationFilter}
                    onChange={(specificationFilter) => setFieldValue('specificationFilter', specificationFilter)}
                  />
                }
              />,
            ]}
            settings={
              <SettingsLayout>
                {[
                  <BoxLayout key="visibility">
                    <FormField
                      label="Visibility"
                      name="visibility"
                      options={meta?.fields.visibility.options.map(({ id, label }) => ({ value: id, label }))}
                      component={SelectNative}
                    />
                  </BoxLayout>,
                ]}
              </SettingsLayout>
            }
          />
        )}
      </Formik>
    </FormLanguageSwitcherProviderComponent>
  );
};

export default EditAccommodationActivity;
