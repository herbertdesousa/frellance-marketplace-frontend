import { Dispatch, RefObject, SetStateAction } from 'react';
import { ModalRef } from '@/components/Modal';

export interface User {
  uid: string;
  name: string | null;
  picture: string | null;
  signInMethod: string;
  contacts: UserContact[];
  notificationOnChatMessages: boolean;
}
export interface UserContact {
  id: string;
  type: 'email' | 'whatsapp' | 'phone';
  contact: string;
}

export interface AuthContextData {
  user: User | undefined;
  authModalRef: RefObject<ModalRef>;
  auth: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: {
    state: boolean;
    set: Dispatch<SetStateAction<boolean>>;
  };
}
