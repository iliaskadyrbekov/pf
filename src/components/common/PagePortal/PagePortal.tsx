import React from 'react';
import ReactDOM from 'react-dom';

interface IPageActionsPortalProps {
  children: React.ReactNode;
  querySelector: string;
}

const PageActionsPortal = ({ children, querySelector }: IPageActionsPortalProps) => {
  const [element, setElement] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setElement(document.querySelector(querySelector));
  }, []);

  if (typeof window === 'undefined' || !children || !element) {
    return null;
  }

  return ReactDOM.createPortal(children, element);
};

export default PageActionsPortal;
