import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';

import LanguagesLayout from './LanguagesLayout';
import { AvailableLanguagesForm } from './components';
import { IShop } from 'src/shared/interfaces/Shop';
import { IShopFormMeta } from 'src/api/shopForm';
import { EDIT_SHOP, IEditShop, IEditShopVars } from './mutations';
import { Button } from '@components/common/Button';
import { SpinnerIcon } from '@components/Icons';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { PageActionsPortal } from '@components/common/PageActionsPortal';
import { useRouter } from 'next/router';
// import { SettingsItemLayout, DescriptionLayout } from '../components';

interface IGeneralProps {
  data: IShop;
  meta: IShopFormMeta;
}

const Languages = ({ data, meta }: IGeneralProps) => {
  const [editShop, { loading }] = useMutation<IEditShop, IEditShopVars>(EDIT_SHOP);
  const router = useRouter();

  return (
    <Formik
      initialValues={{ language: data.language }}
      onSubmit={async ({ language }, { setStatus }) => {
        const { defaultLanguage, availableLanguages } = language;
        const variables = {
          shopId: data.id,
          language: {
            defaultLanguage: {
              language: defaultLanguage.language.id,
              country: defaultLanguage.country.id,
            },
            availableLanguages: availableLanguages.map(({ language, country }) => ({
              language: language.id,
              country: country.id,
            })),
          },
        };
        try {
          await editShop({ variables });

          router.push('/settings');
        } catch (err) {
          setStatus(getValidationErrors(err as IGraphqlError));
        }
      }}
    >
      {({ handleSubmit }) => (
        <LanguagesLayout
          table={
            <AvailableLanguagesForm languageWithCountryOptions={meta.fields.languageWithCountry.options} />
            // <SettingsItemLayout
            //   key="1"
            //   description={<DescriptionLayout title="Shop languages" description="Description" />}
            //   form={<AvailableLanguagesForm languagesOptions={meta.fields.language.options} />}
            // />
          }
          actions={
            <PageActionsPortal
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
          }
        />
      )}
    </Formik>
  );
};

export default Languages;
