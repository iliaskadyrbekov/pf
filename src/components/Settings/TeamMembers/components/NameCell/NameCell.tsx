import React from 'react';

import { AvatarLayout } from 'src/layouts';
import { CircleIcon } from '@components/Icons';

import { IProfile } from 'src/shared/interfaces';
import { CellLayout } from '@components/common/Table/components';

interface INameCellProps {
  item: {
    email: string;
    profile?: IProfile;
  };
  index: number;
}

const classes = {
  wrapper: 'flex items-center space-x-4',
  name: 'text-sm font-medium leading-tight text-gray-800 mb-2',
  email: 'text-sm leading-tight text-gray-900',
};

const NameCell = ({ item: { email, profile }, index }: INameCellProps) => {
  const name = profile ? `${profile.firstName} ${profile.lastName}` : '';
  const avatar = profile?.avatar ? <AvatarLayout url={profile.avatar} /> : <CircleIcon fill="#4F49F5" />;

  return (
    <CellLayout key={index}>
      <div className={classes.wrapper}>
        {avatar}
        <div>
          {name && <div className={classes.name}>{name}</div>}
          <div className={classes.email}>{email}</div>
        </div>
      </div>
    </CellLayout>
  );
};

export default NameCell;
