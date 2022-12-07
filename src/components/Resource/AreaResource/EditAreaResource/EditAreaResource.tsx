import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Button } from '@components/common/Button';
import { FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { ResourceForm } from '../components';
import { IUpdateAreaResourceInput, useUpdateAreaResource } from './mutations/updateAreaResource';
import { ShopContext } from 'src/context/ShopContext';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { SpinnerIcon } from '@components/Icons';
import { useRemoveResource } from 'src/graphql/mutations/removeResource';
import { isEmptyField } from 'src/helpers';
import { ModalContext, ModalType } from 'src/context';
import { IAreaResource } from 'src/shared/interfaces';

interface IEditAreaResourceProps {
  resource: IAreaResource;
}

const EditAreaResource = ({ resource }: IEditAreaResourceProps) => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const { mutate: updateResource, loading: updateLoading } = useUpdateAreaResource();
  const { mutate: removeResource, loading: removeLoading } = useRemoveResource();

  const handleRemoveResource = async () => {
    try {
      const { data } = await removeResource({ variables: { shopId: shop?.id, id: router.query.resourceId as string } });

      if (!data?.removeResource) {
        return;
      }

      router.push(`/products/resources`);
    } catch (e) {
      return;
    }
  };

  if (!resource) {
    return null;
  }

  const handleRemoveClick = async () => {
    handleOpenModal({
      type: ModalType.CONFIRM_MODAL,
      props: {
        title: 'Delete resource',
        message: 'Are you sure you want to delete resource?',
        onConfirm: handleRemoveResource,
      },
    });
  };

  const initialValues = {
    name: resource.name,
    category: resource.category.id,
    group: resource.group?.name,
    SKU: resource.SKU || '',
  };

  const handleValidate = (values: typeof initialValues) => {
    const errors: { name?: unknown; category?: string[]; group?: string[] } = {};

    if (isEmptyField(values.name)) {
      errors.name = { generalError: ['Enter name'] };
    }

    if (!values.category) {
      errors.category = ['Select category'];
    }

    if (!values.group) {
      errors.group = ['Enter group'];
    }

    return errors;
  };

  const prepareVariables = (values: typeof initialValues) => {
    const result: IUpdateAreaResourceInput = {
      id: resource.id,
      name: values.name,
      category: values.category,
      SKU: values.SKU,
      group: values.group,
    };

    return result;
  };

  return (
    <FormLanguageSwitcherProviderComponent>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={async (values, { setStatus }) => {
          const errors = handleValidate(values);
          if (errors && Object.keys(errors).length) {
            setStatus(errors);
            return;
          }
          const updateAreaResourceInput = prepareVariables(values);

          try {
            await updateResource({
              variables: { shopId: shop?.id, updateAreaResourceInput },
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
                onClick={handleRemoveClick}
                icon={removeLoading ? <SpinnerIcon /> : null}
                key="1"
                variant="contained"
                color="delete"
              >
                Delete
              </Button>,
              <Button
                onClick={() => handleSubmit()}
                icon={updateLoading ? <SpinnerIcon /> : null}
                key="2"
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

export default EditAreaResource;
