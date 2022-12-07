import { GetServerSideProps } from 'next';
import React from 'react';

import { HeadTag } from '@components/common/Head';
import { withUserCheck } from 'src/lib/withUserCheck';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ user, shop }) => {
  if (shop) {
    return {
      props: {
        shop,
        user,
      },
      redirect: { destination: `/`, permanent: false },
    };
  }

  return {
    props: {
      user,
      shop,
    },
  };
});

const AccessDenied = () => {
  return (
    <React.Fragment>
      <HeadTag />
      <h1>Access denied</h1>
    </React.Fragment>
  );
};

export default AccessDenied;
