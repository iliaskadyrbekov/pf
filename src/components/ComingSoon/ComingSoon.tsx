import React from 'react';

import ComingSoonLayout from './ComingSoonLayout';

const ComingSoon = () => {
  return (
    <ComingSoonLayout
      // TODO use next/image (can't use because can't enable webpack5 because of fullcalendar main css)
      icon={<img src="icons/payfaction-logo-white.svg" width={150} height={216} />}
      title="Coming soon"
    />
  );
};

export default ComingSoon;
