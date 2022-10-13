import { Page } from '@/types/Page';

import { format } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

import { Message } from '..';

interface Props {
  item: Message;
  beforeItemType: 'date-indicator' | 'my-message' | 'contact-message' | 'none';
}

const ProfileChatMessagesItem: Page<Props> = ({ item, beforeItemType }) => {
  const [messageLines, setMessageLines] = useState(1);

  const marginTop = useMemo(() => {
    if (beforeItemType === 'none') return 0;
    if (beforeItemType === 'date-indicator') return 32;

    if (
      (beforeItemType === 'my-message' && item.type === 'my-message') ||
      (beforeItemType === 'contact-message' && item.type === 'contact-message')
    )
      return 4;

    return 16;
  }, [beforeItemType, item.type]);

  const countMessageLines = useCallback((ref: HTMLParagraphElement | null) => {
    if (!ref) return;
    setMessageLines(ref.offsetHeight / 24);
  }, []);

  if (item.type === 'date-indicator')
    return (
      <li className="flex items-center w-full">
        <div className="flex flex-1 bg-gray1 my-4" style={{ height: 1 }} />
        <span className="mx-4">10 nov, 2022</span>
        <div className="flex flex-1 bg-gray1 my-4" style={{ height: 1 }} />
      </li>
    );

  return (
    <li
      className={`
        flex items-end px-3 py-2
        ${messageLines > 1 ? 'flex-col' : ''}
        ${
          item.type === 'my-message'
            ? 'self-end bg-gray0.5'
            : 'self-start border border-gray1'
        }
      `}
      style={{ maxWidth: '80%', marginTop }}
    >
      <p ref={countMessageLines} className="text-base">
        {item.message}
      </p>
      <span className="text-sm ml-3">{format(item.date, 'HH:mm')}</span>
    </li>
  );
};

export default ProfileChatMessagesItem;
