import { Page } from '@/types/Page';

import { useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';

import { SideMenuRefUpdated, useSideMenu } from '@/hooks/sideMenu';

import { getSalutation } from '@/utils/getSalutation';
import { useCategories } from '@/hooks/categories';

import { MdClose } from 'react-icons/md';
import { SideMenu } from '@/components';

import SideMenuItem from './SideMenuItem';

const SideMenuComponent: Page = () => {
  const { sideMenuRef } = useSideMenu();
  const categories = useCategories();
  const router = useRouter();
  const auth = useAuth();

  const [side, setSide] = useState<'left' | 'right'>('left');
  const currentSideMenuRef = useRef<SideMenuRefUpdated>(null);

  useImperativeHandle(sideMenuRef, () => ({
    open(_side?: 'left' | 'right') {
      setSide(_side || 'left');
      currentSideMenuRef.current?.open();
    },
    close() {
      currentSideMenuRef.current?.close();
    },
  }));

  const userName = useMemo((): string => {
    if (auth.user?.name) return auth.user.name.split(' ')[0];
    return getSalutation();
  }, [auth.user?.name]);

  return (
    <SideMenu ref={currentSideMenuRef} side={side}>
      <div>
        <div className="p-4 pb-0 flex w-full justify-between items-center">
          <p>{`Olá, ${userName}`}</p>

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
            <SideMenuItem
              key={item.id}
              onClick={() => {
                router.push(`/itens/${item.label}`);
                currentSideMenuRef.current?.close();
              }}
              Icon={item.icon}
              label={item.label}
              isFirst={index === 0}
            />
          ))}
        </ul>

        <div className="p-4">
          <div className="w-full bg-gray1" style={{ height: 1 }} />
        </div>

        <ul>
          <SideMenuItem
            onClick={() => {
              router.push('/itens/vender');
              currentSideMenuRef.current?.close();
            }}
            label="Anúncie itens"
            isFirst
          />
          <SideMenuItem
            onClick={() => {
              router.push('/itens/conta');
              currentSideMenuRef.current?.close();
            }}
            label="Ver Perfil"
          />
          <SideMenuItem
            onClick={() => {
              auth.signOut();
              currentSideMenuRef.current?.close();
            }}
            label="Sair da Conta"
          />
        </ul>
      </div>
    </SideMenu>
  );
};

export default SideMenuComponent;
