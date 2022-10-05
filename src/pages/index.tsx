import { Page } from '@/types/Page';

import {
  HomeFeatures,
  HomeHero,
  HomeNav,
  HomeSellWithUs,
} from '@/modules/Home';
import { CategoriesCarrousel } from '@/modules/shared';
import { Footer } from '@/components';

const Home: Page = () => {
  return (
    <>
      <HomeNav />
      <HomeHero />
      <CategoriesCarrousel className="mt-12" />
      <HomeFeatures />
      <HomeSellWithUs />
      <Footer />
    </>
  );
};

export default Home;
