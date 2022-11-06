import { Button } from '@/components';
import { useRouter } from 'next/router';

import { useState } from 'react';

import { useModal } from '@/hooks/modal';
import { api } from '@/services/api';
import { Page } from '@/types/Page';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { Analytics } from '..';

const ListDetailsInfoAnalytics: Page<{ data: Analytics; itemId: string }> = ({
  data,
  itemId,
}) => {
  const router = useRouter();
  const { modalRef } = useModal();

  const [isOpened, setIsOpened] = useState(true);

  const handleOnDeleteItem = async () => {
    await api.delete(`categories/items?id=${itemId}`);
    router.push('/perfil/anuncios');
    modalRef.current?.close();
  };

  return (
    <div
      className="
        fixed md:sticky p-4 border border-gray0.5 bg-white z-40
        left-0 bottom-0 right-0 md:top-6 md:mt-6
      "
    >
      <div className={`flex items-center ${isOpened ? 'mb-8' : ''}`}>
        <h3 className="font-merriweather font-bold text-2xl mr-2">
          Gerenciar Anúncio
        </h3>
        <button type="button" onClick={() => setIsOpened(st => !st)}>
          <MdKeyboardArrowDown
            size={18}
            className={`text-gray3 transition ${
              isOpened ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </button>
      </div>

      {isOpened && (
        <>
          <div className="flex items-center justify-between">
            <span>Visitas</span>
            <strong>{data.views}</strong>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span>Cliques em Contato</span>
            <strong>{data.requestContacts}</strong>
          </div>

          <div className="mt-8">
            <Button
              className="bg-red"
              onClick={() => {
                modalRef.current?.open({
                  title: 'Deletar Anúncio',
                  children: (
                    <>
                      <p className="text-gray3">
                        Você tem certeza que deseja deleter este anúncio? ação
                        irreversivel
                      </p>
                      <div className="flex gap-x-4 mt-4">
                        <Button onClick={handleOnDeleteItem}>
                          Sim, Deletar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => modalRef.current?.close()}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </>
                  ),
                });
              }}
            >
              Deletar Anúncio
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListDetailsInfoAnalytics;
