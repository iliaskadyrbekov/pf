import React from 'react';

interface ICreateAccommodationEventModalLayoutProps {
  navigation: React.ReactNode;
  form: React.ReactNode;
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 flex flex-col space-y-4 w-[26rem]',
};

const CreateAccommodationEventModalLayout = ({ navigation, form }: ICreateAccommodationEventModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {navigation}
      {form}
    </div>
  );
};

export default CreateAccommodationEventModalLayout;
