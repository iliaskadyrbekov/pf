import React from 'react';

interface IModalLayoutProps {
  modal: React.ReactNode;
}

const classes = {
  wrapper: 'fixed z-[100] inset-0 overflow-y-auto',
  center: 'flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0',
  opacityWrapper: 'fixed inset-0 transition-opacity',
  opacity: 'absolute inset-0 bg-gray-500 opacity-75',
  span: 'hidden sm:inline-block sm:align-middle sm:h-screen',
  modalWrapper:
    'inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle',
};

const ModalLayout = ({ modal }: IModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.center}>
        <div className={classes.opacityWrapper}>
          <div className={classes.opacity} />
        </div>
        {/* This element is to trick the browser into centering the modal contents */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />
        <div className={classes.modalWrapper}>{modal}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
