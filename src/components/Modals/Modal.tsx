import React from 'react';
import ReactDOM from 'react-dom';

import ModalLayout from './ModalLayout';

interface IModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal = ({ isOpen, children }: IModalProps) => {
  return isOpen ? ReactDOM.createPortal(<ModalLayout modal={children} />, document.body) : null;
};

export default Modal;
