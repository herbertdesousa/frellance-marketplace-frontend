import { Page } from '@/types/Page';
import { MdMenu, MdSearch } from 'react-icons/md';

import Link from 'next/link';

import { useSideMenu } from '@/hooks/sideMenu';

const ListNavTop: Page = () => {
  const { sideMenuRef } = useSideMenu();

  return (
    <div
      className="flex mx-auto items-center justify-between px-6 py-5 md:px-16"
      style={{ maxWidth: 1440 }}
    >
      <Link href="/">
        <div className="w-12 h-12 bg-gray3 rounded" />
      </Link>

      <div className="h-12 mx-6 p-3 flex flex-1 bg-gray1 max-w-xs">
        <MdSearch size={24} />
        <input
          type="text"
          className="flex flex-1 bg-transparent ml-3 w-full"
          placeholder="Procure por Marcas"
        />
      </div>

      <button
        type="button"
        className="p-1.5 rounded-full transition bg-transparent hover:bg-gray1 text-black"
        onClick={() => sideMenuRef.current?.open('right')}
      >
        <MdMenu size={24} />
      </button>
    </div>
  );
};

export default ListNavTop;
