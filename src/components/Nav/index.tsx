import type { NextPage } from 'next';
import { useRef } from 'react';

import { MdClose, MdMenu, MdPersonOutline } from 'react-icons/md';

import { useCategories } from '@/hooks/categories';

import SideMenu, { ISideMenuRef } from '../SideMenu';

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

interface Props {
  variant?: 'white' | 'transparent';
  bottomChildren?: React.ReactNode;
}

const Nav: NextPage<Props> = ({ bottomChildren, variant = 'transparent' }) => {
  const categories = useCategories();

  const sideMenuRef = useRef<ISideMenuRef>(null);

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
            {categories.data.map((item, index) => (
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
      <nav
        className={`
          absolute left-0 right-0 z-30
          ${variant === 'white' ? 'bg-white' : 'bg-transparent'}
        `}
      >
        <div
          className="flex mx-auto items-center justify-between px-6 py-5 md:px-16"
          style={{ maxWidth: 1440 }}
        >
          <div className="flex items-center">
            <button
              type="button"
              className={`
                mr-6 p-1.5 rounded-full transition bg-transparent
                ${
                  variant === 'white'
                    ? 'hover:bg-gray1 text-black'
                    : 'hover:bg-white-opaque text-white'
                }
              `}
              onClick={() => sideMenuRef.current?.open()}
            >
              <MdMenu size={24} />
            </button>

            <div className="w-32 h-12 bg-gray3 rounded" />
          </div>

          <button
            type="button"
            className={`
              flex items-center text-left transition
              ${
                variant === 'white'
                  ? 'text-black'
                  : 'text-white hover:text-gray1'
              }
            `}
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

        {bottomChildren}
      </nav>
    </>
  );
};

export default Nav;
