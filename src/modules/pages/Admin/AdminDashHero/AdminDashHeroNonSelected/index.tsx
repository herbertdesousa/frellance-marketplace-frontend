import { useCallback, useState } from 'react';
import { Page } from '@/types/Page';

import { MdKeyboardArrowDown } from 'react-icons/md';
import useSWR from 'swr';

import { adminApi } from '@/services/api';

import { Formik } from 'formik';
import { TextField } from '@/components';

import AdminDashHeroItem from '../components/AdminDashHeroItem';
import { ItemSelect } from '..';

interface Props {
  data: ItemSelect[] | undefined;
  searchText: {
    value: string;
    set: React.Dispatch<React.SetStateAction<string>>;
  };
  addToHomeHero(itemId: string): void;
}

const AdminDashHeroNonSelected: Page<Props> = ({
  data,
  addToHomeHero,
  searchText,
}) => {
  const [isOpened, setIsOpened] = useState(true);

  return (
    <div className="mt-8 w-full pb-16">
      <div className="flex items-center mt-8">
        <h2 className="text-lg font-medium">Não Selecionados</h2>

        <button type="button" onClick={() => setIsOpened(st => !st)}>
          <MdKeyboardArrowDown
            size={24}
            className={`transform-gpu transition ${
              isOpened ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      {isOpened && (
        <div>
          <div className="mt-4">
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <Formik initialValues={{ search: '' }} onSubmit={() => {}}>
              <TextField
                name="search"
                label=""
                placeholder="Procure por itens..."
                onChange={evt => searchText.set(evt.target.value)}
                value={searchText.value}
              />
            </Formik>
          </div>

          <h2 className="font-medium text-sm mt-4">
            {!searchText.value ? (
              'ÚLTIMOS ADICIONADOS'
            ) : (
              <p>
                {`Resultado de `}
                <span className="underline">{searchText.value}</span>
              </p>
            )}
          </h2>
          {data && (
            <ul className="mt-2 w-full">
              {data.map(item => (
                <AdminDashHeroItem
                  key={item.id}
                  item={item}
                  onClickAction={act => {
                    if (act === 'add') addToHomeHero(item.id);
                  }}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashHeroNonSelected;
