import { Page } from '@/types/Page';

import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import { ProfileNav } from '@/modules/Profile';

import { ProfileChatContacts } from '@/modules/Profile/ProfileChat';
import { useEffect } from 'react';

const Chat: Page = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isMobile) {
      router.push('/perfil/chat');
    }
  }, [router]);

  return (
    <>
      <ProfileNav />

      <div className="max-width">
        <ProfileChatContacts />
      </div>
    </>
  );
};

export default Chat;
