import { Page } from '@/types/Page';
import { useCallback, useState } from 'react';

import useSWR from 'swr';

import { MdKeyboardArrowDown } from 'react-icons/md';

import { adminApi } from '@/services/api';

import AdminDashHeroItem from '../components/AdminDashHeroItem';
import { ItemSelect } from '..';

interface Props {
  data: ItemSelect[] | undefined;
  removeFromHomeHero(itemId: string): void;
}

const AdminDashHeroSelected: Page<Props> = ({ data, removeFromHomeHero }) => {
  const [isOpened, setIsOpened] = useState(true);

  return (
    <div className="mt-8 w-full">
      <div className="flex items-center mt-8">
        <h2 className="text-lg font-medium">Selecionados</h2>

        <button type="button" onClick={() => setIsOpened(st => !st)}>
          <MdKeyboardArrowDown
            size={24}
            className={`transform-gpu transition ${
              isOpened ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      {isOpened && data && (
        <ul className="mt-2 w-full">
          {data.map(item => (
            <AdminDashHeroItem
              key={item.id}
              item={item}
              onClickAction={act => {
                if (act === 'remove') removeFromHomeHero(item.id);
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashHeroSelected;
