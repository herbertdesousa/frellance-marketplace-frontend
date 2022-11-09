import React, { Dispatch, SetStateAction, useCallback } from 'react';

import { AdminCategory } from '@/types/AdminCategory';

import { AdminCategoriesPages } from '@/pages/admin/categories';

import { Button } from '@/components';
import { useModal } from '@/hooks/modal';
import AdminNav from '../../components/AdminNav';

import AdminCategoriesItem from './AdminCategoriesItem';
import AdminCategoriesSave from '../AdminCategoriesSave';

interface Props {
  setPage: Dispatch<SetStateAction<AdminCategoriesPages>>;
  data: AdminCategory[];
  refreshData(): void;
}

const AdminCategories: React.FC<Props> = ({ data, refreshData, setPage }) => {
  const { modalRef } = useModal();

  const createCategoryModal = useCallback(() => {
    modalRef.current?.open({
      title: 'Criar Categoria',
      children: <AdminCategoriesSave refreshData={refreshData} />,
    });
  }, [modalRef]);

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
                refreshData={refreshData}
                onOpenEdit={i => setPage({ page: 'details', item: i })}
              />
            ))}
          </ul>
        )}
        <Button
          variant="outline"
          className="mt-4"
          onClick={createCategoryModal}
        >
          Criar Categoria
        </Button>
      </div>
    </div>
  );
};

export default AdminCategories;
