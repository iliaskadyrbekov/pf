import React from 'react';

interface IShopProfileLayoutProps {
  title: string;
  subtitle: string;
  selling: React.ReactNode;
  revenue: React.ReactNode;
  industry: React.ReactNode;
  question: string;
  isForClient: React.ReactNode;
  button: React.ReactNode;
}

const classes = {
  wrapper:
    'mt-12 sm:mt-20 lg:col-start-1 lg:col-span-1 px-4 sm:px-11 pb-10 lg:pb-4 mx-auto lg:mx-0 max-w-[36rem] lg:max-w-full w-full',
  title: 'text-2xl font-medium leading-relaxed text-center text-gray-600',
  subtitleWrapper: 'px-12 mt-2.25 mb-8',
  subtitle: 'text-sm text-center text-gray-400',
  form: 'flex flex-col items-center',
  selects: 'space-y-4 w-full',
  checkboxWrapper: 'mt-5',
  question: 'mb-2',
  button: 'mt-5 mb-8',
};

const ShopProfileFormLayout: React.FC<IShopProfileLayoutProps> = ({
  title,
  subtitle,
  selling,
  revenue,
  industry,
  question,
  isForClient,
  button,
}: IShopProfileLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.subtitleWrapper}>
        <p className={classes.subtitle}>{subtitle}</p>
      </div>
      <div className={classes.form}>
        <div className={classes.selects}>
          {selling}
          {revenue}
          {industry}
        </div>
        <div className={classes.checkboxWrapper}>
          <p className={classes.question}>{question}</p>
          {isForClient}
        </div>
        <div className={classes.button}>{button}</div>
      </div>
    </div>
  );
};

export default ShopProfileFormLayout;
