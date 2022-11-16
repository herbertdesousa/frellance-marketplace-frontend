import { Page } from '@/types/Page';
import Link from 'next/link';

import { MdMenu, MdPersonOutline } from 'react-icons/md';

import { useAuth } from '@/hooks/auth';
import { useSideMenu } from '@/hooks/sideMenu';
import { useRouter } from 'next/router';
import { getSalutation } from '@/utils/getSalutation';
import { useMemo } from 'react';
import Image from 'next/image';

interface Props {
  variant?: 'white' | 'transparent';
  className?: string;
}

const Nav: Page<Props> = ({ children, variant = 'transparent', className }) => {
  const { sideMenuRef } = useSideMenu();
  const auth = useAuth();
  const router = useRouter();

  const userName = useMemo((): string => {
    if (auth.user?.name) return auth.user.name.split(' ')[0];
    return getSalutation();
  }, [auth.user?.name]);

  return (
    <nav
      className={`
        absolute left-0 right-0 z-30
        ${variant === 'white' ? 'bg-white' : 'bg-transparent'} ${className}
      `}
    >
      <div className="flex items-center justify-between py-5 max-width">
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

          <Link href="/">
            <Image
              src={variant === 'white' ? '/logo/black.png' : '/logo/white.png'}
              height={38}
              width={194}
              objectFit="cover"
            />
          </Link>
        </div>

        {auth.loading.state && (
          <span
            className={`
              ml-2
              ${
                variant === 'white'
                  ? 'text-black'
                  : 'text-white hover:text-gray1'
              }
            `}
          >
            Carregando...
          </span>
        )}
        {!auth.loading.state && auth.user && (
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
            onClick={() => router.push('/perfil/conta')}
          >
            <Image
              src={auth.user.picture || '/no-picture.svg'}
              width={32}
              height={32}
              className="rounded-full"
            />

            <p className="hidden md:block ml-3">
              olá,
              <br />
              <strong>{userName}</strong>
            </p>
          </button>
        )}
        {!auth.loading.state && !auth.user && (
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
            onClick={() => auth.authModalRef.current?.open()}
          >
            <MdPersonOutline size={20} />
            <span className="ml-2">Entrar</span>
          </button>
        )}
      </div>

      {children}
    </nav>
  );
};

export default Nav;
