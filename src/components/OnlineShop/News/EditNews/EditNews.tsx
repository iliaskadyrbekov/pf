import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { PageForm } from '@components/OnlineShop/components';

import { ShopContext } from 'src/context/ShopContext';
import { useNewsMetaQuery } from 'src/graphql/queries/newsMeta';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { useSingleNewsQuery } from 'src/graphql/queries/singleNews';
import { ModalContext, ModalType } from 'src/context/ModalContext';
import { useArchiveNews, useEditNews } from '@components/OnlineShop/News/mutations';
import { getDefaultLanguageWithCountry, getFilteredMediaContent, isEmptyField } from 'src/helpers';
import { FormLanguageContext, FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';

const EditNews = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);
  const { availableLangs } = React.useContext(FormLanguageContext);

  const { data: newsMetaData } = useNewsMetaQuery();
  const { mutate: editNews, loading } = useEditNews();
  const { mutate: archiveNews } = useArchiveNews();
  const { data: singleNewsData } = useSingleNewsQuery({
    id: router.query.newsId as string,
    shopId: shop?.id,
    withDraft: true,
  });

  if (!shop) {
    return null;
  }

  const newsMeta = newsMetaData?.newsMeta;
  const singleNews = singleNewsData?.singleNews;

  const defaultText = getDefaultLanguageWithCountry(availableLangs);
  const defaultVisibility = newsMeta?.fields.visibility.options && newsMeta?.fields.visibility.options[0]?.id;

  const initialValues = {
    name: singleNews?.name || defaultText,
    description: singleNews?.description || defaultText,
    content: singleNews?.content || [],
    headImage: singleNews?.headImage || '',
    tags: singleNews?.tags || [],
    visibility: singleNews?.visibility?.id || defaultVisibility,
  };

  const handleArchiveClick = () => {
    handleOpenModal({
      type: ModalType.CONFIRM_MODAL,
      props: {
        title: 'Archive news',
        message: 'Are you sure you want to archive this news?',
        onConfirm: async () => {
          await archiveNews({ variables: { shopId: shop.id, id: router.query.newsId as string } });
          await router.push('/online-shop/news');
        },
      },
    });
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
            await editNews({
              variables: {
                id: router.query.newsId as string,
                shopId: shop.id,
                ...values,
                content: getFilteredMediaContent(values.content),
              },
            });

            await router.push('/online-shop/news');
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError));
          }
        }}
      >
        {({ handleSubmit }) => (
          <PageForm
            visibilityOptions={newsMeta?.fields.visibility.options}
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
          />
        )}
      </Formik>
    </FormLanguageSwitcherProviderComponent>
  );
};

export default EditNews;
