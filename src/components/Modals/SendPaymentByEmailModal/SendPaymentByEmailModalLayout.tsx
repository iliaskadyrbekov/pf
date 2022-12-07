import React from 'react';

interface ISendPaymentByEmailModalLayoutProps {
  title: React.ReactNode;
  amount: React.ReactNode;
  email: React.ReactNode;
  expiresAt: React.ReactNode;
  actions: React.ReactNode;
  enablePartialPayment: React.ReactNode;
  firstPayment?: React.ReactNode;
  firstPaymentCaption?: React.ReactNode;
  endPaymentDate?: React.ReactNode;
  endPaymentDateCaption?: React.ReactNode;
  endPaymentReminderDate?: React.ReactNode;
  endPaymentReminderFirstCaption: React.ReactNode;
  endPaymentReminderSecondCaption: React.ReactNode;
  remark: string;
  partialPaymentEnabled: boolean;
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 flex flex-col items-left space-y-4 w-[444px]',
  title: 'text-lg font-medium leading-normal text-gray-900',
  amount: 'text-sm leading-tight text-gray-500',
  actionsWrapper: 'w-full flex justify-end flex-row space-x-4',
  remark: 'text-xs leading-none text-center text-gray-400 max-w-[25rem]',
  paymentWrapper: 'flex space-x-4 items-center w-full',
  paymentInputWrapper: 'w-32',
  paymentCaptionWrapper: 'text-sm leading-tight text-gray-500 mt-4',
  endPaymentReminderWrapper: 'w-full',
  endPaymentReminderInputWrapper: 'inline-block px-2',
  expiresAtWrapper: 'w-[200px]',
  emailWrapper: 'w-[270px]',
  partialPaymentInfoWrapper: 'space-y-4',
};

const SendPaymentByEmailModalLayout = ({
  title,
  amount,
  email,
  actions,
  remark,
  expiresAt,
  enablePartialPayment,
  firstPayment,
  firstPaymentCaption,
  endPaymentDate,
  endPaymentDateCaption,
  endPaymentReminderDate,
  endPaymentReminderFirstCaption,
  endPaymentReminderSecondCaption,
  partialPaymentEnabled,
}: ISendPaymentByEmailModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <p className={classes.amount}>{amount}</p>
      <div className={classes.expiresAtWrapper}>{expiresAt}</div>
      <div className={classes.emailWrapper}>{email}</div>
      {enablePartialPayment}
      {partialPaymentEnabled && (
        <div className={classes.partialPaymentInfoWrapper}>
          <div className={classes.paymentWrapper}>
            <div className={classes.paymentInputWrapper}>{firstPayment}</div>
            <div className={classes.paymentCaptionWrapper}>{firstPaymentCaption}</div>
          </div>
          <div className={classes.paymentWrapper}>
            <div className={classes.paymentInputWrapper}>{endPaymentDate}</div>
            <div className={classes.paymentCaptionWrapper}>{endPaymentDateCaption}</div>
          </div>
          <div className={classes.endPaymentReminderWrapper}>
            <span>{endPaymentReminderFirstCaption}</span>
            <div className={classes.endPaymentReminderInputWrapper}>{endPaymentReminderDate}</div>
            <span>{endPaymentReminderSecondCaption}</span>
          </div>
        </div>
      )}
      <div className={classes.actionsWrapper}>{actions}</div>
      <p className={classes.remark}>{remark}</p>
    </div>
  );
};

export default SendPaymentByEmailModalLayout;
