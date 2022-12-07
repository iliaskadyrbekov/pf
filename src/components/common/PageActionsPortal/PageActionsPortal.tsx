import React from 'react';
import ReactDOM from 'react-dom';

interface IPageActionsPortalProps {
  actions?: React.ReactNode;
}

const PageActionsPortal = ({ actions }: IPageActionsPortalProps) => {
  const [element, setElement] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setElement(document.querySelector('#page-actions'));
  }, []);

  if (typeof window === 'undefined' || !actions || !element) {
    return null;
  }

  return ReactDOM.createPortal(actions, element);
};

export default PageActionsPortal;
