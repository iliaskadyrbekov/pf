import React from 'react';

import { ShopAddressProfileContentLayout, ShopAddressProfileForm } from './components';
import { ShopAddressStepLayout } from './components/ShopAddressProfileContent/components';

import { ICountry } from 'src/shared/interfaces/Shop';

interface IShopAddressProfileProps {
  countriesOptions: ICountry[];
}

const ShopAddressProfile = ({ countriesOptions }: IShopAddressProfileProps) => {
  const steps = ['Finish this step', 'Connect to Stripe', 'Have fun!'];

  return (
    <React.Fragment>
      <ShopAddressProfileForm countriesOptions={countriesOptions} />
      <ShopAddressProfileContentLayout
        title="Ready - set - go!"
        description="The part that is important, after taking payment, is to promote your products & services. Use social media and other sales channels to tell your customers about your new booking website!"
        steps={steps.map((step, index) => (
          <ShopAddressStepLayout step={step} number={index + 1} key={step} />
        ))}
        gradient="./images/mesh-gradient.png"
      />
    </React.Fragment>
  );
};

export default ShopAddressProfile;
