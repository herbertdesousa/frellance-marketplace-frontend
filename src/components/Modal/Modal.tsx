import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import classNames from 'classnames';

import { MdClose } from 'react-icons/md';
import style from './Modal.module.css';

export interface ModalRef {
  open(): void;
  close(): void;
}

export interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  title: string;
  onClose?(): void;
}

const Modal: React.ForwardRefRenderFunction<ModalRef, ModalProps> = (
  { className, children, title, onClose },
  ref,
) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rootClassName = classNames(
    style.root,
    { [style['root-close']]: !isOpened },
    { [style['root-open']]: isOpened },
    className,
  );

  const bgClassName = classNames(
    style.bg,
    { [style['bg-open']]: isOpened },
    { [style['bg-close']]: !isOpened },
  );

  useImperativeHandle(ref, () => ({
    open() {
      openModal();
    },
    close() {
      closeModal();
    },
  }));

  const closeModal = useCallback(() => {
    if (onClose) onClose();
    setIsOpened(false);
  }, [onClose]);
  const openModal = useCallback(() => {
    setIsVisible(true);
    setTimeout(() => setIsOpened(true), 100);
  }, []);

  if (!isVisible) return <></>;
  return (
    <div className="flex items-center justify-center ">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <div
        role="button"
        tabIndex={0}
        className={bgClassName}
        onClick={() => closeModal()}
        onKeyDown={() => closeModal()}
      />
      <div
        className={rootClassName}
        onTransitionEnd={() => setIsVisible(isOpened)}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-merriweather text-2xl font-semibold">{title}</h1>
          <button type="button" className="" onClick={() => closeModal()}>
            <MdClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default forwardRef(Modal);
