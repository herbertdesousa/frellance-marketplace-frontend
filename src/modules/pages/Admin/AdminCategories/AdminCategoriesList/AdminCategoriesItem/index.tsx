import { Page } from '@/types/Page';
import { useCallback } from 'react';

import { Button } from '@/components';
import { useModal } from '@/hooks/modal';

import { FiTrash2 } from 'react-icons/fi';
import { adminApi } from '@/services/api';

import { AdminCategory } from '@/types/AdminCategory';

interface Props {
  item: AdminCategory;
  refreshData(): void;
  onOpenEdit(item: AdminCategory): void;
}

const AdminCategoriesItem: Page<Props> = ({
  item,
  refreshData,
  onOpenEdit,
}) => {
  const { modalRef } = useModal();

  const deleteItem = async () => {
    await adminApi.delete(`admin/categories?id=${item.id}`);
    modalRef.current?.close();
    refreshData();
  };

  const handleOnDelete = useCallback(() => {
    modalRef.current?.open({
      title: 'Deletar Categoria',
      children: (
        <>
          <p className="text-gray3">
            {`Você tem certeza que deseja deleter esta categoria e remover junto ${item.items} items? ação irreversivel`}
          </p>
          <div className="flex gap-x-4 mt-4">
            <Button onClick={deleteItem}>Sim, Deletar</Button>
            <Button variant="outline" onClick={() => modalRef.current?.close()}>
              Cancelar
            </Button>
          </div>
        </>
      ),
    });
  }, []);

  return (
    <li className="flex items-center" key={item.id}>
      <Button
        variant="outline"
        style={{ justifyContent: 'flex-start' }}
        className="pl-4 mt-2"
        onClick={() => onOpenEdit(item)}
      >
        {/* <Image src={item.img_url} height={48} width={48} /> */}
        <item.Icon size={24} className="mr-4" />
        <span className="normal-case">{item.name}</span>
        <span className="mx-2 text-gray3">•</span>
        <span className="lowercase text-sm text-gray3">{`${item.items} Items`}</span>
      </Button>

      <button
        type="button"
        className="ml-2 bg-white rounded-full p-2 transition hover:bg-red-opaque"
        onClick={handleOnDelete}
      >
        <FiTrash2 size={24} className="text-red" />
      </button>
    </li>
  );
};

export default AdminCategoriesItem;
