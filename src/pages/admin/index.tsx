import { Page } from '@/types/Page';
import Head from 'next/head';

import { AdminAuth, AdminHome } from '@/modules/pages/Admin';

import { useAdminAuth } from '@/hooks/adminAuth';

const Admin: Page = () => {
  const { isAuthed } = useAdminAuth();

  return (
    <>
      <Head>
        <title>Admin Premium List</title>
      </Head>
      {!isAuthed && <AdminAuth />}
      {isAuthed && <AdminHome />}
    </>
  );
};

export default Admin;
