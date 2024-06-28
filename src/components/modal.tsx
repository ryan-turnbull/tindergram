import { ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ show, children, onClose }: ModalProps) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">{children}</section>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};
