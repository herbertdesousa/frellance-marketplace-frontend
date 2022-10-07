import { Page } from '@/types/Page';
import Link from 'next/link';

import { MdMenu, MdPersonOutline } from 'react-icons/md';

import { useSideMenu } from '@/hooks/sideMenu';
import { useRouter } from 'next/router';

interface Props {
  variant?: 'white' | 'transparent';
  className?: string;
}

const Nav: Page<Props> = ({ children, variant = 'transparent', className }) => {
  const { sideMenuRef } = useSideMenu();
  const router = useRouter();

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
            <div className="w-32 h-12 bg-gray3 rounded" />
          </Link>
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
          onClick={() => router.push('/perfil/conta')}
        >
          <div
            className={`rounded-full p-1.5 ${
              variant === 'white' ? 'border border-gray2' : 'bg-gray3'
            }`}
          >
            <MdPersonOutline
              size={20}
              className={variant === 'white' ? 'text-black' : 'text-white'}
            />
          </div>
          <p className="hidden md:block ml-3">
            olá,
            <br />
            <strong>Rodrigo</strong>
          </p>
        </button>
      </div>

      {children}
    </nav>
  );
};

export default Nav;
