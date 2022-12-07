import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { PageForm } from '@components/OnlineShop/components';

import { ShopContext } from 'src/context/ShopContext';
import { useCreateNews } from '../mutations/createNews';
import { useNewsMetaQuery } from 'src/graphql/queries/newsMeta';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { getDefaultLanguageWithCountry, getFilteredMediaContent, isEmptyField } from 'src/helpers';
import { FormLanguageContext, FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';

const CreateNews = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { availableLangs } = React.useContext(FormLanguageContext);

  const { data } = useNewsMetaQuery();
  const { mutate: createNews, loading } = useCreateNews();

  if (!shop || !data) {
    return null;
  }

  const defaultText = getDefaultLanguageWithCountry(availableLangs);
  const defaultVisibility = data.newsMeta.fields.visibility.options && data.newsMeta.fields.visibility.options[0]?.id;

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
            await createNews({
              variables: { shopId: shop.id, ...values, content: getFilteredMediaContent(values.content) },
            });

            await router.push('/online-shop/news');
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError));
          }
        }}
      >
        {({ handleSubmit }) => (
          <PageForm
            visibilityOptions={data.newsMeta.fields.visibility.options}
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

export default CreateNews;
