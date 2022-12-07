import React from 'react';
import TabsLayout from './layouts/TabsLayout';

interface ITabsProps<T> {
  children: React.ReactNode;
  value: T;
  onChange?: (v: T) => void;
  isSelected?: (v: T) => boolean;
  Layout?: ((props: { children: React.ReactNode }) => JSX.Element) | JSX.Element;
}

const Tabs = <T,>({ children, value, isSelected, onChange, Layout = TabsLayout }: ITabsProps<T>) => {
  const Tabs = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    return React.cloneElement(
      child,
      {
        selected: isSelected ? isSelected(child.props.value) : child.props.value === value,
        onChange,
      },
      child.props.children,
    );
  });

  const LayoutComponent = typeof Layout === 'function' ? <Layout>{Tabs}</Layout> : React.cloneElement(Layout, {}, Tabs);

  return LayoutComponent;
};

export default Tabs;
