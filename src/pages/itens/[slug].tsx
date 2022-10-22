import { Page } from '@/types/Page';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { ListNav } from '@/modules/pages/List';
import { BreadCrumb, EmptyState, Footer } from '@/components';
import { ListItem } from '@/modules/shared';

import { TbError404 } from 'react-icons/tb';
import { MdArrowForward } from 'react-icons/md';

import { Category } from '@/types/Category';
import { Item } from '@/types/Item';

import { api } from '@/services/api';

type Props = { item: { category: Category; items: Item[] } };

const ListSlug: Page<Props> = ({ item }) => {
  const router = useRouter();

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
    <div className="min-h-screen flex flex-col">
      <ListNav.ListNavWrapper>
        <div className="border-b border-gray1">
          <ListNav.ListNavTop />
        </div>
        {/* <ListNav.ListNavFilters /> */}
      </ListNav.ListNavWrapper>

      <div className="pt-6 max-width flex flex-col flex-1">
        <div className="mb-6">
          <BreadCrumb
            data={[
              { label: 'Itens', onClick: () => router.push('/itens') },
              { label: item.category.name },
            ]}
          />
        </div>

        <h1 className="text-2xl font-merriweather font-bold mb-6">
          {`Anúncios de ${item.category.name}`}
        </h1>

        <ul className="grid gap-x-4 md:grid-cols-2 lg:grid-cols-4">
          {item.items.map(i => (
            <ListItem key={i.id} item={i} />
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default ListSlug;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get<Category[]>('/categories');

  return {
    paths: response.data.map(i => ({ params: { slug: i.slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  let category: any = null;
  let items: any = null;

  try {
    const response = await api.get<Category>(
      `/categories/slug/${String(context.params?.slug)}`,
    );
    category = response.data;

    const response2 = await api.get<Item[]>('categories/items', {
      params: { byCategoryId: response.data.id },
    });
    items = response2.data;
  } catch (err) {
    //
  }

  return {
    props: {
      item: { category, items },
      revalidate: 60,
    },
  };
};
