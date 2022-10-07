import { Page } from '@/types/Page';

import { useState } from 'react';
import { ProfileNav } from '@/modules/Profile';

import {
  ProfileChatContacts,
  ProfileChatMessages,
} from '@/modules/Profile/ProfileChat';

const Chat: Page = () => {
  const [navHeight, setNavHeight] = useState(0);

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
