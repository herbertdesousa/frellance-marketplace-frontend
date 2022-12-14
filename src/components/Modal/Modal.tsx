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
  title: React.ReactNode;
  onClose?(): void;
  onClickClose?(): void;
}

const Modal: React.ForwardRefRenderFunction<ModalRef, ModalProps> = (
  { className, children, title, onClose, onClickClose },
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

  const handleOnClickClose = useCallback(() => {
    if (onClickClose) onClickClose();
    closeModal();
  }, [closeModal, onClickClose]);

  if (!isVisible) return <></>;
  return (
    <div className="flex items-center justify-center ">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <div
        role="button"
        tabIndex={0}
        className={bgClassName}
        onClick={handleOnClickClose}
        onKeyDown={handleOnClickClose}
      />
      <div
        className={rootClassName}
        onTransitionEnd={() => setIsVisible(isOpened)}
      >
        <div className="flex justify-between items-center mb-8 w-full truncate">
          <h1 className="font-merriweather text-2xl font-semibold truncate">
            {title}
          </h1>
          <button type="button" className="ml-6" onClick={handleOnClickClose}>
            <MdClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default forwardRef(Modal);
