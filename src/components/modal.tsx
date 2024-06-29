import clsx from 'clsx';
import { ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ show, children, onClose }: ModalProps) => {
  return (
    <div className={clsx('modal', show ? 'block' : 'hidden')}>
      <section className="modal-main">{children}</section>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};
