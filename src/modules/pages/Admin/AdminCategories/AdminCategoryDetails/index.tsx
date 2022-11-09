import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Image from 'next/image';

import { AdminCategory } from '@/types/AdminCategory';

import useSWR from 'swr';

import { FiEdit, FiTrash2 } from 'react-icons/fi';

import { Button } from '@/components';
import { Attribute } from '@/types/Attributes';

import { useModal } from '@/hooks/modal';

import { AdminCategoriesPages } from '@/pages/admin/categories';

import { adminApi } from '@/services/api';
import AdminCategoriesSave from '../AdminCategoriesSave';

import AdminNav from '../../components/AdminNav';
import AdminCategoriesAttributesSave from '../AdminCategoriesAttributesSave';

interface Props {
  item: AdminCategory;
  back(): void;
  refreshData(): void;
}

const AdminCategoryDetails: React.FC<Props> = ({ item, back, refreshData }) => {
  const { modalRef } = useModal();

  const attributes = useSWR<Attribute[]>(
    item.id && `/categories/attributes?id=${item.id}`,
    { revalidateOnFocus: false },
  );

  const [deletingAttrId, setDeletingAttrId] = useState('');
  const deleteAttribute = async (id: string) => {
    setDeletingAttrId(id);
    await adminApi.delete('/admin/categories/attributes', {
      params: { id },
    });
    await attributes.mutate();
    setDeletingAttrId('');
  };

  const editCategory = useCallback(() => {
    modalRef.current?.open({
      title: 'Editar Categoria',
      children: <AdminCategoriesSave refreshData={refreshData} item={item} />,
    });
  }, [modalRef]);

  const saveAttribute = useCallback(
    (attr?: Attribute) => {
      modalRef.current?.open({
        title: attr ? 'Editar Atributo' : 'Criar Atributo',
        children: (
          <AdminCategoriesAttributesSave
            refreshData={() => attributes.mutate()}
            item={attr}
            categoryId={item.id}
          />
        ),
      });
    },
    [modalRef],
  );

  return (
    <div className="relative max-width">
      <div className="md:max-w-md">
        <AdminNav title="Categorias" onBack={back} />

        <div>
          <h2 className="text-lg font-merriweather font-bold mb-2">Geral</h2>
          <ul>
            <li className="flex justify-between">
              <strong className="font-medium">Imagem</strong>
              <Image
                src={item.img_url}
                height={96}
                width={96}
                objectFit="cover"
              />
            </li>
            <li className="flex justify-between mt-1">
              <strong className="font-medium">Nome</strong>
              <span>{item.name}</span>
            </li>
            <li className="flex justify-between mt-1">
              <strong className="font-medium">Ordem</strong>
              <span>{item.relevance}</span>
            </li>
            <li className="flex justify-between mt-1">
              <strong className="font-medium">Rota</strong>
              <span>{`/${item.slug}`}</span>
            </li>
            <li className="flex justify-between mt-1">
              <strong className="font-medium">Icone</strong>
              <item.Icon size={18} />
            </li>
          </ul>

          <Button className="mt-2" variant="outline" onClick={editCategory}>
            Alterar Categoria
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-merriweather font-bold mb-2">
            Atributos
          </h2>
          <ul className="w-full border border-gray2">
            {attributes.data &&
              attributes.data
                .sort((a, b) => b.order - a.order)
                .map((attr, index) => (
                  <li
                    className={`flex items-center justify-between w-full p-2 pr-3
                    ${index === 0 ? '' : 'mt-1 border-t border-gray2'}`}
                    key={attr.id}
                  >
                    <strong className="font-medium">{attr.name}</strong>

                    <div className="flex items-center">
                      <button type="button" onClick={() => saveAttribute(attr)}>
                        <FiEdit size={18} />
                      </button>
                      <button
                        type="button"
                        className="ml-4"
                        onClick={() => deleteAttribute(attr.id)}
                        disabled={deletingAttrId === attr.id}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
          </ul>
          <Button
            className="mt-2"
            variant="outline"
            onClick={() => saveAttribute()}
          >
            Adicionar Atributos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryDetails;
