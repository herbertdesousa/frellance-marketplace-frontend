import { Page } from '@/types/Page';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Item } from '@/types/Item';

const HomeHero: Page<{ data: Item[] }> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<Item>(data[0]);
  const currentSelectedItemIndex = data.findIndex(
    i => i.id === selectedItem.id,
  );

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

  const changeSelectedBgCarrousel = useCallback((item: Item) => {
    setSeconds(10);
    setSelectedItem(item);
  }, []);

  const forwardSelectedBgCarrousel = useCallback(() => {
    if (currentSelectedItemIndex === data.length - 1) {
      changeSelectedBgCarrousel(data[0]);
      return;
    }
    changeSelectedBgCarrousel(data[currentSelectedItemIndex + 1]);
  }, [currentSelectedItemIndex, data]);

  const backwardSelectedBgCarrousel = useCallback(() => {
    if (currentSelectedItemIndex === 0) {
      changeSelectedBgCarrousel(data[data.length - 1]);
      return;
    }
    changeSelectedBgCarrousel(data[currentSelectedItemIndex - 1]);
  }, [currentSelectedItemIndex, data]);

  return (
    <header
      className="relative w-screen"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <Image
        src={selectedItem.img}
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
          {`Preço ${selectedItem.price}`}
        </p>

        <div className="flex items-end justify-between mt-16 mb-6">
          <div>
            <ul className="flex">
              {data.map((item, index) => (
                <li
                  key={item.id}
                  className={`mr-2 ${
                    selectedItem?.id === item.id
                      ? 'text-white font-semibold'
                      : 'text-gray2 font-normal'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => changeSelectedBgCarrousel(item)}
                  >
                    {String(index + 1).padStart(2, '0')}
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
