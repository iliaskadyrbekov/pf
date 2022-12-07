import React from 'react';

interface ITeamMembersLayoutProps {
  tabsBar: React.ReactNode;
  usersTable: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  usersTable: 'mt-5',
};

const TeamMembersLayout = ({ tabsBar, usersTable, actions }: ITeamMembersLayoutProps) => {
  return (
    <div>
      {tabsBar}
      <div className={classes.usersTable}>{usersTable}</div>
      {actions}
    </div>
  );
};

export default TeamMembersLayout;
