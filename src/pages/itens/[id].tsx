import { Page } from '@/types/Page';
import { useRouter } from 'next/router';

import { ListNav } from '@/modules/List';
import { BreadCrumb } from '@/components';
import { capitalizeFirstLetter } from '@/utils';

const ListSlug: Page = () => {
  const router = useRouter();

  return (
    <>
      <ListNav.ListNavWrapper>
        <ListNav.ListNavTop />
        <ListNav.ListNavFilters />
      </ListNav.ListNavWrapper>

      <div className="pt-6 pl-6 md:px-16 mx-auto" style={{ maxWidth: 1440 }}>
        <div className="mb-6">
          <BreadCrumb
            data={[
              { label: 'Todos', onClick: () => router.push('/itens') },
              { label: capitalizeFirstLetter(String(router.query.id)) },
            ]}
          />
        </div>

        <h1 className="text-2xl font-merriweather font-bold">
          {`Anúncios de ${capitalizeFirstLetter(String(router.query.id))}`}
        </h1>
      </div>
    </>
  );
};

export default ListSlug;
