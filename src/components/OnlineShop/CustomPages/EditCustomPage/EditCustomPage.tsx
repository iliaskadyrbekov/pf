import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { PageForm } from '@components/OnlineShop/components';

import { usePageMetaQuery } from 'src/graphql/queries/pageMeta';
import { useSinglePageQuery } from 'src/graphql/queries/singlePage';
import {
  FormLanguageContext,
  FormLanguageSwitcherProviderComponent,
  ModalContext,
  ModalType,
  ShopContext,
} from 'src/context';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { useArchivePage, useEditPage } from '@components/OnlineShop/CustomPages/mutations';
import { getDefaultLanguageWithCountry, getFilteredMediaContent, isEmptyField } from 'src/helpers';

const EditCustomPage = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);
  const { availableLangs } = React.useContext(FormLanguageContext);

  const { data: newsPageData } = usePageMetaQuery();
  const { mutate: editPage, loading } = useEditPage();
  const { mutate: archivePage } = useArchivePage();
  const { data: singlePageData } = useSinglePageQuery({
    id: router.query.pageId as string,
    shopId: shop?.id,
    withDraft: true,
  });

  if (!shop) {
    return null;
  }

  const pageMeta = newsPageData?.pageMeta;
  const singlePage = singlePageData?.singlePage;

  const defaultText = getDefaultLanguageWithCountry(availableLangs);
  const defaultVisibility = pageMeta?.fields.visibility.options && pageMeta?.fields.visibility.options[0]?.id;

  const initialValues = {
    name: singlePage?.name || defaultText,
    description: singlePage?.description || defaultText,
    content: singlePage?.content || [],
    headImage: singlePage?.headImage || '',
    tags: singlePage?.tags || [],
    visibility: singlePage?.visibility?.id || defaultVisibility,
  };

  const handleArchiveClick = () => {
    handleOpenModal({
      type: ModalType.CONFIRM_MODAL,
      props: {
        title: 'Archive page',
        message: 'Are you sure you want to archive this page?',
        onConfirm: async () => {
          await archivePage({ variables: { shopId: shop.id, id: router.query.pageId as string } });
          await router.push('/online-shop/pages');
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
            await editPage({
              variables: {
                id: router.query.pageId as string,
                shopId: shop.id,
                ...values,
                content: getFilteredMediaContent(values.content),
              },
            });

            await router.push('/online-shop/pages');
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError));
          }
        }}
      >
        {({ handleSubmit }) => (
          <PageForm
            visibilityOptions={pageMeta?.fields.visibility.options}
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

export default EditCustomPage;
