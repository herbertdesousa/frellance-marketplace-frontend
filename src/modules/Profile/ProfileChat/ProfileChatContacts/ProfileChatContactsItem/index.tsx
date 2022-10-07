import { Page } from '@/types/Page';
import { MdCheck, MdDoneAll } from 'react-icons/md';

import { useRouter } from 'next/router';
import {
  differenceInMinutes,
  differenceInHours,
  isYesterday,
  differenceInYears,
  format,
} from 'date-fns';
import { useMemo } from 'react';

interface Props {
  contactName: string;
  lastMessage: string;
  date: Date;
  status:
    | { type: 'sent' }
    | { type: 'unviewed' }
    | { type: 'viewed' }
    | { type: 'received'; messageQuantity: 2 };
}

const ProfileChatContactsItem: Page<Props> = ({
  contactName,
  lastMessage,
  status,
  date,
}) => {
  const router = useRouter();

  const dateDifference = useMemo(() => {
    // min, hr, yesterday, dd/mm, dd/mm/yy
    if (differenceInYears(new Date(Date.now()), date) >= 1) {
      return format(date, 'dd/MM/yyyy');
    }
    if (isYesterday(date)) return 'ontem';

    const min = differenceInMinutes(new Date(Date.now()), date);
    const hours = differenceInHours(new Date(Date.now()), date);

    if (hours > 24) return format(date, 'dd/MM');

    if (hours === 0) return `${min}m`;

    return `${hours}hr`;
  }, [date]);

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full"
        onClick={() => router.push('/perfil/chat')}
      >
        <div className="h-14 w-14 bg-gray1 rounded-full mr-3" />

        <div className="text-left flex flex-col flex-1">
          <strong>{contactName}</strong>
          <div className="flex items-center">
            {status.type === 'sent' && (
              <MdCheck size={16} className="text-gray2" />
            )}
            {status.type === 'unviewed' && (
              <MdDoneAll size={16} className="text-gray2" />
            )}
            {status.type === 'viewed' && (
              <MdDoneAll size={16} className="text-primary" />
            )}
            {status.type === 'received' && (
              <div
                className="px-1 py-0.5 bg-black text-white"
                style={{ lineHeight: 1 }}
              >
                {status.messageQuantity}
              </div>
            )}
            <span
              className={`ml-2 ${
                status.type === 'received'
                  ? 'text-black font-medium'
                  : 'text-gray3'
              }`}
            >
              {lastMessage}
            </span>
          </div>
        </div>

        <span className="text-gray3 self-start">{dateDifference}</span>
      </button>
    </li>
  );
};

export default ProfileChatContactsItem;
