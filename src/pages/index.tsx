import { Page } from '@/types/Page';

import { Nav } from '@/components';
import {
  HomeCategories,
  HomeFeatures,
  HomeFooter,
  HomeHero,
  HomeSellWithUs,
} from '@/modules/Home';

const Home: Page = () => {
  return (
    <>
      <Nav />
      <HomeHero />
      <HomeCategories />
      <HomeFeatures />
      <HomeSellWithUs />
      <HomeFooter />
    </>
  );
};

export default Home;
