import { Page } from '@/types/Page';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const bgCarrouselData = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    description: 'Apartamento localizado em São Paulo',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    description: 'Desfile de Mercedes Benz no Rio de Janeiro',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'Penthouse no Paraná',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80',
    description: 'Mansão construida nas chapadas de Minas Gerais',
  },
];

const HomeHero: Page = () => {
  const [selectedBgCarrouselId, setSelectedBgCarrouselId] = useState(1);

  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        forwardSelectedBgCarrousel();
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const changeSelectedBgCarrousel = useCallback((id: number) => {
    setSeconds(10);
    setSelectedBgCarrouselId(id);
  }, []);

  const forwardSelectedBgCarrousel = useCallback(() => {
    if (selectedBgCarrouselId === 4) {
      changeSelectedBgCarrousel(1);
      return;
    }
    changeSelectedBgCarrousel(selectedBgCarrouselId + 1);
  }, [changeSelectedBgCarrousel, selectedBgCarrouselId]);

  const backwardSelectedBgCarrousel = useCallback(() => {
    if (selectedBgCarrouselId === 1) {
      changeSelectedBgCarrousel(4);
      return;
    }
    changeSelectedBgCarrousel(selectedBgCarrouselId - 1);
  }, [changeSelectedBgCarrousel, selectedBgCarrouselId]);

  const selectedBgCarrousel = bgCarrouselData.find(
    i => i.id === selectedBgCarrouselId,
  );

  return (
    <header
      className="relative w-screen"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <Image
        src={selectedBgCarrousel?.img || ''}
        layout="fill"
        objectFit="cover"
        style={{ filter: 'brightness(0.3)' }}
        priority
      />

      <div className="absolute bottom-0 left-0 right-0 max-width">
        <h1 className="font-merriweather text-2xl text-white font-bold md:text-3xl lg:text-4xl">
          Mais Luxuosos
          <br />
          Itens Brasileiros
        </h1>
        <p className="text-sm text-gray1 mt-3">
          {selectedBgCarrousel?.description}
        </p>

        <div className="flex items-end justify-between mt-16 mb-6">
          <div>
            <ul className="flex">
              {bgCarrouselData.map(item => (
                <li
                  key={item.id}
                  className={`mr-2 ${
                    selectedBgCarrouselId === item.id
                      ? 'text-white font-semibold'
                      : 'text-gray2 font-normal'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => changeSelectedBgCarrousel(item.id)}
                  >
                    {String(item.id).padStart(2, '0')}
                  </button>
                </li>
              ))}
            </ul>

            <div className="relative h-0.5 bg-gray3 w-48 mt-2 rounded">
              <div
                className="absolute bg-white h-0.5 w-full rounded transition"
                style={{
                  transform: `scale(${seconds / 10}, 1) `,
                  transformOrigin: '0% 100%',
                  transitionDuration: '1200ms',
                }}
              />
            </div>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              className="p-1.5 border border-gray3 rounded-full text-white mr-2 hover:bg-white-opaque transition"
              onClick={backwardSelectedBgCarrousel}
            >
              <MdChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="p-1.5 border border-gray3 rounded-full text-white hover:bg-white-opaque transition"
              onClick={forwardSelectedBgCarrousel}
            >
              <MdChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHero;
