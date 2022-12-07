import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { PageForm } from '@components/OnlineShop/components';

import { useCreatePage } from '../mutations';
import { ShopContext } from 'src/context/ShopContext';
import { usePageMetaQuery } from 'src/graphql/queries/pageMeta';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { getDefaultLanguageWithCountry, getFilteredMediaContent, isEmptyField } from 'src/helpers';
import { FormLanguageContext, FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';

const CreateCustomPage = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { availableLangs } = React.useContext(FormLanguageContext);

  const { data } = usePageMetaQuery();
  const { mutate: createPage, loading } = useCreatePage();

  if (!shop || !data) {
    return null;
  }

  const defaultText = getDefaultLanguageWithCountry(availableLangs);
  const defaultVisibility = data.pageMeta.fields.visibility.options && data.pageMeta.fields.visibility.options[0]?.id;

  const initialValues = {
    name: defaultText,
    description: defaultText,
    headImage: '',
    content: [],
    tags: [],
    visibility: defaultVisibility,
  };

  const handleValidate = (values: typeof initialValues) => {
    const errors: { name?: unknown } = {};

    if (isEmptyField(values.name)) {
      errors.name = { generalError: ['Enter name'] };
    }

    return { ...errors };
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

          try {
            await createPage({
              variables: { shopId: shop.id, ...values, content: getFilteredMediaContent(values.content) },
            });

            await router.push('/online-shop/pages');
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError));
          }
        }}
      >
        {({ handleSubmit }) => (
          <PageForm
            visibilityOptions={data.pageMeta?.fields.visibility.options}
            actions={[
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
          />
        )}
      </Formik>
    </FormLanguageSwitcherProviderComponent>
  );
};

export default CreateCustomPage;
