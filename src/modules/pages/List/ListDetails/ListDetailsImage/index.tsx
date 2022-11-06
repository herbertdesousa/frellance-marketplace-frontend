import { Page } from '@/types/Page';
import { useState } from 'react';

import Image from 'next/image';

import { ItemDetails } from '@/pages/itens/detalhes/[id]';
import { MdAdd, MdClose } from 'react-icons/md';

interface Props {
  pictures: ItemDetails['pictures'];
}

const ListDetailsImage: Page<Props> = ({ pictures }) => {
  const [selectedImage, setSelectedImage] = useState(pictures[0]);

  const [isAllImagesTabOpened, setIsAllImagesTabOpened] = useState(false);

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
          {pictures.slice(0, 4).map(item => (
            <li
              key={item.id}
              className={`border relative mr-2 ${
                selectedImage.id === item.id
                  ? 'border-white border-2'
                  : 'border-gray2'
              }`}
              style={{ width: 48, height: 48 }}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(item)}
                style={{ width: 48, height: 48 }}
              >
                <Image
                  src={item.url}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-50"
                />
              </button>
            </li>
          ))}
          <li
            className="bg-black-opaque border border-gray2"
            style={{ width: 48, height: 48 }}
          >
            <button
              type="button"
              onClick={() => setIsAllImagesTabOpened(true)}
              style={{ width: 48, height: 48 }}
            >
              <MdAdd size={24} className="text-white mx-auto" />
            </button>
          </li>
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
          .slice(0, 3)
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
        <li className="relative">
          <button
            type="button"
            onClick={() => setIsAllImagesTabOpened(true)}
            className="w-full h-full flex items-center justify-center border border-dashed border-gray2"
          >
            Ver Mais Fotos
          </button>
        </li>
      </ul>

      {isAllImagesTabOpened && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center z-50 body-no-scroll">
          <button
            type="button"
            className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-70 text-black"
            onClick={() => setIsAllImagesTabOpened(false)}
          >
            modal
          </button>
          <div className="w-full overflow-y-scroll no-scroll z-20 flex flex-col bg-white px-4 pt-4 pb-8 mt-8 md:px-6">
            <button
              type="button"
              onClick={() => setIsAllImagesTabOpened(false)}
            >
              <MdClose size={24} />
            </button>

            <div className="mt-4">
              <div className="relative w-full h-64 bg-primary md:h-96">
                <Image
                  src={selectedImage.url}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <ul
                className="
                  w-full grid grid-cols-2 md:grid-cols-3 gap-1 mt-4 overflow-y-scroll no-scroll
                "
              >
                {pictures.map(pic => (
                  <li
                    key={pic.id}
                    className={`border relative h-20 md:h-40 ${
                      selectedImage.id === pic.id
                        ? 'border-white border-2 '
                        : 'border-gray2'
                    }`}
                    // style={{ width: 48, height: 48 }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedImage(pic)}
                      // style={{ width: 48, height: 48 }}
                    >
                      <Image
                        src={pic.url}
                        layout="fill"
                        objectFit="cover"
                        className="brightness-50"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListDetailsImage;
