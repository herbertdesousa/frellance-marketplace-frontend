import { Page } from '@/types/Page';

import {
  HomeFeatures,
  HomeFooter,
  HomeHero,
  HomeNav,
  HomeSellWithUs,
} from '@/modules/Home';
import { CategoriesCarrousel } from '@/modules/shared';

const Home: Page = () => {
  return (
    <>
      <HomeNav />
      <HomeHero />
      <CategoriesCarrousel className="mt-12" />
      <HomeFeatures />
      <HomeSellWithUs />
      <HomeFooter />
    </>
  );
};

export default Home;
