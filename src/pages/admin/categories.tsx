import { Page } from '@/types/Page';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

import { AdminAuth } from '@/modules/pages/Admin';
import {
  AdminCategoriesList,
  AdminCategoryDetails,
} from '@/modules/pages/Admin/AdminCategories';

import * as IconFi from 'react-icons/fi';

import { adminApi } from '@/services/api';

import { AdminCategory, ResponseCategory } from '@/types/AdminCategory';
import { useAdminAuth } from '@/hooks/adminAuth';

export type AdminCategoriesPages =
  | {
      page: 'home';
    }
  | { page: 'details'; item: AdminCategory };

const AdminCategoriesPage: Page = () => {
  const { isAuthed } = useAdminAuth();

  const [data, setData] = useState<AdminCategory[]>([]);
  const [page, setPage] = useState<AdminCategoriesPages>({
    page: 'home',
  });

  const fetchData = useCallback(async () => {
    const res = await adminApi.get<ResponseCategory[]>('admin/categories');

    const parsed = res.data
      .sort((a, b) => b.relevance - a.relevance)
      .map(item => ({
        ...item,
        Icon: IconFi[item.iconName as 'FiX'],
      }));

    setData(parsed);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Head>
        <title>Admin Premium List - Categorias</title>
      </Head>
      {!isAuthed && <AdminAuth />}
      {isAuthed && page.page === 'home' && (
        <AdminCategoriesList
          data={data}
          refreshData={fetchData}
          setPage={setPage}
        />
      )}
      {isAuthed && page.page === 'details' && (
        <AdminCategoryDetails
          item={page.item}
          back={() => setPage({ page: 'home' })}
          refreshData={fetchData}
        />
      )}
    </>
  );
};

export default AdminCategoriesPage;
