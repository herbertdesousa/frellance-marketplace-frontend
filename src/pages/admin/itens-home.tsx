import { Page } from '@/types/Page';
import Head from 'next/head';

import { AdminAuth, AdminDashHero } from '@/modules/pages/Admin';

import { useAdminAuth } from '@/hooks/adminAuth';

const AdminItemsHome: Page = () => {
  const { isAuthed } = useAdminAuth();

  return (
    <>
      <Head>
        <title>Admin Premium List - Itens na Home</title>
      </Head>
      {!isAuthed && <AdminAuth />}
      {isAuthed && <AdminDashHero />}
    </>
  );
};

export default AdminItemsHome;
