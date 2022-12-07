import React from 'react';

interface IEditTicketEventModalLayoutProps {
  form: React.ReactNode;
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 flex flex-col space-y-4 w-[26rem]',
};

const EditAccommodationEventModalLayout = ({ form }: IEditTicketEventModalLayoutProps) => {
  return <div className={classes.wrapper}>{form}</div>;
};

export default EditAccommodationEventModalLayout;
