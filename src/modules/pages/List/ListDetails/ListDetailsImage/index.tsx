import { Page } from '@/types/Page';

import Image from 'next/image';

const ListDetailsImage: Page = () => {
  return (
    <>
      <div
        className="block md:hidden relative w-screen"
        style={{ height: 300 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />

        <ul className="absolute bottom-3 left-6 z-20 flex">
          {[1, 2, 3, 4].map((item, index) => (
            <li
              key={item}
              className={`border relative ${
                index === 0 ? 'border-white border-2' : 'ml-2 border-gray2'
              }`}
              style={{ width: 48, height: 48 }}
            >
              <button type="button">
                <Image
                  src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
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
        <li className="relative col-span-2 row-span-2 h-96">
          <Image
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            layout="fill"
            objectFit="cover"
            className="brightness-90"
            priority
          />
        </li>
        <li className="relative">
          <Image
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
            priority
          />
        </li>
        <li className="relative">
          <Image
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
            priority
          />
        </li>
        <li className="relative">
          <Image
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
            priority
          />
        </li>
        <li className="relative">
          <Image
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
            priority
          />
        </li>
        {/* {[1, 2, 3, 4].map((item, index) => (
          <li
            key={item}
            className={`border relative ${
              index === 0 ? 'border-white border-2' : 'ml-2 border-gray2'
            }`}
            style={{ width: 48, height: 48 }}
          >
            <button type="button">
              <Image
                src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                layout="fill"
                objectFit="cover"
                className="brightness-50"
              />
            </button>
          </li>
        ))} */}
      </ul>
    </>
  );
};

export default ListDetailsImage;
