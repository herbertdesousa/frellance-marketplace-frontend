import React, { useCallback, useEffect, useState } from 'react';

import { Category } from '@/types/Category';

import * as IconFi from 'react-icons/fi';

import { useModal } from '@/hooks/modal';

import { adminApi } from '@/services/api';
import { Button } from '@/components';
import AdminNav from '../components/AdminNav';

import AdminCategoriesItem from './AdminCategoriesItem';
import AdminCategoriesSave from './AdminCategoriesSave';

type ResponseCategory = Omit<Category, 'Icon'> & {
  iconName: string;
  items: number;
};
export type AdminCategory = Category & { items: number };

const AdminCategories: React.FC = () => {
  const { modalRef } = useModal();
  const [data, setData] = useState<AdminCategory[]>([]);

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

  const saveCategoryModal = useCallback(
    (item?: AdminCategory) => {
      modalRef.current?.open({
        title: item ? 'Editar Categoria' : 'Crair Categoria',
        children: <AdminCategoriesSave refreshData={fetchData} item={item} />,
      });
    },
    [modalRef],
  );

  return (
    <div className="relative max-width">
      <AdminNav title="Categorias" />

      <div className="md:max-w-sm">
        {!!data.length && (
          <ul>
            {data.map(item => (
              <AdminCategoriesItem
                key={item.id}
                item={item}
                refreshData={fetchData}
                onOpenEdit={id => saveCategoryModal(id)}
              />
            ))}
          </ul>
        )}
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => saveCategoryModal()}
        >
          Criar Categoria
        </Button>
      </div>
    </div>
  );
};

export default AdminCategories;
