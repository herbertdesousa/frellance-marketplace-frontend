import { Page } from '@/types/Page';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { subDays, subMinutes } from 'date-fns';

import ProfileChatContactsItem from './ProfileChatContactsItem';

const ProfileChatContacts: Page = () => {
  const [isSellerOpened, setIsSellerOpened] = useState(true);
  const [isBuyerOpened, setIsBuyerOpened] = useState(true);

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-merriweather font-bold">Contatos</h1>

      <div className="mt-8">
        <button
          type="button"
          className="flex items-center text-gray3"
          onClick={() => setIsSellerOpened(st => !st)}
        >
          COMO VENDEDOR
          <MdKeyboardArrowDown
            size={16}
            className={`ml-1 transform-gpu transition ${
              isSellerOpened ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </button>

        {isSellerOpened && (
          <ul className="mt-6">
            <ProfileChatContactsItem
              contactName="Cleber"
              lastMessage="Vamos decidir?"
              status={{ type: 'viewed' }}
              date={subMinutes(new Date(Date.now()), 5)}
            />
            <div className="w-full bg-gray1 my-4" style={{ height: 1 }} />
            <ProfileChatContactsItem
              contactName="Jose"
              lastMessage="Fechado?"
              status={{ type: 'sent' }}
              date={subDays(new Date(Date.now()), 1)}
            />
          </ul>
        )}
      </div>

      <div className="mt-8">
        <div className="flex">
          <button
            type="button"
            className="flex items-center text-black"
            onClick={() => setIsBuyerOpened(st => !st)}
          >
            COMO COMPRADOR
            <MdKeyboardArrowDown
              size={16}
              className={`ml-1 transform-gpu transition ${
                isBuyerOpened ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </button>
          <div
            className="px-1 py-0.5 bg-black text-white ml-3"
            style={{ lineHeight: 1 }}
          >
            2
          </div>
        </div>

        {isBuyerOpened && (
          <ul className="mt-6">
            <ProfileChatContactsItem
              contactName="Cleber"
              lastMessage="Olá"
              status={{ type: 'received', messageQuantity: 2 }}
              date={subMinutes(new Date(Date.now()), 10)}
            />
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileChatContacts;
