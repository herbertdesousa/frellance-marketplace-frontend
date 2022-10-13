import { Button } from '@/components';
import { Page } from '@/types/Page';

import Image from 'next/image';
import { useState } from 'react';
import { MdArrowForward } from 'react-icons/md';

const categoriesCarrouselData = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    label: 'Mansões',
    description:
      'Anúncie mansões, casas e apartamentos conosco com a melhor lorem ipsum dolot et.',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    label: 'Carros',
    description:
      'Anúncie seu carro conosco com a melhor lorem ipsum dolot et etcban aserg eb.',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    label: 'Motos',
    description:
      'Anúncie motocicletas conosco com a melhor lorem ipsum dolot et etcban aserg eb.',
  },
];

const HomeSellWithUs: Page = () => {
  const [selectedCategorylId, setSelectedCategorylId] = useState(1);

  const selectedCategory = categoriesCarrouselData.find(
    i => i.id === selectedCategorylId,
  );

  return (
    <div className="relative mt-12 md:mt-16 lg:mt-24 w-full h-80">
      <Image
        src={selectedCategory?.img || ''}
        layout="fill"
        objectFit="cover"
        className="brightness-50"
      />
      <div
        className="relative flex flex-col h-full justify-between mx-auto w-full"
        style={{ maxWidth: 360 }}
      >
        <ul className="flex items-center px-6 pt-6">
          {categoriesCarrouselData.map((item, index) => (
            <li
              key={item.id}
              className={`
                ${index === 0 ? '' : 'ml-4'}
                ${
                  selectedCategorylId === item.id
                    ? 'font-medium text-white text-lg'
                    : 'text-gray1 font-regular text-normal'
                }
              `}
            >
              <button
                type="button"
                onClick={() => setSelectedCategorylId(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="px-6 pb-4">
          <h2 className="font-merriweather text-2xl text-white font-bold">
            Venda Conosco
          </h2>
          <p className="text-sm text-gray1 mt-3 mb-6">
            {selectedCategory?.description}
          </p>

          <Button variant="filled-light">
            COMEÇAR A VENDER
            <MdArrowForward className="ml-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeSellWithUs;
