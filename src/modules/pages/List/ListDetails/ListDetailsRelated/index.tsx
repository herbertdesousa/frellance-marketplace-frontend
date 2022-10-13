import { Page } from '@/types/Page';

import { ListItem } from '@/modules/shared';

const data = [
  {
    id: 'id-123',
    price: 'R$18.800,00',
    description: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-456',
    price: 'R$18.800,00',
    description: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-789',
    price: 'R$18.800,00',
    description: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-753',
    price: 'R$18.800,00',
    description: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-951',
    price: 'R$18.800,00',
    description: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-756',
    price: 'R$18.800,00',
    description: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-459',
    price: 'R$18.800,00',
    description: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-759',
    price: 'R$18.800,00',
    description: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-153',
    price: 'R$18.800,00',
    description: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-126',
    price: 'R$18.800,00',
    description: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const ListDetailsRelated: Page = () => {
  return (
    <div className="mt-12 lg:mt-32 max-width">
      <h1 className="text-2xl font-merriweather font-bold">Relacionados</h1>

      <ul className="flex overflow-x-scroll no-scroll mt-6">
        {data.map((item, index) => (
          <ListItem
            key={item.id}
            item={item}
            imgMeasureType="square"
            className={index !== 0 ? 'ml-4' : ''}
          />
        ))}
      </ul>
    </div>
  );
};

export default ListDetailsRelated;
