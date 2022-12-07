import React from 'react';

interface IAddTeamMemberModalLayoutProps {
  title: React.ReactNode;
  email: React.ReactNode;
  closeButton: React.ReactNode;
  addUserButton: React.ReactNode;
}

const classes = {
  wrapper: 'p-6 w-[32.5rem]',
  header: 'flex justify-between items-center space-x-4 mb-11',
  title: 'flex items-center text-lg font-medium leading-7 text-gray-900',
  footer: 'flex justify-end mt-5',
};

const AddTeamMemberModalLayout = ({ title, closeButton, email, addUserButton }: IAddTeamMemberModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.title}>{title}</div>
        {closeButton}
      </div>
      {email}
      <div className={classes.footer}>{addUserButton}</div>
    </div>
  );
};

export default AddTeamMemberModalLayout;
