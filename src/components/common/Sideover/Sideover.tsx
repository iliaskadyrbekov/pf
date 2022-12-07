import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CloseButton } from './components';

interface ISideoverProps {
  isOpen: boolean;
  onClose(): void;
  children: React.ReactNode;
}

const Sideover = ({ isOpen, onClose, children }: ISideoverProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 overflow-hidden z-[2147483002]" open={isOpen} onClose={onClose}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed top-0 bottom-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <CloseButton onClose={onClose} />
                  </div>
                </Transition.Child>
                <div className="h-full bg-white overflow-y-auto">{children}</div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Sideover;
