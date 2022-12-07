import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { MultiLanguageBlock } from '@components/common/MultiLanguageBlock';
import CreateRentalCategoryModalLayout from './CreateRentalCategoryModalLayout';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';

import { ICategory } from 'src/shared/interfaces';
import { ShopContext } from 'src/context/ShopContext';
import { getDefaultLanguageWithCountry } from 'src/helpers';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { useCreateRenalCategory } from 'src/graphql/mutations/createRentalCategory';

interface ICreateRentalCategoryModalProps {
  onClose: () => void;
  onCreate: (category: ICategory) => void;
}

const CreateRentalCategoryModal = ({ onClose, onCreate }: ICreateRentalCategoryModalProps) => {
  const router = useRouter();

  const { shop } = React.useContext(ShopContext);
  const { availableLangs } = React.useContext(FormLanguageContext);

  const { mutate: createRentalCategory, loading } = useCreateRenalCategory();

  return (
    <Formik
      initialValues={{
        name: getDefaultLanguageWithCountry(availableLangs),
      }}
      onSubmit={async (values, { setStatus }) => {
        try {
          const { data } = await createRentalCategory({
            variables: {
              shopId: shop?.id,
              input: {
                ...values,
                activityId: router.query.activityId as string,
              },
            },
          });

          const result = data?.createRentalCategory.categories || [];
          onCreate(result[result?.length - 1]);

          onClose();
        } catch (err) {
          setStatus(getValidationErrors(err as IGraphqlError));
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <CreateRentalCategoryModalLayout
          categoryName={
            <MultiLanguageBlock>
              <FormMultiLanguageField name="name" component={Input} label="Category name" />
            </MultiLanguageBlock>
          }
          title="Create new category"
          actions={[
            <Button variant="contained" color="default" key="1" onClick={onClose}>
              Close
            </Button>,
            <Button
              disabled={isSubmitting}
              icon={loading ? <Spinner /> : null}
              variant="contained"
              color="primary"
              key="2"
              onClick={() => handleSubmit()}
            >
              Add
            </Button>,
          ]}
        />
      )}
    </Formik>
  );
};

export default CreateRentalCategoryModal;
