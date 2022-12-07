import React from 'react';
import { Menu, Transition } from '@headlessui/react';

import { DefaultLabel } from './components';
import { DefaultMenuItem } from './components/DefaultMenuItem';

interface IItem<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface IDropdownProps<T> {
  items: IItem<T>[];
  onItemClick?: (value: T) => void;
  label?: React.ReactNode;
  renderItem?: (value: T) => React.ReactNode;
  renderLabel?: () => React.ReactNode;
}

const Dropdown = <T,>({ label, renderLabel, items, onItemClick, renderItem }: IDropdownProps<T>) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="focus:outline-none">
              {renderLabel ? renderLabel() : <DefaultLabel>{label}</DefaultLabel>}
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                {items.map(({ value, label, disabled }, index) => (
                  <Menu.Item key={index}>
                    {({ active }) =>
                      renderItem ? (
                        renderItem(value)
                      ) : (
                        <DefaultMenuItem value={value} onClick={onItemClick} isActive={active} isDisabled={disabled}>
                          {label}
                        </DefaultMenuItem>
                      )
                    }
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default Dropdown;
