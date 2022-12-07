import React from 'react';
import { GetServerSideProps } from 'next';

import { HeadTag } from '@components/common/Head';
import { ProfileForm } from '@components/ProfileForm';
import { withUserCheck } from 'src/lib/withUserCheck';

const AccountSetup = () => {
  return (
    <React.Fragment>
      <HeadTag />
      <ProfileForm />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ user, shop }) => {
  if (shop?.profile) {
    return {
      redirect: { destination: `/`, permanent: false },
      props: {
        user,
        shop,
      },
    };
  }

  return {
    props: {
      user,
      shop,
    },
  };
});
export default AccountSetup;
