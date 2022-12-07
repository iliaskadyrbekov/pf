import React from 'react';

interface ICreateRentalEventModalLayoutProps {
  navigation: React.ReactNode;
  form: React.ReactNode;
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 flex flex-col space-y-4 min-w-[26rem]',
};

const CreateRentalEventModalLayout = ({ navigation, form }: ICreateRentalEventModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {navigation}
      {form}
    </div>
  );
};

export default CreateRentalEventModalLayout;
