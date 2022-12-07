import React from 'react';
import { Formik } from 'formik';
import moment from 'moment-timezone';

import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import SendPaymentByEmailModalLayout from './SendPaymentByEmailModalLayout';
import { Spinner } from '@components/common/Spinner';
import { ShopContext } from 'src/context';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { useSendOfferByEmail } from './mutations/sendOfferByEmail';
import { FormField } from '@components/common/FormFields/FormField';
import { getDiscountPrice, getLanguageParam } from '../../../helpers';
import { DateInput, NumberInput, Toggle } from '@components/common';
import { AmountOrPercentageInput } from '@components/common/AmountOrPercentageInput';
import { DiscountType } from 'src/shared/enums';
import { InputSelectRightLayout } from '@components/common/FormFields/FormInputSelectNativeField/components';

interface IPartialPayment {
  firstPaymentAmount: number;
  endPaymentDate: Date;
  endPaymentReminderDate: Date;
}

interface ISendPaymentByEmailModalProps {
  onClose(): void;
  onCloseWithRedirect(): void;

  email: string;
  companyName?: string;
  phone: string;
  fullName: string;
  orderId: string;
  amount: number;
  note: string;
  currency: string;
  expiresAt?: Date;
  partialPayment?: IPartialPayment;
}

const SendPaymentByEmailModal = ({
  onClose,
  onCloseWithRedirect,

  amount,
  currency,
  email,
  companyName,
  fullName,
  phone,
  note,
  orderId,
  expiresAt,
  partialPayment,
}: ISendPaymentByEmailModalProps) => {
  const { shop } = React.useContext(ShopContext);

  const { mutate: sendOfferByEmail, loading } = useSendOfferByEmail();

  if (!shop) {
    onClose();
    return null;
  }

  const initialValues = {
    sendTo: email,
    expiresAt: expiresAt ? new Date(expiresAt) : null,
    enablePartialPayment: !!partialPayment,
    partialPayment: {
      firstPayment: {
        value: partialPayment?.firstPaymentAmount || 10,
        type: partialPayment?.firstPaymentAmount ? DiscountType.AMOUNT : DiscountType.PERCENTAGE,
      },
      endPaymentDate: partialPayment?.endPaymentDate ? new Date(partialPayment.endPaymentDate) : null,
      endPaymentReminderDate:
        partialPayment?.endPaymentReminderDate && partialPayment?.endPaymentDate
          ? moment(partialPayment.endPaymentDate).diff(partialPayment.endPaymentReminderDate, 'days')
          : null,
    },
  };

  const isPartialPayment = (
    enablePartialPayment: boolean,
    partialPayment?: {
      firstPaymentAmount: number;
      endPaymentDate: Date | null;
      endPaymentReminderDate: Date | null;
    },
  ): partialPayment is IPartialPayment => {
    if (partialPayment && enablePartialPayment) {
      const { firstPaymentAmount, endPaymentDate, endPaymentReminderDate } = partialPayment;

      if (!firstPaymentAmount || !endPaymentDate || !endPaymentReminderDate) {
        return false;
      }

      return true;
    }

    return false;
  };

  const handleValidate = (values: typeof initialValues) => {
    const { sendTo, expiresAt } = values;

    const errors: {
      sendTo?: string[];
      expiresAt?: string[];
      'partialPayment.firstPayment'?: string[];
      'partialPayment.endPaymentDate'?: string[];
      'partialPayment.endPaymentReminderDate'?: string[];
    } = {};

    if (!sendTo) {
      errors.sendTo = ['Enter valid email'];
    }

    if (!expiresAt) {
      errors.expiresAt = ['Enter valid date'];
    }

    if (values.partialPayment && values.enablePartialPayment) {
      const { firstPayment, endPaymentDate, endPaymentReminderDate } = values.partialPayment;

      if (!firstPayment) {
        errors['partialPayment.firstPayment'] = ['Enter valid amount'];
      }

      if (!endPaymentDate) {
        errors['partialPayment.endPaymentDate'] = ['Enter valid end date'];
      }

      if (!endPaymentReminderDate) {
        errors['partialPayment.endPaymentReminderDate'] = ['Enter valid amount'];
      }
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus }) => {
        const validateResult = handleValidate(values);
        const defaultLanguage = shop.language.defaultLanguage;
        const languageParam = getLanguageParam(defaultLanguage.language.id, defaultLanguage.country.id);

        if (Object.values(validateResult).length) {
          setStatus(validateResult);
          return;
        }

        try {
          const successUrl = `https://${shop.domain}/${languageParam}/order/${orderId}`;
          const cancelUrl = `https://${shop.domain}/${languageParam}/cart`;

          const partialPayment = values.enablePartialPayment
            ? {
                firstPaymentAmount: amount - getDiscountPrice(amount, values.partialPayment.firstPayment),
                endPaymentDate: moment(values.partialPayment.endPaymentDate).endOf('day').toDate(),
                endPaymentReminderDate: moment(values.partialPayment.endPaymentDate)
                  .subtract(values.partialPayment.endPaymentReminderDate, 'days')
                  .endOf('day')
                  .toDate(),
              }
            : undefined;

          await sendOfferByEmail({
            variables: {
              shopId: shop?.id,
              input: {
                note,
                orderId,
                language: {
                  lang: shop.language.defaultLanguage.language.id,
                  country: shop.language.defaultLanguage.country.id,
                },
                successUrl,
                cancelUrl,
                expiresAt: values.expiresAt as Date,
                buyer: { email, companyName, fullName, phone },
                sendTo: values.sendTo,
                partialPayment: isPartialPayment(values.enablePartialPayment, partialPayment)
                  ? partialPayment
                  : undefined,
              },
            },
          });
          onCloseWithRedirect();
        } catch (err) {
          setStatus(getValidationErrors(err as IGraphqlError));
          return;
        }
      }}
    >
      {({ handleSubmit, isSubmitting, values }) => (
        <SendPaymentByEmailModalLayout
          partialPaymentEnabled={values.enablePartialPayment}
          title="Send Offer by Email"
          amount={`Amount to receive: ${amount.toFixed(2)}${currency}`}
          expiresAt={
            <FormField
              valueName="selected"
              dateFormat="dd/MM/yyyy"
              name="expiresAt"
              label="Offer expires"
              onChange={(date: Date) => moment(date).endOf('day').toDate()}
              component={DateInput}
            />
          }
          email={<FormField component={Input} name="sendTo" placeholder="Email address" label="Send to email" />}
          enablePartialPayment={
            <FormField
              component={Toggle}
              wrapperClassName="w-full"
              label="Enable partial payment"
              name="enablePartialPayment"
            />
          }
          firstPayment={
            <FormField
              label="First payment"
              component={AmountOrPercentageInput}
              name="partialPayment.firstPayment"
              maxByAmount={amount.toFixed(2)}
            />
          }
          firstPaymentCaption={
            <span>{`Amount ${(amount - getDiscountPrice(amount, values.partialPayment.firstPayment)).toFixed(2)} ${
              shop.currency.symbolNative
            }`}</span>
          }
          endPaymentDate={
            <FormField
              valueName="selected"
              dateFormat="dd/MM/yyyy"
              label="End payment date"
              onChange={(date: Date) => moment(date).endOf('day').toDate()}
              component={DateInput}
              name="partialPayment.endPaymentDate"
            />
          }
          endPaymentDateCaption={
            <span>{`Amount ${getDiscountPrice(amount, values.partialPayment.firstPayment).toFixed(2)} ${
              shop.currency.symbolNative
            }`}</span>
          }
          endPaymentReminderFirstCaption="Send email reminder"
          endPaymentReminderDate={
            <FormField
              component={NumberInput}
              wrapperClassName="w-24"
              className="pr-14"
              name="partialPayment.endPaymentReminderDate"
              disableFractional
              disableNegative
              validateOnChange={true}
              max={365}
              rightElement={<InputSelectRightLayout className="px-2 text-gray-500">days</InputSelectRightLayout>}
            />
          }
          endPaymentReminderSecondCaption="before end payment date"
          actions={[
            <Button variant="contained" color="default" key="1" onClick={onClose}>
              Cancel
            </Button>,
            <Button
              disabled={isSubmitting}
              icon={loading ? <Spinner /> : null}
              variant="contained"
              color="primary"
              key="2"
              onClick={() => handleSubmit()}
            >
              Send
            </Button>,
          ]}
          remark="Offer will automatically be invalidated and availability be released if the payment is not received before duration expires."
        />
      )}
    </Formik>
  );
};

export default SendPaymentByEmailModal;
