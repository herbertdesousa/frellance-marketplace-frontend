import { Page } from '@/types/Page';

import { useRouter } from 'next/router';

import { Item } from '@/types/Item';

import { ListItem } from '@/modules/shared';
import style from './HomeFeatures.module.css';

const HomeFeatures: Page<{ data: Item[] }> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="mt-12 lg:mt-32 max-width">
      <h1 className="text-2xl font-merriweather font-bold">Novos & Em Alta</h1>

      <ul className="flex overflow-x-scroll no-scroll mt-6">
        {data.map((item, index) => (
          <ListItem
            key={item.id}
            item={item}
            imgMeasureType="square"
            className={index !== 0 ? 'ml-4' : ''}
          />
        ))}

        <li className="ml-4 relative">
          <button
            type="button"
            className="flex text-left hover:underline"
            onClick={() => router.push('/itens')}
          >
            <div
              className={`
                relative ${style['item-measures']} overflow-hidden
                border border-dashed border-gray2 flex items-center justify-center
              `}
            >
              <span>Ver Mais Itens</span>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HomeFeatures;
