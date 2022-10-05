import { Page } from '@/types/Page';

import ListNav from '@/modules/List/ListNav';
import { CategoriesCarrousel, ListItem } from '@/modules/shared';
import { Footer } from '@/components';

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

const List: Page = () => {
  return (
    <>
      <div className="border-b border-gray0.5">
        <ListNav.ListNavWrapper>
          <ListNav.ListNavTop />
        </ListNav.ListNavWrapper>
      </div>

      <CategoriesCarrousel className="mt-8 lg:mt-12" />

      <div className="mt-12 max-width">
        <h1 className="text-2xl font-merriweather font-bold mb-6">
          Itens em Alta
        </h1>

        <ul className="grid gap-x-4 md:grid-cols-2 lg:grid-cols-4">
          {data.map(item => (
            <ListItem key={item.id} item={item} />
          ))}
        </ul>
      </div>

      <Footer />
    </>
  );
};

export default List;
