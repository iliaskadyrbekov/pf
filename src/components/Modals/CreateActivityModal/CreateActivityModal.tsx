import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import CreateActivityModalLayout from './CreateActivityModalLayout';
import { ActivityInfoLayout, Activities, Actions } from './components';

import { ACTIVITIES } from './constants';
import { useCreateActivity } from './mutations';
import { ShopContext } from 'src/context/ShopContext';
import { getDefaultLanguageWithCountry } from 'src/helpers';
import { ActivityType } from 'src/shared/enums/ActivityType';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { FormLanguageContext, FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';

interface ICreateActivityModalProps {
  onClose: () => void;
  order: number;
}

const CreateActivityModal = ({ onClose, order }: ICreateActivityModalProps) => {
  const router = useRouter();

  const { availableLangs } = React.useContext(FormLanguageContext);
  const { shop } = React.useContext(ShopContext);

  const { mutate: createActivity, loading } = useCreateActivity();

  const defaultName = getDefaultLanguageWithCountry(availableLangs);

  return (
    <FormLanguageSwitcherProviderComponent>
      <Formik
        initialValues={{ type: ActivityType.TICKET, name: defaultName }}
        onSubmit={async (values, { setStatus }) => {
          try {
            const { data } = await createActivity({ variables: { ...values, shopId: shop?.id, order } });
            onClose();
            await router.push(`/products/activity/${data?.createActivity.id}/edit`);
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError));
            return;
          }
        }}
      >
        {({ values }) => {
          const currentActivity = ACTIVITIES.find(({ type }) => type === values.type);
          const ActivityIcon = currentActivity?.Icon || (() => null);

          return (
            <CreateActivityModalLayout
              activities={<Activities />}
              activityInfo={
                <ActivityInfoLayout
                  icon={<ActivityIcon />}
                  name={currentActivity?.name}
                  description={currentActivity?.description}
                />
              }
              actions={<Actions onClose={onClose} loading={loading} />}
            />
          );
        }}
      </Formik>
    </FormLanguageSwitcherProviderComponent>
  );
};

export default CreateActivityModal;
