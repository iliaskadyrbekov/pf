import React from 'react';

import TabLayout from './layouts/TabLayout';

interface ILayoutSharedProps {
  isActive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

interface ITabProps<T> {
  value: T;
  selected?: boolean;
  children?: React.ReactNode;
  Layout?: JSX.Element | ((props: ILayoutSharedProps) => JSX.Element);
  onChange?: (tab: T) => void;
}

const Tab = <T,>({ onChange, value, selected, Layout = TabLayout, children }: ITabProps<T>) => {
  const handleClick = () => {
    if (!selected && onChange) {
      onChange(value);
    }
  };

  const LayoutComponent =
    typeof Layout === 'function' ? (
      <Layout isActive={selected} onClick={handleClick}>
        {children}
      </Layout>
    ) : (
      React.cloneElement(Layout, { isActive: selected, onClick: handleClick }, children)
    );

  return LayoutComponent;
};

export default Tab;
