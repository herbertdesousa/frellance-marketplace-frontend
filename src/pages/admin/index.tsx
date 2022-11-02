import { Page } from '@/types/Page';
import Head from 'next/head';

import { AdminAuth, AdminDashHero } from '@/modules/pages/Admin';

import { useState } from 'react';

const Admin: Page = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <>
      <Head>
        <title>Premium List - Admin</title>
      </Head>
      {!isAuthed && <AdminAuth onAuthed={() => setIsAuthed(true)} />}
      {isAuthed && <AdminDashHero />}
    </>
  );
};

export default Admin;
