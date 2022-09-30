import { Page } from '@/types/Page';

import Image from 'next/image';
import { MdArrowForward } from 'react-icons/md';

import style from './HomeCategories.module.css';

const categoriesData = [
  {
    id: 'id-123',
    title: 'Carros',
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  },
  {
    id: 'id-456',
    title: 'Apartamentos',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-789',
    title: 'Mansões',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80',
  },
  {
    id: 'id-753',
    title: 'Motos',
    img: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80',
  },
  {
    id: 'id-756',
    title: 'Carros',
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  },
  {
    id: 'id-459',
    title: 'Apartamentos',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'id-354',
    title: 'Mansões',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80',
  },
  {
    id: 'id-120',
    title: 'Motos',
    img: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80',
  },
];

const HomeCategories: Page = () => {
  return (
    <div className="mx-auto mt-12 md:mt-16 lg:mt-24" style={{ maxWidth: 1440 }}>
      <h1 className="text-2xl font-merriweather font-bold ml-6 md:ml-16">
        Pricípais Categorias
      </h1>

      <ul className="flex overflow-x-scroll no-scroll px-6 mt-6 md:px-16">
        {categoriesData.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className={`
              relative ${style['item-measures']}
              ${index !== 0 ? 'ml-4' : ''}
            `}
            >
              <div className={`${style['item-measures']} overflow-hidden`}>
                <Image
                  src={item.img}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-50 hover:scale-110 transition duration-500"
                />
              </div>

              <div className="absolute flex justify-between items-center w-full bottom-0 px-3 pb-4 text-white">
                <span className="font-merriweather text-lg">{item.title}</span>
                <MdArrowForward size={18} />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeCategories;
