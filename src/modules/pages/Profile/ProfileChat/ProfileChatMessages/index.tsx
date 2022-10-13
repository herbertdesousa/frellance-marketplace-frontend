import { Page } from '@/types/Page';
import { useRouter } from 'next/router';

import { MdChevronLeft, MdOpenInNew, MdSend } from 'react-icons/md';
import ProfileChatMessagesItem from './ProfileChatMessagesItem';

export type Message =
  | {
      id: string;
      type: 'date-indicator';
      date: Date;
    }
  | {
      id: string;
      type: 'contact-message' | 'my-message';
      message: string;
      date: Date;
    };

const data: Message[] = [
  {
    id: 'id-123',
    type: 'date-indicator',
    date: new Date(Date.now()),
  },
  {
    id: 'id-456',
    message: 'olá!',
    type: 'contact-message',
    date: new Date(Date.now()),
  },
  {
    id: 'id-789',
    message: 'oi, boa tarde',
    type: 'my-message',
    date: new Date(Date.now()),
  },
  {
    id: 'id-786',
    message: 'tudo bem?',
    type: 'my-message',
    date: new Date(Date.now()),
  },
  {
    id: 'id-756',
    type: 'date-indicator',
    date: new Date(Date.now()),
  },
  {
    id: 'id-984',
    message:
      'tudo sim! gostaria de fazer uma proposta para o anúncio do seu veículo de R$1.200.800,00',
    type: 'contact-message',
    date: new Date(Date.now()),
  },
  {
    id: 'id-954',
    message:
      'ok, podemos conversar mais sobre o preço e decidir por chamada a noite?',
    type: 'my-message',
    date: new Date(Date.now()),
  },
  {
    id: 'id-549',
    message: 'ok, estou dispoível cerca de 9h da noite',
    type: 'contact-message',
    date: new Date(Date.now()),
  },
  {
    id: 'id-657',
    message: 'fechado, nos falamos as 9h',
    type: 'my-message',
    date: new Date(Date.now()),
  },
];

interface Props {
  navTop: number;
}

const ProfileChatMessages: Page<Props> = ({ navTop }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-full">
      <div
        className="fixed w-full flex items-center justify-between px-6 py-3 border-b border-gray0.5 bg-white z-10"
        style={{ top: navTop }}
      >
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden block mr-4"
            onClick={() => router.push('chat/contatos')}
          >
            <MdChevronLeft size={16} />
          </button>

          <div className="flex items-center">
            <div className="h-10 w-10 bg-gray1 rounded-full mr-3" />
            <div>
              <strong>Cleber</strong>
              <div className="flex items-center text-gray3">
                <div className="bg-gray1 rounded-full h-2 w-2 mr-2" />
                offline
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center text-primary text-sm"
        >
          ver projeto
          <MdOpenInNew className="ml-1" />
        </button>
      </div>

      <div className="flex flex-col flex-1 relative">
        <ul className="flex flex-col flex-1 pt-24 px-6 pb-10">
          {data.map((item, index) => (
            <ProfileChatMessagesItem
              key={item.id}
              item={item}
              beforeItemType={index === 0 ? 'none' : data[index - 1].type}
            />
          ))}
        </ul>

        <div
          className="
          sticky bottom-0 left-0 right-0 p-6 pt-4 bg-white z-10 border-t border-gray0.5
          flex justify-between
        "
        >
          <input type="text" className="w-full" placeholder="escreva algo..." />

          <button type="button" className="text-gray3 ml-6">
            <MdSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileChatMessages;
