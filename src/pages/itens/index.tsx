import { Page } from '@/types/Page';

import ListNav from '@/modules/List/ListNav';
import { CategoriesCarrousel } from '@/modules/shared';

const List: Page = () => {
  return (
    <>
      <div className="border-b border-gray0.5">
        <ListNav.ListNavWrapper>
          <ListNav.ListNavTop />
        </ListNav.ListNavWrapper>
      </div>

      <CategoriesCarrousel className="mt-8 lg:mt-16" />
    </>
  );
};

export default List;
