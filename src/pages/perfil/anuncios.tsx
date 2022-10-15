import { useAuth } from '@/hooks/auth';
import { useEffect } from 'react';
import { Page } from '@/types/Page';

import { useRouter } from 'next/router';
import Image from 'next/image';

import useSWR from 'swr';

import {
  MdArrowForward,
  MdChevronRight,
  MdOpenInNew,
  MdSell,
} from 'react-icons/md';
import * as Feather from 'react-icons/fi';

import { ProfileNav } from '@/modules/pages/Profile';
import { Button, EmptyState } from '@/components';
import { useModal } from '@/hooks/modal';

interface Adversite {
  id: string;
  description: string;
  name: string;
  category: { name: string; iconName: string };
  pictures: { url: string }[];
}

const Adversites: Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const { modalRef } = useModal();

  const { data, error } = useSWR<Adversite[]>(
    auth.user && !auth.loading.state && 'categories/items',
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (!auth.user && !auth.loading.state) {
      auth.authModalRef.current?.open();
      router.push('/');
    }
  }, [auth]);

  const getIcon = (name: string) => {
    const Icon = Feather[name as 'FiActivity'];
    return <Icon />;
  };

  if (!auth.user) return <></>;
  return (
    <>
      <ProfileNav />

      <div className="max-width mt-10 pb-8">
        {!data && !error && <p>Carregando Anúncios...</p>}
        {data && data.length > 0 && (
          <div>
            <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center mb-8 whitespace-nowrap">
              <h1 className="text-2xl font-merriweather font-bold">
                Seus Anúncios
              </h1>
              <Button
                size="sm"
                className="w-auto mt-2 md:mt-0"
                onClick={() => router.push('/vender')}
              >
                Novo Anúncio
              </Button>
            </div>
            <ul>
              {data.map((item, index) => (
                <li
                  key={item.id}
                  className={`max-w-full ${index > 0 ? 'mt-3' : ''}`}
                >
                  {index > 0 && (
                    <div
                      className="w-full bg-gray1 mb-3"
                      style={{ height: 1 }}
                    />
                  )}

                  <button
                    type="button"
                    className="flex items-center text-left w-full"
                    onClick={() => {
                      modalRef.current?.open({
                        title: 'Sobre o item',
                        children: (() => (
                          <div>
                            <div>
                              <span className="text-gray3 mb-0.5">Visitas</span>
                              <h3 className="text-lg font-semibold">
                                5 Visistas
                              </h3>
                            </div>
                            <div
                              className="w-fdvil bg-gray1 my-4"
                              style={{ height: 1 }}
                            />
                            <div>
                              <span className="text-gray3 mb-0.5">
                                Botão entrar em contato
                              </span>
                              <h3 className="text-lg font-semibold">
                                5 Cliques
                              </h3>
                            </div>
                            <div
                              className="w-fdvil bg-gray1 my-4"
                              style={{ height: 1 }}
                            />
                            <button
                              type="button"
                              className="flex items-center mt-4 text-primary"
                              onClick={() => {
                                router.push(`/itens/detalhes/${item.id}`);
                                modalRef.current?.close();
                              }}
                            >
                              <MdOpenInNew size={18} className="mr-1" />
                              Ver Item
                            </button>
                          </div>
                        ))(),
                      });
                    }}
                  >
                    <div
                      style={{
                        minWidth: 48,
                        minHeight: 48,
                        maxWidth: 48,
                        maxHeight: 48,
                      }}
                    >
                      <Image
                        src={item.pictures[0].url}
                        width={48}
                        height={48}
                        objectFit="cover"
                      />
                    </div>

                    <div className="flex flex-col flex-1 ml-4 truncate">
                      <strong className="font-semibold truncate">
                        {item.name}
                      </strong>

                      <div className="flex items-center text-gray3 mt-0.5 text-sm">
                        {getIcon(item.category.iconName)}
                        <p className="ml-2">{item.category.name}</p>
                      </div>
                    </div>

                    <MdChevronRight size={24} className="text-gray3 mx-2" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data && data.length === 0 && (
          <EmptyState
            icon={MdSell}
            title="Nenhum Anúncio"
            description="Anúncie seus itens e eles aparecerão aqui."
            button={{
              title: (
                <>
                  anúnciar item
                  <MdArrowForward className="ml-4" />
                </>
              ),
              onClick: () => router.push('/vender'),
            }}
          />
        )}
      </div>
    </>
  );
};

export default Adversites;
