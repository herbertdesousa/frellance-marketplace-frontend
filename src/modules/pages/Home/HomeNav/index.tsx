import { Page } from '@/types/Page';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { useDetectClickOutside } from 'react-detect-click-outside';

import { useCategories } from '@/hooks/categories';
import { useRouter } from 'next/router';

import { Nav } from '@/components';

const HomeNav: Page = () => {
  const categories = useCategories();
  const router = useRouter();

  const [isOpenedCategoriesMobile, setIsOpenedCategoriesMobile] =
    useState(false);

  const categoriesDropdownRef = useDetectClickOutside({
    onTriggered: () => {
      if (isOpenedCategoriesMobile) setIsOpenedCategoriesMobile(false);
    },
  });

  return (
    <>
      <Nav variant="transparent">
        <div className="w-full border-t border-b border-gray3 whitespace-nowrap">
          <ul className="flex items-center text-xs text-white py-2 md:text-base max-width">
            <li className="mr-3 hover:text-gray1 transition">
              <button type="button" onClick={() => router.push('/itens')}>
                buscar itens
              </button>
            </li>
            <li className="hover:text-gray1 transition">
              <button type="button" onClick={() => router.push('/vender')}>
                comece a vender
              </button>
            </li>
            <div className="w-0.5 h-4 bg-gray2 mx-3" />

            <li
              ref={categoriesDropdownRef}
              className="block relative md:hidden"
            >
              <button
                type="button"
                className="flex items-center hover:text-gray1 transition"
                onClick={() => setIsOpenedCategoriesMobile(st => !st)}
              >
                categorias
                <MdKeyboardArrowDown size={12} className="text-gray2 ml-1" />
              </button>

              <div className="absolute right-2 top-5 bg-white rounded text-black py-2">
                <ul>
                  {isOpenedCategoriesMobile &&
                    categories.data.map((item, index) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`
                            flex items-center py-2 px-4 bg-white hover:bg-gray0.5 w-full transition
                            ${index === 0 ? '' : 'mt-2'}
                          `}
                          onClick={() => router.push(`itens/${item.slug}`)}
                        >
                          <item.Icon size={16} className="mr-4" />
                          {item.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </li>

            <ul className="hidden md:flex">
              {categories.data.map((item, index) => (
                <li
                  key={item.id}
                  className={`hover:text-gray1 transition ${
                    index === 0 ? '' : 'ml-3'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => router.push(`itens/${item.slug}`)}
                  >
                    {item.name.toLocaleLowerCase()}
                  </button>
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </Nav>
    </>
  );
};

export default HomeNav;
