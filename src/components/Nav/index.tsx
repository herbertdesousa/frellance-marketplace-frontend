import type { NextPage } from 'next';
import { useRef, useState } from 'react';

import {
  MdClose,
  MdKeyboardArrowDown,
  MdMenu,
  MdPersonOutline,
} from 'react-icons/md';
import {
  FiHome,
  FiCreditCard,
  FiClock,
  FiAnchor,
  FiCommand,
} from 'react-icons/fi';

import { useDetectClickOutside } from 'react-detect-click-outside';

import SideMenu, { ISideMenuRef } from '../SideMenu';

const categoriesData = [
  {
    id: 'id-v',
    icon: FiHome,
    label: 'Casas',
    link: '/',
  },
  {
    id: 'id-456',
    icon: FiCreditCard,
    label: 'Carros',
    link: '/',
  },
  {
    id: 'id-789',
    icon: FiClock,
    label: 'Relógios',
    link: '/',
  },
  {
    id: 'id-753',
    icon: FiAnchor,
    label: 'Iates',
    link: '/',
  },
  {
    id: 'id-159',
    icon: FiCommand,
    label: 'Helicópteros',
    link: '/',
  },
];

const sideMenuBottomData = [
  {
    id: 'id-123',
    label: 'Anúncie itens',
    link: '/',
  },
  {
    id: 'id-456',
    label: 'Ver Perfil',
    link: '/',
  },
  {
    id: 'id-789',
    label: 'Sair da Conta',
    link: '/',
  },
];

const Nav: NextPage = () => {
  const sideMenuRef = useRef<ISideMenuRef>(null);

  const [isOpenedCategoriesMobile, setIsOpenedCategoriesMobile] =
    useState(false);

  const categoriesDropdownRef = useDetectClickOutside({
    onTriggered: () => {
      if (isOpenedCategoriesMobile) setIsOpenedCategoriesMobile(false);
    },
  });

  return (
    <>
      <SideMenu ref={sideMenuRef}>
        <div>
          <div className="p-4 pb-0 flex w-full justify-between items-center">
            <p>Olá, Rodrigo</p>

            <button
              type="button"
              className="p-1.5 rounded-full bg-transparent hover:bg-gray3-opaque transition"
              onClick={() => sideMenuRef.current?.close()}
            >
              <MdClose size={24} className="text-black" />
            </button>
          </div>

          <div className="p-4">
            <div className="w-full bg-gray1" style={{ height: 1 }} />
          </div>

          <ul>
            {categoriesData.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`
                    flex items-center py-2 px-4 bg-white hover:bg-gray0.5 w-full transition
                    ${index === 0 ? '' : 'mt-2'}
                  `}
                >
                  <item.icon size={16} className="mr-4" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="p-4">
            <div className="w-full bg-gray1" style={{ height: 1 }} />
          </div>

          <ul>
            {sideMenuBottomData.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`
                flex items-center py-2 px-4 bg-white hover:bg-gray0.5 w-full transition
                ${index === 0 ? '' : 'mt-2'}
              `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </SideMenu>
      <nav className="absolute left-0 right-0 z-30">
        <div
          className="flex mx-auto items-center justify-between px-6 py-5 md:px-16"
          style={{ maxWidth: 1440 }}
        >
          <div className="flex items-center">
            <button
              type="button"
              className="mr-6 p-1.5 rounded-full bg-transparent hover:bg-white-opaque transition"
              onClick={() => sideMenuRef.current?.open()}
            >
              <MdMenu size={24} className="text-white" />
            </button>

            <div className="w-32 h-12 bg-gray3 rounded" />
          </div>

          <button
            type="button"
            className="flex items-center text-left  text-white hover:text-gray1 transition"
          >
            <div className="bg-gray3 rounded-full p-1.5">
              <MdPersonOutline size={20} className="text-white" />
            </div>
            <p className="hidden md:block ml-3">
              olá,
              <br />
              <strong>Rodrigo</strong>
            </p>
          </button>
        </div>

        <div className="w-full border-t border-b border-gray3">
          <ul
            className="flex mx-auto items-center text-xs text-white px-6 py-2 md:px-16 md:text-sm"
            style={{ maxWidth: 1440 }}
          >
            <li className="mr-3 hover:text-gray1 transition">
              <button type="button">para você</button>
            </li>
            <li className="hover:text-gray1 transition">
              <button type="button">comece a vender</button>
            </li>
            <div className="w-0.5 h-2.5 bg-gray2 mx-3" />

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
                    categoriesData.map((item, index) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`
                          flex items-center py-2 px-4 bg-white hover:bg-gray0.5 w-full transition
                          ${index === 0 ? '' : 'mt-2'}
                        `}
                        >
                          <item.icon size={16} className="mr-4" />
                          {item.label}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </li>

            <ul className="hidden md:flex">
              <li className="hover:text-gray1 transition mr-3">
                <button type="button">carros</button>
              </li>
              <li className="hover:text-gray1 transition mr-3">
                <button type="button">casas</button>
              </li>
              <li className="hover:text-gray1 transition mr-3">
                <button type="button">relógios</button>
              </li>
              <li className="hover:text-gray1 transition mr-3">
                <button type="button">iates</button>
              </li>
              <li className="hover:text-gray1 transition">
                <button type="button">helicópteros</button>
              </li>
            </ul>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
