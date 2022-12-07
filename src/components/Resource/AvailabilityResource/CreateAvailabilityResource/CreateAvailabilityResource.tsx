import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Button } from '@components/common/Button';
import { FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { ResourceForm } from '../components';
import {
  ICreateAvailabilityResourceInput,
  useCreateAvailabilityResource,
} from 'src/graphql/mutations/createAvailabilityResource';
import { ShopContext } from 'src/context/ShopContext';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { MultiLanguageField } from 'src/shared/interfaces';
import { SpinnerIcon } from '@components/Icons';
import { isEmptyField } from 'src/helpers';

const CreateAvailabilityResource = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);

  const { mutate: createAvailabilityResource, loading } = useCreateAvailabilityResource();

  const initialValues = {
    name: [] as MultiLanguageField[],
    category: '',
    availability: '',
    SKU: '',
  };

  const handleValidate = (values: typeof initialValues) => {
    const errors: { name?: unknown; category?: string[]; availability?: string[] } = {};

    if (isEmptyField(values.name)) {
      errors.name = { generalError: ['Enter name'] };
    }

    if (!values.category) {
      errors.category = ['Select category'];
    }

    if (!values.availability) {
      errors.availability = ['Enter availability'];
    }

    return errors;
  };

  const prepareVariables = (values: typeof initialValues) => {
    const result: ICreateAvailabilityResourceInput = {
      name: values.name,
      category: values.category,
      availability: parseFloat(values.availability),
      SKU: values.SKU,
    };

    return result;
  };

  return (
    <FormLanguageSwitcherProviderComponent>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setStatus }) => {
          const errors = handleValidate(values);
          if (errors && Object.keys(errors).length) {
            setStatus(errors);
            return;
          }
          const createAvailabilityResourceInput = prepareVariables(values);

          try {
            await createAvailabilityResource({
              variables: { shopId: shop?.id, createAvailabilityResourceInput },
            });

            router.push(`/products/resources`);
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError));
          }
        }}
      >
        {({ handleSubmit }) => (
          <ResourceForm
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
        )}
      </Formik>
    </FormLanguageSwitcherProviderComponent>
  );
};

export default CreateAvailabilityResource;
