import { Page } from '@/types/Page';

import Image from 'next/image';
import { MdArrowForward } from 'react-icons/md';

import { useRouter } from 'next/router';

import { useCategories } from '@/hooks/categories';

import style from './HomeCategories.module.css';

const HomeCategories: Page<{ className?: string }> = ({ className }) => {
  const categories = useCategories();
  const router = useRouter();

  return (
    <div
      className={`mx-auto md:mt-16 lg:mt-24 ${className}`}
      style={{ maxWidth: 1440 }}
    >
      <h1 className="text-2xl font-merriweather font-bold ml-6 md:ml-16">
        Pricípais Categorias
      </h1>

      <ul className="flex overflow-x-scroll no-scroll px-6 mt-6 md:px-16">
        {categories.data.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => router.push(`/itens/${item.label}`)}
              className={`
              relative ${style['item-measures']}
              ${index !== 0 ? 'ml-4' : ''}
            `}
            >
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

              <div className="absolute flex justify-between items-center w-full bottom-0 px-3 pb-4 text-white">
                <span className="font-merriweather text-lg">{item.label}</span>
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