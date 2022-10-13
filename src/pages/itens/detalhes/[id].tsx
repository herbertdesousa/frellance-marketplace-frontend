import { Page } from '@/types/Page';

import { useRouter } from 'next/router';

import {
  ListDetailsContact,
  ListDetailsDescription,
  ListDetailsImage,
  ListDetailsNav,
  ListDetailsRelated,
} from '@/modules/pages/List/ListDetails';
import { Footer } from '@/components';

const Details: Page = () => {
  const router = useRouter();

  if (!router.query.id) return <></>;
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <ListDetailsNav id={String(router.query.id)} />

      <ListDetailsImage />

      <div className="max-width md:grid grid-cols-8 gap-x-6 z-50">
        <div className="col-span-5">
          <ListDetailsDescription />
        </div>

        <div className="col-span-3">
          <ListDetailsContact />
        </div>
      </div>

      <ListDetailsRelated />

      <Footer />
    </div>
  );
};

export default Details;
