import {
  useContext,
  useRef,
  createContext,
  RefObject,
  useState,
  useImperativeHandle,
} from 'react';
import { Page } from '@/types/Page';

import Modal, { ModalProps, ModalRef } from '@/components/Modal';

const ModalContext = createContext<ModalType>({} as ModalType);

function useModal(): ModalType {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useCustomers must be used within an CustomersContext');
  }

  return context;
}

interface ModalRefUpdated {
  open(payload: ModalProps): void;
  close(): void;
}
interface ModalType {
  modalRef: RefObject<ModalRefUpdated>;
}

const ModalProvider: Page = ({ children }) => {
  const currentModalRef = useRef<ModalRef>(null);
  const modalRef = useRef<ModalRefUpdated>(null);

  const [payload, setPayload] = useState({} as ModalProps);

  useImperativeHandle(modalRef, () => ({
    open(_payload) {
      currentModalRef.current?.open();
      setPayload(_payload);
    },
    close() {
      currentModalRef.current?.close();
    },
  }));

  return (
    <>
      <ModalContext.Provider value={{ modalRef }}>
        {children}

        <Modal ref={currentModalRef} {...payload} />
      </ModalContext.Provider>
    </>
  );
};

export { ModalProvider, useModal };
