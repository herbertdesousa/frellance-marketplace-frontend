import { Page } from '@/types/Page';

import { useEffect, useState } from 'react';
import { ProfileNav } from '@/modules/pages/Profile';

import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';

import {
  ProfileChatContacts,
  ProfileChatMessages,
} from '@/modules/pages/Profile/ProfileChat';

const Chat: Page = () => {
  const [navHeight, setNavHeight] = useState(0);

  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user && !auth.loading.state) {
      auth.authModalRef.current?.open();
      router.push('/');
    }
  }, [auth]);

  if (!auth.user) return <></>;

  return (
    <>
      <div ref={ref => ref && setNavHeight(ref.offsetHeight)}>
        <ProfileNav />
      </div>

      <div
        className="grid grid-cols-8"
        style={{
          height: `calc(100vh - ${navHeight}px)`,
        }}
      >
        <div className="hidden md:block col-span-3 px-6 border-r border-gray0.5 ">
          <ProfileChatContacts />
        </div>
        <div className="col-span-8 md:col-span-5 overflow-y-scroll no-scroll">
          <ProfileChatMessages navTop={navHeight - 1} />
        </div>
      </div>
    </>
  );
};

export default Chat;
