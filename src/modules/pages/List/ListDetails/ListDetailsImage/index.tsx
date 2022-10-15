import { Page } from '@/types/Page';
import { useState } from 'react';

import Image from 'next/image';

import { ItemDetails } from '@/pages/itens/detalhes/[id]';

interface Props {
  pictures: ItemDetails['pictures'];
}

const ListDetailsImage: Page<Props> = ({ pictures }) => {
  const [selectedImage, setSelectedImage] = useState(pictures[0]);

  return (
    <>
      <div
        className="block md:hidden relative w-screen"
        style={{ height: 300 }}
      >
        <Image
          src={selectedImage.url}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />

        <ul className="absolute bottom-3 left-6 right-6 z-20 flex">
          {pictures.map(item => (
            <li
              key={item.id}
              className={`border relative mr-2 ${
                selectedImage.id === item.id
                  ? 'border-white border-2'
                  : 'border-gray2'
              }`}
              style={{ width: 48, height: 48 }}
            >
              <button type="button" onClick={() => setSelectedImage(item)}>
                <Image
                  src={item.url}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-50"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ul className="hidden md:grid grid-cols-4 grid-rows-2 max-width gap-1">
        <li className="relative h-96 col-span-2 row-span-2">
          <Image
            src={selectedImage.url}
            layout="fill"
            objectFit="cover"
            className="brightness-90"
            priority
          />
        </li>
        {pictures
          .filter(item => item.id !== selectedImage.id)
          .map(item => (
            <li key={item.id} className="relative">
              <button type="button" onClick={() => setSelectedImage(item)}>
                <Image
                  src={item.url}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-50"
                  priority
                />
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default ListDetailsImage;
