import { Page } from '@/types/Page';

import {
  HomeFeatures,
  HomeHero,
  HomeNav,
  HomeSellWithUs,
} from '@/modules/pages/Home';
import { CategoriesCarrousel } from '@/modules/shared';
import { Footer } from '@/components';
import { GetStaticProps } from 'next';
import { api } from '@/services/api';

import { Item } from '@/types/Item';

const Home: Page<{ features: Item[]; hero: Item[] }> = ({ features, hero }) => {
  return (
    <>
      <HomeNav />
      <HomeHero data={hero} />
      <CategoriesCarrousel className="mt-12" />
      <HomeFeatures data={features} />
      <HomeSellWithUs />
      <Footer />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const features = await api.get('/categories/items', {
    params: { limit: 10, order: 'desc' },
  });
  // const mostView = await api.get('/categories/items', {
  //   params: { limit: 4, selectMostView: true },
  // });

  const hero = await api.get('/categories/items', {
    params: { onHomeHero: true },
  });

  return {
    props: {
      features: features.data,
      // mostView: mostView.data,
      hero: hero.data,
    },
    revalidate: 30,
  };
};
