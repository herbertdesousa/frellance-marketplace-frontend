import { Page } from '@/types/Page';

import { Nav } from '@/components';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const data = [
  { label: 'Conta', link: '/perfil/conta' },
  { label: 'Chat', link: '/perfil/chat' },
  { label: 'Favoritos', link: '/perfil/favoritos' },
  { label: 'Últimos Vistos', link: '/perfil/recentes' },
  { label: 'Anúncios', link: '/perfil/anuncios' },
];

const ProfileNav: Page = () => {
  const router = useRouter();

  const itemsRef = useRef<{ ref: HTMLLIElement; link: string }[]>([]);

  useEffect(() => {
    if (itemsRef.current.length === 0) return;

    itemsRef.current.map(item => {
      if (router.pathname.includes(item.link)) {
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
              ${
                router.pathname.includes(item.link)
                  ? 'border-b-2 border-black'
                  : ''
              }
              ${index === 0 ? '' : 'ml-6'}
            `}
            >
              <button
                type="button"
                className={`flex items-center py-2 uppercase whitespace-nowrap transition
                ${
                  router.pathname.includes(item.link)
                    ? 'text-black font-medium'
                    : 'text-gray2 font-normal hover:text-gray3'
                }
              `}
                onClick={() => router.push(item.link)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Nav>
  );
};

export default ProfileNav;
