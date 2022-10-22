import { Page } from '@/types/Page';
import Link from 'next/link';

import { MdMail, MdPhone } from 'react-icons/md';

import * as transform from '@/utils/transform';

import { useAuth } from '@/hooks/auth';
import { useModal } from '@/hooks/modal';
import { Button } from '@/components';

import { api } from '@/services/api';
import { useCallback } from 'react';

interface Contact {
  id: string;
  type: 'email' | 'phone' | 'whatsapp';
  contact: string;
}

interface Props {
  itemId: string;
  userId: string;
}

const ListDetailsInfoContact: Page<Props> = ({ itemId, userId }) => {
  const { user, authModalRef } = useAuth();
  const { modalRef } = useModal();

  const handleOnClickContact = useCallback(async () => {
    if (!user) {
      authModalRef.current?.open();
      return;
    }

    const finded = await api.get<Contact[]>('/users/contacts/item', {
      params: { itemId, ownerItemUserId: userId },
    });

    const parsedFinded: ({ href: string } & Contact)[] = finded.data.map(
      item => {
        const href = { value: '' };
        if (item.type === 'email') href.value = `mailto:${item.contact}`;
        if (item.type === 'phone') href.value = `tel:${item.contact}`;
        if (item.type === 'whatsapp')
          href.value = `https://api.whatsapp.com/send?phone=${item.contact.replace(
            /\D/g,
            '',
          )}`;

        return {
          ...item,
          href: href.value,
        };
      },
    );

    modalRef.current?.open({
      title: 'Contatos',
      children: (() => (
        <ul>
          {parsedFinded.map(item => (
            <li key={item.id}>
              <Link href={item.href} passHref>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-full py-2 px-2 border border-gray1 mb-1"
                >
                  <div className="mr-2 text-gray3">
                    {(item.type === 'whatsapp' || item.type === 'phone') && (
                      <MdPhone size={24} />
                    )}
                    {item.type === 'email' && <MdPhone size={24} />}
                  </div>
                  <p>{item.contact}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ))(),
    });
  }, [authModalRef, itemId, modalRef, user]);

  return (
    <>
      <div className="block fixed md:hidden left-0 bottom-0 right-0 border-t border-gray1 p-4 bg-white z-30">
        <Button variant="filled-dark" onClick={handleOnClickContact}>
          <MdPhone size={24} className="mr-4" />
          Entrar em contato
        </Button>
      </div>

      <div className="hidden md:block sticky top-6 mt-6 p-4 border border-gray0.5">
        <h1 className="font-merriweather font-bold text-2xl mb-8">
          Entrar em Contato
        </h1>

        <div className="relative">
          <div className="blur-sm text-black">
            <div className="flex">
              <MdPhone size={24} className="mr-2" />
              <p>(11) 9000-0009</p>
            </div>
            <div className="flex mt-4">
              <MdMail size={24} className="mr-2" />
              <p>email@ex.com</p>
            </div>
          </div>

          <button
            type="button"
            className="absolute top-2 flex justify-center py-2 center w-full bg-black text-white"
            onClick={handleOnClickContact}
          >
            <MdPhone size={24} className="mr-4" />
            Entrar em contato
          </button>
        </div>
      </div>
    </>
  );
};

export default ListDetailsInfoContact;
