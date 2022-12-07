import React from 'react';
import moment from 'moment-timezone';
import { Formik } from 'formik';

import { Button } from '@components/common/Button';
import ExcelAccommodationOrderItemsModalLayout from './ExcelAccommodationOrderItemsModalLayout';
import {
  EXCEL_ACCOMMODATION_BOOKINGS,
  IExcelAccommodationBookingsRes,
  IExcelAccommodationBookingsVars,
} from './queries/excelAccommodationBookings';
import { useApollo } from 'src/lib/apolloClient';
import { FormLanguageContext, ShopContext } from 'src/context';
import { Checkbox } from '@components/common/Checkbox';
import { FormField } from '@components/common/FormFields/FormField';
import { getS3FileUrl } from '@utils/getS3FileUrl';
import { DateInput, Select } from '@components/common';
import { useActivitiesByTypeQuery } from '../queries/activitiesByType';
import { assertFilters } from '../helpers/assertFilters';
import { ActivityType } from 'src/shared/enums';

interface IExcelAccommodationOrderItemsModalProps {
  onClose(): void;
  filters: {
    date?: {
      from: Date;
      to: Date;
    } | null;
  };
}

const lablesByKeys = {
  reservationId: 'Reservation ID',
  dateStart: 'Start date',
  dateEnd: 'End date',
  assignedName: 'Assigned name',
  productName: 'Product name',
  paymentStatus: 'Payment status',
  formFields: 'Checkout form',
};

const ExcelAccommodationOrderItemsModal = ({ onClose, filters }: IExcelAccommodationOrderItemsModalProps) => {
  const { shop } = React.useContext(ShopContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const client = useApollo();

  const { data } = useActivitiesByTypeQuery({ variables: { shopId: shop?.id, type: ActivityType.ACCOMMODATION } });
  const activities = data?.activities || [];
  const activitiesOptions = [...activities]
    .sort((a, b) => a.order - b.order)
    .map(({ name, id }) => ({ value: id, label: getMultiLanguageValue(name) }));

  const initialValues = {
    filters: {
      date: filters.date || null,
      activity: null as null | string,
    },
    fields: {
      reservationId: false,
      dateStart: false,
      dateEnd: false,
      assignedName: false,
      productName: false,
      paymentStatus: false,
      formFields: false,
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus }) => {
        try {
          assertFilters(values.filters);
        } catch (errors) {
          setStatus(errors);

          return;
        }

        if (Object.values(values.fields).some((v) => !!v)) {
          const { data } = await client.query<IExcelAccommodationBookingsRes, IExcelAccommodationBookingsVars>({
            query: EXCEL_ACCOMMODATION_BOOKINGS,
            fetchPolicy: 'network-only',
            variables: {
              shopId: shop?.id,
              language: shop?.language.defaultLanguage.language.id,
              filters: values.filters,
              fields: values.fields,
            },
          });

          const url = data.excelAccommodationBookings;

          const link = document.createElement('a');
          link.href = getS3FileUrl(url);
          link.setAttribute('download', '');

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode?.removeChild(link);

          onClose();
        }
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <ExcelAccommodationOrderItemsModalLayout
          title="Download"
          filters={[
            <FormField
              valueNameToValue={({ from, to }: { from: Date | null; to: Date | null }) => ({
                startDate: from,
                endDate: to,
              })}
              onChange={(value: Date[]) => ({
                from: value[0] && moment(value[0]).startOf('day').toDate(),
                to: value[1] && moment(value[1]).endOf('day').toDate(),
              })}
              key="date-filter"
              name="filters.date"
              component={DateInput}
              label="Date"
              selectsRange={true}
              dateFormat="dd/MM/yyyy"
            />,
            <FormField
              placeholder="Select activity"
              key="activity-filter"
              name="filters.activity"
              component={Select}
              label="Activity"
              options={activitiesOptions}
            />,
          ]}
          form={[
            <Checkbox
              key="selectAll"
              label="Select all"
              value={Object.values(values.fields).every((v) => !!v) ? 1 : undefined}
              onChange={() => {
                const isSelected = Object.values(values.fields).every((v) => !!v);
                const newValues = Object.keys(values.fields).reduce<Record<keyof typeof values['fields'], boolean>>(
                  (acc, cur) => ({ ...acc, [cur]: !isSelected }),
                  values.fields,
                );
                setFieldValue('fields', newValues);
              }}
            />,
            Object.keys(values.fields).map((key) => (
              <FormField
                key={`fields.${key}`}
                name={`fields.${key}`}
                label={lablesByKeys[key as keyof typeof values['fields']]}
                component={Checkbox}
              />
            )),
          ]}
          actions={[
            <Button variant="contained" color="default" key="1" onClick={onClose}>
              Cancel
            </Button>,
            <Button onClick={() => handleSubmit()} variant="contained" color="primary" key="2">
              Download Excel
            </Button>,
          ]}
        />
      )}
    </Formik>
  );
};

export default ExcelAccommodationOrderItemsModal;
