import { Button } from '@/components';
import { Page } from '@/types/Page';

import { useRouter } from 'next/router';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { MdArrowForward } from 'react-icons/md';

import { useCategories } from '@/hooks/categories';

import { Category } from '@/types/Category';

const HomeSellWithUs: Page = () => {
  const router = useRouter();
  const { data } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(data[0]);

  useEffect(() => {
    setSelectedCategory(data[0]);
  }, [data]);

  if (!data) return <></>;
  return (
    <div className="relative mt-12 md:mt-16 lg:mt-24 w-full h-80">
      <Image
        src={selectedCategory?.img_url || ''}
        layout="fill"
        objectFit="cover"
        className="brightness-50"
      />
      <div
        className="relative flex flex-col h-full justify-between mx-auto w-full"
        style={{ maxWidth: 360 }}
      >
        <ul className="flex items-center px-6 pt-6">
          {data.slice(0, 3).map((item, index) => (
            <li
              key={item.id}
              className={`
                ${index === 0 ? '' : 'ml-4'}
                ${
                  selectedCategory?.id === item.id
                    ? 'font-medium text-white text-lg'
                    : 'text-gray1 font-regular text-normal transition hover:text-gray2'
                }
              `}
            >
              <button type="button" onClick={() => setSelectedCategory(item)}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="px-6 pb-4">
          <h2 className="font-merriweather text-2xl text-white font-bold">
            Venda Conosco
          </h2>
          <p className="text-sm text-gray1 mt-3 mb-6">
            {`Anúncie seus ${selectedCategory?.name} com o melhor marketplace de artigos de luxo.`}
          </p>

          <Button variant="filled-light" onClick={() => router.push('/vender')}>
            COMEÇAR A VENDER
            <MdArrowForward className="ml-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeSellWithUs;
