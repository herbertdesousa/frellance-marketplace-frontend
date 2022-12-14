import { Page } from '@/types/Page';
import Head from 'next/head';

import { AdminAuth, AdminContacts } from '@/modules/pages/Admin';

import { useAdminAuth } from '@/hooks/adminAuth';

const AdminContactsPage: Page = () => {
  const { isAuthed } = useAdminAuth();

  return (
    <>
      <Head>
        <title>Admin Premium List - Contatos</title>
      </Head>
      {!isAuthed && <AdminAuth />}
      {isAuthed && <AdminContacts />}
    </>
  );
};

export default AdminContactsPage;
