import { Page } from '@/types/Page';

import Image from 'next/image';

import { useRouter } from 'next/router';

import { ListItem } from '@/modules/shared';
import style from './HomeFeatures.module.css';

const featuresData = [
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

const HomeFeatures: Page = () => {
  const router = useRouter();

  return (
    <div className="mt-12 lg:mt-32 max-width">
      <h1 className="text-2xl font-merriweather font-bold">Novos & Em Alta</h1>

      <ul className="flex overflow-x-scroll no-scroll mt-6">
        {featuresData.map((item, index) => (
          <ListItem
            item={item}
            imgMeasureType="square"
            className={index !== 0 ? 'ml-4' : ''}
          />
        ))}

        <li className="ml-4 relative">
          <button
            type="button"
            className="flex text-left hover:underline"
            onClick={() => router.push('/itens')}
          >
            <div
              className={`
                relative ${style['item-measures']} overflow-hidden
                border border-dashed border-gray2 flex items-center justify-center
              `}
            >
              <span>Ver Mais Itens</span>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HomeFeatures;
