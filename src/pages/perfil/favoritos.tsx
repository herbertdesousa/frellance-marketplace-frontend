import { Page } from '@/types/Page';
import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';

import { ProfileNav } from '@/modules/pages/Profile';
import { MdArrowForward, MdFavoriteBorder } from 'react-icons/md';
import { EmptyState } from '@/components';
import useSWR from 'swr';
import { ListItem } from '@/modules/shared';

interface Favs {
  id: string;
  img: string;
  price: string;
  description: string;
}

const Favs: Page = () => {
  const router = useRouter();
  const auth = useAuth();

  const { data } = useSWR<Favs[]>(
    auth.user && !auth.loading.state && 'users/preferences?type=favorites',
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (!auth.user && !auth.loading.state) {
      auth.authModalRef.current?.open();
      router.push('/');
    }
  }, [auth]);

  if (!auth.user) return <></>;
  return (
    <>
      <ProfileNav />

      <div className="mt-10 max-width">
        <div>
          <h1 className="text-2xl font-merriweather font-bold mb-6">
            Anúncios Favoritados
          </h1>

          <ul className="grid gap-x-4 md:grid-cols-2 lg:grid-cols-4">
            {!!data &&
              data.length > 0 &&
              data.map(item => <ListItem key={item.id} item={item} />)}
          </ul>
        </div>

        {!!data && data.length === 0 && (
          <EmptyState
            icon={MdFavoriteBorder}
            title="Nada Salvo"
            description="Busque por produtos e os salve, eles irão aparecer aqui."
            button={{
              title: (
                <>
                  buscar itens
                  <MdArrowForward className="ml-4" />
                </>
              ),
              onClick: () => router.push('/itens'),
            }}
          />
        )}
      </div>
    </>
  );
};

export default Favs;
