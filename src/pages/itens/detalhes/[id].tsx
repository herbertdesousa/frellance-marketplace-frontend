import { Page } from '@/types/Page';

import { useRouter } from 'next/router';

import {
  ListDetailsInfo,
  ListDetailsDescription,
  ListDetailsImage,
  ListDetailsNav,
  ListDetailsRelated,
} from '@/modules/pages/List/ListDetails';
import { EmptyState, Footer } from '@/components';
import { GetStaticPaths, GetStaticProps } from 'next';

import { TbError404 } from 'react-icons/tb';
import { MdArrowForward } from 'react-icons/md';

import { Category } from '@/types/Category';
import { api } from '@/services/api';
import { useEffect } from 'react';

export interface ItemDetailsAttribute {
  id: string;
  name: string;
  path: string;
  description: string;
  class: string;
  value: string;
}

export interface ItemDetails {
  id: string;
  userId: string;
  name: string;
  description: string;
  price: { type: 'alugar' | 'vender'; value: string };
  attributes: ItemDetailsAttribute[];
  category: Category;
  pictures: { id: string; url: string }[];
}

const Details: Page<{ item?: ItemDetails }> = ({ item }) => {
  const router = useRouter();

  useEffect(() => {
    if (item) {
      api.post(
        '/users/preferences',
        {},
        { params: { type: 'recent-view', itemId: item.id } },
      );
    }
  }, []);

  if (router.isFallback)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <p>Carregando...</p>
      </div>
    );
  if (!item)
    return (
      <div className="max-width h-screen flex items-center justify-center">
        <EmptyState
          icon={TbError404}
          title="Anúncio Não Encontrado"
          description="Este anúncio não foi encontrado ou foi desativado"
          button={{
            title: (
              <>
                voltar
                <MdArrowForward className="ml-4" />
              </>
            ),
            onClick: router.back,
          }}
        />
      </div>
    );
  return (
    <div className="min-h-screen md:pb-0">
      <ListDetailsNav id={item.id} />

      <ListDetailsImage pictures={item.pictures} />

      <div className="max-width md:grid grid-cols-8 gap-x-6 z-50">
        <div className="col-span-5 lg:col-span-6">
          <ListDetailsDescription item={item} />
        </div>

        <div className="col-span-3 lg:col-span-2">
          <ListDetailsInfo itemId={item.id} userId={item.userId} />
        </div>
      </div>

      <ListDetailsRelated />

      <Footer />
    </div>
  );
};
export default Details;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  let item: any = null;

  try {
    const response = await api.get('/categories/items/details', {
      params: { id: String(context.params?.id) },
    });
    item = response.data;
  } catch (err) {
    //
  }

  return {
    props: {
      item,
      revalidate: 60,
    },
  };
};
