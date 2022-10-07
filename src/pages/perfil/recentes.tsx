import { Page } from '@/types/Page';

import { useRouter } from 'next/router';

import { ProfileNav } from '@/modules/Profile';
import { ListItem } from '@/modules/shared';
import { MdArrowForward, MdAccessTime } from 'react-icons/md';
import { Button } from '@/components';

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

        <div className="mt-16 w-full flex flex-col items-center mx-auto max-w-xs text-center">
          <div className="p-6 border border-gray1 rounded-full">
            <MdAccessTime size={24} />
          </div>

          <h1 className="text-2xl font-merriweather font-bold mt-6">
            Nada Visto Recentemente
          </h1>
          <p className="mt-2 text-center text-gray3">
            Busque por produtos e os últimos visualizados aparecerão aqui.
          </p>

          <Button
            variant="filled-dark"
            className="mt-8"
            onClick={() => router.push('/itens')}
          >
            buscar itens
            <MdArrowForward className="ml-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Recents;
