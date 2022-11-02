import { Page } from '@/types/Page';
import Head from 'next/head';
import { useEffect } from 'react';

import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';

import { ProfileNav } from '@/modules/pages/Profile';

import { MdArrowForward, MdAccessTime } from 'react-icons/md';
import { EmptyState } from '@/components';
import { ListItem } from '@/modules/shared';

interface Recents {
  id: string;
  img: string;
  price: string;
  description: string;
  favorited: boolean;
}

const Recents: Page = () => {
  const router = useRouter();
  const auth = useAuth();

  const { data, error } = useSWR<Recents[]>(
    auth.user && !auth.loading.state && 'users/preferences?type=recent-view',
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
      <Head>
        <title>Premium List - Perfil</title>
      </Head>
      <ProfileNav />

      <div className="mt-10 max-width">
        <div>
          <h1 className="text-2xl font-merriweather font-bold mb-6">
            Vistos Recentemente
          </h1>

          <ul className="grid gap-x-4 md:grid-cols-2 lg:grid-cols-4">
            {!!data &&
              data.length > 0 &&
              data.map(item => <ListItem key={item.id} item={item} />)}
          </ul>
        </div>

        {!!data && data.length === 0 && (
          <EmptyState
            icon={MdAccessTime}
            title="Nada Visto Recentemente"
            description="Busque por produtos e os últimos visualizados aparecerão aqui."
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

export default Recents;
