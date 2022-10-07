import { Page } from '@/types/Page';

import { Nav } from '@/components';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { MdOpenInNew } from 'react-icons/md';

const data = [
  { label: 'Conta', link: '/perfil/conta' },
  { label: 'Chat', link: '/perfil/chat' },
  { label: 'Favoritos', link: '/perfil/favoritos' },
  { label: 'Últimos Vistos', link: '/perfil/recentes' },
  { label: 'Vender', link: '/vender', icon: () => <MdOpenInNew size={16} /> },
];

const ProfileNav: Page = () => {
  const router = useRouter();

  const itemsRef = useRef<{ ref: HTMLLIElement; link: string }[]>([]);

  useEffect(() => {
    if (itemsRef.current.length === 0) return;

    itemsRef.current.map(item => {
      if (item.link === router.pathname) {
        item.ref.scrollIntoView({ block: 'nearest', inline: 'center' });
      }

      return item;
    });
  }, [router.pathname]);

  return (
    <Nav variant="white" className="relative">
      <div className="w-full border-t border-b border-gray0.5">
        <ul className="flex overflow-y-scroll max-width no-scroll">
          {data.map((item, index) => (
            <li
              key={item.label}
              ref={ref => {
                // eslint-disable-next-line no-return-assign
                if (ref) itemsRef.current.push({ ref, link: item.link });
              }}
              className={`
              ${router.pathname === item.link ? 'border-b-2 border-black' : ''}
              ${index === 0 ? '' : 'ml-6'}
            `}
            >
              <button
                type="button"
                className={`flex items-center py-2 uppercase whitespace-nowrap transition
                ${
                  router.pathname === item.link
                    ? 'text-black font-medium'
                    : 'text-gray2 font-normal hover:text-gray3'
                }
              `}
                onClick={() => router.push(item.link)}
              >
                {item.label}
                {item.icon && (
                  <div className="ml-1.5">
                    <item.icon />
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Nav>
  );
};

export default ProfileNav;
