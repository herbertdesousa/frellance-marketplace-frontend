import {
  useContext,
  useRef,
  createContext,
  useState,
  useImperativeHandle,
  useCallback,
} from 'react';
import { Page } from '@/types/Page';
import { useRouter } from 'next/router';

import { MdClose } from 'react-icons/md';

import { SideMenu } from '@/components';
import { SideMenuRef } from '@/components/SideMenu';

import { useCategories } from '../categories';

const SideMenuContext = createContext<SideMenuType>({} as SideMenuType);

function useSideMenu(): SideMenuType {
  const context = useContext(SideMenuContext);

  if (!context) {
    throw new Error('useCustomers must be used within an CustomersContext');
  }

  return context;
}

interface SideMenuType {
  sideMenuRef: React.RefObject<SideMenuRefUpdated>;
}

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

type SideMenuRefUpdated = SideMenuRef & {
  open(side?: 'left' | 'right'): void;
};

const SideMenuProvider: Page = ({ children }) => {
  const categories = useCategories();
  const router = useRouter();

  const [side, setSide] = useState<'left' | 'right'>('left');

  const currentSideMenuRef = useRef<SideMenuRefUpdated>(null);
  const sideMenuRef = useRef<SideMenuRef>(null);

  useImperativeHandle(sideMenuRef, () => ({
    open(_side?: 'left' | 'right') {
      setSide(_side || 'left');
      currentSideMenuRef.current?.open();
    },
    close() {
      currentSideMenuRef.current?.close();
    },
  }));

  const onClickCategory = useCallback((label: string) => {
    router.push(`/itens/${label}`);
    currentSideMenuRef.current?.close();
  }, []);

  return (
    <>
      <SideMenuContext.Provider value={{ sideMenuRef }}>
        {children}
      </SideMenuContext.Provider>
      <SideMenu ref={currentSideMenuRef} side={side}>
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
                  onClick={() => onClickCategory(item.label)}
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
    </>
  );
};

export { SideMenuProvider, useSideMenu };
