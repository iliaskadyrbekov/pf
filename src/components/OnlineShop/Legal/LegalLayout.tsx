import React from 'react';

interface ILegalLayoutProps {
  navigation: React.ReactNode;
  editorBlock: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-5',
};

const LegalLayout = ({ navigation, editorBlock, actions }: ILegalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {navigation}
      {editorBlock}
      {actions}
    </div>
  );
};

export default LegalLayout;
