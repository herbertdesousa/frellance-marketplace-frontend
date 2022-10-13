import { Page } from '@/types/Page';

import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import { ProfileNav } from '@/modules/pages/Profile';

import { ProfileChatContacts } from '@/modules/pages/Profile/ProfileChat';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/auth';

const Chat: Page = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user && !auth.loading.state) {
      auth.authModalRef.current?.open();
      router.push('/');
    }
  }, [auth]);

  useEffect(() => {
    if (!isMobile) {
      router.push('/perfil/chat');
    }
  }, [router]);

  if (!auth.user) return <></>;
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
