import React from 'react';

import { ShopProfileForm, ShopProfileUpdateLayout } from './components';

interface IOption {
  label: string;
  id: string;
}

interface IShopProfileProps {
  onNextStep: () => void;
  sellingOptions: IOption[];
  revenueOptions: IOption[];
  industryOptions: IOption[];
}

const ShopProfile = ({ onNextStep, sellingOptions, revenueOptions, industryOptions }: IShopProfileProps) => {
  return (
    <React.Fragment>
      <ShopProfileForm
        onNextStep={onNextStep}
        sellingOptions={sellingOptions}
        revenueOptions={revenueOptions}
        industryOptions={industryOptions}
      />
      <ShopProfileUpdateLayout
        date="August 2021"
        status="Now available!"
        title="Rentals"
        subtitle="With ease create a rental page for your customers to rent your equipments and more."
        description="Decide how many products and when you want to rent out, automatic availability, start time and duration calculation. Made for you to have less hassle and more business."
        gradient="./images/mesh-gradient.png"
        monthUpdates="./images/monthUpdates.png"
      />
    </React.Fragment>
  );
};

export default ShopProfile;
