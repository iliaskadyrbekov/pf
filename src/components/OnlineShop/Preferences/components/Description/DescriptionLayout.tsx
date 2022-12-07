import React from 'react';

interface IDescriptionLayoutProps {
  homepageTitle: React.ReactNode;
  homepageDescription: React.ReactNode;
  homepageHeadImage: React.ReactNode;
  langSwitcher: React.ReactNode;
}

const classes = {
  wrapper: 'flex space-x-20 items-start',
  form: 'flex flex-1 flex-col space-y-4',
};

const DescriptionLayout = ({
  homepageTitle,
  homepageDescription,
  homepageHeadImage,
  langSwitcher,
}: IDescriptionLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        {homepageTitle}
        {homepageDescription}
        {homepageHeadImage}
      </div>
      <div>{langSwitcher}</div>
    </div>
  );
};

export default DescriptionLayout;
