import { Page } from '@/types/Page';
import { MdChevronLeft, MdShare } from 'react-icons/md';

import { useRouter } from 'next/router';

import { FavButton } from '@/components';

const ListDetailsNav: Page<{ id: string }> = ({ id }) => {
  const router = useRouter();

  return (
    <nav
      className="
        flex justify-between pt-6 max-width absolute left-0 right-0 z-20
        md:relative md:mb-6
      "
    >
      <button
        type="button"
        className="p-1.5 bg-white rounded-full md:border border-gray1"
        onClick={() => router.back()}
      >
        <MdChevronLeft size={24} />
      </button>

      <div className="relative">
        <button
          type="button"
          className="p-1.5 bg-white rounded-full md:border border-gray1"
          style={{ marginRight: 36 + 8 }}
        >
          <MdShare size={24} />
        </button>
        <FavButton
          itemId={id}
          className="top-0"
          containerClassName="md:border border-gray1"
          iconSize={24}
        />
      </div>
    </nav>
  );
};

export default ListDetailsNav;
