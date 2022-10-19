import { Page } from '@/types/Page';
import { GetStaticProps } from 'next';

import { api } from '@/services/api';
import { CategoriesCarrousel, ListItem } from '@/modules/shared';
import { Footer } from '@/components';

import ListNav from '@/modules/pages/List/ListNav';

import { Item } from '@/types/Item';

const List: Page<{ data: Item[] }> = ({ data }) => {
  return (
    <>
      <div className="border-b border-gray0.5">
        <ListNav.ListNavWrapper>
          <ListNav.ListNavTop />
        </ListNav.ListNavWrapper>
      </div>

      <CategoriesCarrousel className="mt-8 lg:mt-12" />

      <div className="mt-12 max-width">
        <h1 className="text-2xl font-merriweather font-bold mb-6">
          Itens em Alta
        </h1>

        <ul className="grid gap-x-4 md:grid-cols-2 lg:grid-cols-4">
          {data.map(item => (
            <ListItem key={item.id} item={item} />
          ))}
        </ul>
      </div>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/categories/items', {
    params: { limit: 21, mostView: true },
  });

  return {
    props: {
      data: response.data,
    },
    revalidate: 30,
  };
};

export default List;
