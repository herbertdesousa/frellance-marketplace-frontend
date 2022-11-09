import { Page } from '@/types/Page';
import Head from 'next/head';

import { AdminAuth, AdminCategories } from '@/modules/pages/Admin';

import { useAdminAuth } from '@/hooks/adminAuth';

const AdminCategoriesPage: Page = () => {
  const { isAuthed } = useAdminAuth();

  return (
    <>
      <Head>
        <title>Admin Premium List - Categorias</title>
      </Head>
      {!isAuthed && <AdminAuth />}
      {isAuthed && <AdminCategories />}
    </>
  );
};

export default AdminCategoriesPage;
