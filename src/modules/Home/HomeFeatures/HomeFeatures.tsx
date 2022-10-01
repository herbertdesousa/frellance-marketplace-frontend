import { Page } from '@/types/Page';

import Image from 'next/image';

import { useRouter } from 'next/router';

import { FavButton } from '@/components';
import style from './HomeFeatures.module.css';

const featuresData = [
  {
    id: 'id-123',
    price: 'R$18.800,00',
    locale: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-456',
    price: 'R$18.800,00',
    locale: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-789',
    price: 'R$18.800,00',
    locale: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-753',
    price: 'R$18.800,00',
    locale: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-951',
    price: 'R$18.800,00',
    locale: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-756',
    price: 'R$18.800,00',
    locale: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-459',
    price: 'R$18.800,00',
    locale: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-759',
    price: 'R$18.800,00',
    locale: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-153',
    price: 'R$18.800,00',
    locale: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-126',
    price: 'R$18.800,00',
    locale: 'São Paulo - SP, Alphaville',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const HomeFeatures: Page = () => {
  const router = useRouter();

  return (
    <div className="mx-auto mt-12 md:mt-16 lg:mt-32" style={{ maxWidth: 1440 }}>
      <h1 className="text-2xl font-merriweather font-bold ml-6 md:ml-16">
        Novos & Em Alta
      </h1>

      <ul className="flex overflow-x-scroll no-scroll px-6 mt-6 md:px-16">
        {featuresData.map((item, index) => (
          <li key={item.id} className={`relative ${index !== 0 ? 'ml-4' : ''}`}>
            <FavButton id={item.id} />
            <button type="button" className="text-left hover:underline">
              <div
                className={`relative ${style['item-measures']} overflow-hidden`}
              >
                <Image
                  src={item.img}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-50 hover:scale-110 transition duration-500"
                />
              </div>

              <div className="mt-2">
                <strong className="mb-1">{item.price}</strong>
                <p
                  className={`text-gray3 text-sm truncate ${style['item-place-measures']}`}
                >
                  {item.locale}
                </p>
              </div>
            </button>
          </li>
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
