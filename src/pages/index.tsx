import { Page } from '@/types/Page';

import {
  HomeCategories,
  HomeFeatures,
  HomeFooter,
  HomeHero,
  HomeNav,
  HomeSellWithUs,
} from '@/modules/Home';

const Home: Page = () => {
  return (
    <>
      <HomeNav />
      <HomeHero />
      <HomeCategories />
      <HomeFeatures />
      <HomeSellWithUs />
      <HomeFooter />
    </>
  );
};

export default Home;
