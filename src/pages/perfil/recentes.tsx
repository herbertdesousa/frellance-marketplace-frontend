import { Page } from '@/types/Page';
import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';

import { ProfileNav } from '@/modules/pages/Profile';

import { MdArrowForward, MdAccessTime } from 'react-icons/md';
import { EmptyState } from '@/components';

const data = [
  {
    id: 'id-123',
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    price: 'R$ 18.800,00',
    description: '2010 Ferrari 599',
  },
  {
    id: 'id-456',
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    price: 'R$ 18.800,00',
    description: '2010 Ferrari 599',
  },
  {
    id: 'id-789',
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    price: 'R$ 18.800,00',
    description: '2010 Ferrari 599',
  },
  {
    id: 'id-753',
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    price: 'R$ 18.800,00',
    description: '2010 Ferrari 599',
  },
  {
    id: 'id-159',
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    price: 'R$ 18.800,00',
    description: '2010 Ferrari 599',
  },
  {
    id: 'id-156',
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    price: 'R$ 18.800,00',
    description: '2010 Ferrari 599',
  },
  {
    id: 'id-354',
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    price: 'R$ 18.800,00',
    description: '2010 Ferrari 599',
  },
  {
    id: 'id-756',
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    price: 'R$ 18.800,00',
    description: '2010 Ferrari 599',
  },
];

const Recents: Page = () => {
  const router = useRouter();
  const auth = useAuth();

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
        {/* <div>
          <h1 className="text-2xl font-merriweather font-bold mb-6">
            Anúncios Favoritados
          </h1>

          <ul className="grid gap-x-4 md:grid-cols-2 lg:grid-cols-4">
            {data.map(item => (
              <ListItem key={item.id} item={item} />
            ))}
          </ul>
        </div> */}

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
      </div>
    </>
  );
};

export default Recents;
